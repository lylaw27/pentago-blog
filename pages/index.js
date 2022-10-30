import Home from '../layout/home'
import Dbconnect from '../components/db';

export default function Layout(props){
  return (<Home {...props}/>)
}

export async function getStaticProps(){
    const blogs = await Dbconnect('blogs')
    const recordPerPage = 8;
    const blogList = await blogs.find({contentType: '英國懶人包'})
                              .sort({timestamp: -1})
                              .limit(recordPerPage)
                              .toArray();
    const recentBlog = await blogs.find()
                                  .sort({timestamp: -1})
                                  .limit(recordPerPage)
                                  .toArray();
    const blogCount = await blogs.countDocuments()
    // if(!result){res.send("notfound")}
    return{
        props: {
          blogs: blogList.map(data=>({
                    title: data.title,
                    subtitle: data.subtitle,
                    imagefile: data.imagefile,
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
            contentType: '英國懶人包'
          }
        },
        revalidate: 30
      }}