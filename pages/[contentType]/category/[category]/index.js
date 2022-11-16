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
  for(const contentTypeItem of contentType){
    for(const categoryItem of category){
      let pathArray = {params:{contentType: contentTypeItem, category: categoryItem}}
      paths = paths.concat(pathArray)
    }
  }
  return {paths,fallback: 'blocking'}
}

export async function getStaticProps(context){
    const blogs = await Dbconnect('blogs')
    let category = context.params.category;
    let contentType = context.params.contentType;
    let recordPerPage = 8;
    const blogList = await blogs.find({category: category,contentType: contentType})
                                .sort({timestamp: -1})
                                .limit(recordPerPage)
                                .toArray();
    const recentBlog = await blogs.find()
                                .sort({timestamp: -1})
                                .limit(recordPerPage)
                                .toArray();
    const blogCount = await blogs.countDocuments({category: category,contentType: contentType})
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
            contentType: contentType
          },
          metatag: {
            title: contentType + ': ' + category + ' | 英國民間分析員阿P',
            category: category,
            contentType: contentType,
            description: '由國家宏觀經濟、地區樓價及學校數據以至各類主題分析。無論買樓投資或海外升學，下決定前參考數據非常重要'
          }
        },
        revalidate: 30
      }}