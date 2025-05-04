import Home from '../layout/home'
import DbClient from '../components/db';

export default function Layout(props){
  return (<Home {...props}/>)
}

export async function getStaticProps(){
    const blogs = await DbClient.db().collection('blogs');
    const recordPerPage = 8;
    const blogList = await blogs.find().sort({pinned: -1,timestamp: -1}).limit(recordPerPage).toArray();
    const recentBlog = await blogs.find()
                                  .sort({timestamp: -1})
                                  .limit(recordPerPage)
                                  .toArray();
    const blogCount = await blogs.countDocuments()
    await DbClient.close();
    return{
        props: {
          blogs: blogList.map(data=>({
                    title: data.title,
                    subtitle: data.subtitle,
                    imagefile: data.imagefile,
                    contentType: data.contentType,
                    category: data.category,
                    uploadDate: data.uploadDate,
                    url: data.url
                  })),
          sidebar: recentBlog.map(data=>({
                    title: data.title,
                    url: data.url
                  })),
          pagination: {
            count: blogCount.toString(),
            contentType: 'home'
          },
          metatag: {
            title: '英國民間分析員阿P - 最強英國地區全面分析',
            description: '由國家宏觀經濟、地區樓價及學校數據以至各類主題分析。無論買樓投資或海外升學，下決定前參考數據非常重要'
          }
        },
        revalidate: 10
      }}