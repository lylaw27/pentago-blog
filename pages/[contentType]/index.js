import Home from '../../layout/home'
import DbClient from '../../components/db';

export default function Layout(props){
  return (<Home {...props}/>)
}

export async function getStaticPaths() {
  const blogs = await DbClient.db().collection('blogs')
  const contentType = await blogs.distinct('contentType')
  const paths = contentType.map(type=>({params: {contentType: type}}))
  await DbClient.close();
  return {paths,fallback: 'blocking'}
}

export async function getStaticProps(context){
    try{
        const contentType = context.params.contentType;
        const blogs = await DbClient.db('Blog').collection('listings')
        const recordPerPage = 8;
        const recentBlog = await blogs.find()
                                      .sort({timestamp: -1})
                                      .limit(recordPerPage)
                                      .toArray();
        const blogList = await blogs.find({contentType: contentType})
                                  .sort({pinned: -1,timestamp: -1})
                                  .limit(recordPerPage)
                                  .toArray();
        const blogCount = await blogs.countDocuments({contentType: contentType})
    return{
        props: {
          blogs: blogList.map(data=>({
                    title: data.title,
                    subtitle: data.subtitle,
                    imagefile: data.imagefile,
                    category: data.category,
                    contentType: data.contentType,
                    uploadDate: data.uploadDate,
                    url: data.url
                  })),
          sidebar: recentBlog.map(data=>({
                    title: data.title,
                    url: data.url
                  })),
          pagination: {
            count: blogCount.toString(),
            contentType: contentType
          },
          metatag: {
            title: contentType + ' | 英國民間分析員阿P',
            description: '由國家宏觀經濟、地區樓價及學校數據以至各類主題分析。無論買樓投資或海外升學，下決定前參考數據非常重要',
            type: contentType,
          }
        },
        revalidate: 10
      }
    }
    finally {
        await DbClient.close();
    }
}
