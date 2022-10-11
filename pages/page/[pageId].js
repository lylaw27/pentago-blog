import Home from '../../layout/home'
import Dbconnect from '../../components/db';

export default function Layout(props){
  return (<Home {...props}/>)
}

export async function getStaticPaths() {
  const blogs = await Dbconnect('blogs')
  const pageCount = await blogs.countDocuments()
  const maxPage = Math.ceil(pageCount/8)
  const pageArray = Array.from({length: maxPage}, (_, i) => i+1)
  const paths = pageArray.map(pageId=>({params: {pageId: pageId.toString()}}))
  return {paths,fallback: false}
}

export async function getStaticProps(context){
    const blogs = await Dbconnect('blogs')
    let page = context.params.pageId
    const recordPerPage = 8;
    if(!page){page = 1}
    const blogList = await blogs.find()
                                .sort({timestamp: -1})
                                .skip((page-1) * recordPerPage)
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
                    _id: data._id.toString(),
                    title: data.title,
                    subtitle: data.subtitle,
                    imagefile: data.imagefile,
                    category: data.category,
                    uploadDate: data.uploadDate,
                  })),
          sidebar: recentBlog.map(data=>({
                      _id: data._id.toString(),
                      title: data.title,
                  })),
          pagination: {
            count: blogCount.toString(),
            contentType: '英國懶人包'
          }
        },
        revalidate: 30
      }}