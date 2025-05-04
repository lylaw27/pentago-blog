import Home from '../../../layout/home'
import DbClient from '../../../components/db';

export default function Layout(props){
  return (<Home {...props}/>)
}

export async function getStaticPaths() {
  const blogs = await DbClient.db().collection('blogs')
  const contentType = await blogs.distinct('contentType')
  let paths = [];
  for(const contentTypeItem of contentType){
      const pageCount = await blogs.countDocuments({contentType: contentTypeItem})
      const maxPage = Math.ceil(pageCount/8)
      let pathArray = (Array.from({length: maxPage},(_,j)=> ({params:{contentType: contentTypeItem, pageId: (j+1).toString()}})))
      paths = paths.concat(pathArray)
    }
    await DbClient.close();
  return {paths,fallback: 'blocking'}
}

export async function getStaticProps(context){
    const blogs = await DbClient.db().collection('blogs')
    let page = context.params.pageId
    let contentType = context.params.contentType
    const recordPerPage = 8;
    if(!page){page = 1}
    const blogList = await blogs.find({contentType: contentType})
                                .sort({pinned: -1,timestamp: -1})
                                .skip((page-1) * recordPerPage)
                                .limit(recordPerPage)
                                .toArray();
    const recentBlog = await blogs.find()
                                .sort({timestamp: -1})
                                .limit(recordPerPage)
                                .toArray();
    const blogCount = await blogs.countDocuments({contentType: contentType})
    await DbClient.close();
    return{
        props: {
          blogs: blogList.map(data=>({
                    title: data.title,
                    subtitle: data.subtitle,
                    imagefile: data.imagefile,
                    category: data.category,
                    uploadDate: data.uploadDate,
                    contentType: data.contentType,
                    url: data.url
                  })),
          sidebar: recentBlog.map(data=>({
                      title: data.title,
                      url: data.url
                  })),
          pagination:{
            count: blogCount.toString(),
            type: contentType
          },
          metatag: {
            title: contentType + ' | 英國民間分析員阿P',
            type: contentType,
            description: '由國家宏觀經濟、地區樓價及學校數據以至各類主題分析。無論買樓投資或海外升學，下決定前參考數據非常重要'
          }
        },
        revalidate: 10
      }}