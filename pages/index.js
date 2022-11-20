import Home from '../layout/home'
import Dbconnect from '../components/db';

export default function Layout(props){
  return (<Home {...props}/>)
}

export async function getStaticProps(){
    const blogs = await Dbconnect('blogs')
    const recordPerPage = 8;
    const contentType = ['民間博客','Patreon文章預覽','英國物業小知識','英國懶人包','Youtube影片']
    let blogList = []
    for(const type of contentType){
      await blogs.find({contentType: type}).sort({timestamp: -1}).limit(1).forEach(result=>{blogList.push(result)})  
    }
    const recentBlog = await blogs.find()
                                  .sort({timestamp: -1})
                                  .limit(recordPerPage)
                                  .toArray();
    const blogCount = await blogs.countDocuments()
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
        revalidate: 30
      }}