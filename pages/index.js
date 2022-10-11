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
    const blogCount = await blogs.countDocuments()
    // if(!result){res.send("notfound")}
    return{
        props: {
          blogs: blogList.map(data=>({
                    _id: data._id.toString(),
                    title: data.title,
                    subtitle: data.subtitle,
                    imagefile: data.imagefile,
                    category: data.category,
                    uploadDate: data.uploadDate,
                  })),
          sidebar: blogList.map(data=>({
                    _id:data._id.toString(),
                    title: data.title
                  })),
          pagination: {
            count: blogCount.toString(),
            contentType: '英國懶人包'
          }
        },
        revalidate: 30
      }}