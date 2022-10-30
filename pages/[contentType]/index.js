import Home from '../../layout/home'
import Dbconnect from '../../components/db';

export default function Layout(props){
  return (<Home {...props}/>)
}

export async function getStaticPaths() {
  const blogs = await Dbconnect('blogs')
  const contentType = await blogs.distinct('contentType')
  const paths = contentType.map(type=>({params: {contentType: type}}))
  return {paths,fallback: 'blocking'}
}

export async function getStaticProps(context){
    const contentType = context.params.contentType;
    const blogs = await Dbconnect('blogs')
    const recordPerPage = 8;
    const recentBlog = await blogs.find()
                                  .sort({timestamp: -1})
                                  .limit(recordPerPage)
                                  .toArray();
    const blogList = await blogs.find({contentType: contentType})
                              .sort({timestamp: -1})
                              .limit(recordPerPage)
                              .toArray();
    const blogCount = await blogs.countDocuments({contentType: contentType})
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
            contentType: contentType
          }
        },
        revalidate: 30
      }}