import Home from '../../../layout/home'
import Dbconnect from '../../../components/db';

export default function Layout(props){
  return (<Home {...props}/>)
}

export async function getStaticPaths() {
  const blogs = await Dbconnect('blogs')
  const contentType = await blogs.distinct('contentType')
  let paths = [];
    for(let i=0;i<contentType.length;i++){
      const pageCount = await blogs.countDocuments({contentType: contentType[i]})
      const maxPage = Math.ceil(pageCount/8)
      let pathArray = (Array.from({length: maxPage},(_,j)=> ({params:{contentType: contentType[i], pageId: (j+1).toString()}})))
      paths = paths.concat(pathArray)
    }
  return {paths,fallback: false}
}

export async function getStaticProps(context){
    const blogs = await Dbconnect('blogs')
    let page = context.params.pageId
    let type = context.params.contentType
    const recordPerPage = 8;
    if(!page){page = 1}
    const blogList = await blogs.find({contentType: type})
                                .sort({timestamp: -1})
                                .skip((page-1) * recordPerPage)
                                .limit(recordPerPage)
                                .toArray();
    const recentBlog = await blogs.find()
                                .sort({timestamp: -1})
                                .limit(recordPerPage)
                                .toArray();
    const blogCount = await blogs.countDocuments({contentType: type})
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
          pagination:{
            count: blogCount.toString(),
            contentType: type
          }
        },
        revalidate: 30
      }}