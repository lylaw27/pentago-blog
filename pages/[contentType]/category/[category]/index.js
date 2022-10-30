import Home from '../../../../layout/home'
import Dbconnect from '../../../../components/db';

export default function Layout(props){
  return (<Home {...props}/>)
}

export async function getStaticPaths() {
  const blogs = await Dbconnect('blogs')
  const category = await blogs.distinct('category')
  const contentType = await blogs.distinct('contentType')
  let paths = [];
  for(let i=0;i<contentType.length;i++){
    for(let j=0;j<category.length;j++){
      let pathArray = {params:{contentType: contentType[i], category: category[j]}}
      paths = paths.concat(pathArray)
    }
  }
  return {paths,fallback: false}
}

export async function getStaticProps(context){
    const blogs = await Dbconnect('blogs')
    let category = context.params.category;
    let type = context.params.contentType;
    let recordPerPage = 8;
    const blogList = await blogs.find({category: category,contentType: type})
                                .sort({timestamp: -1})
                                .limit(recordPerPage)
                                .toArray();
    const recentBlog = await blogs.find()
                                .sort({timestamp: -1})
                                .limit(recordPerPage)
                                .toArray();
    const blogCount = await blogs.countDocuments({category: category,contentType: type})
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