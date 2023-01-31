import Home from '../../../../layout/home'
import Dbconnect from '../../../../components/db';

export default function Layout(props){
    return (<Home {...props}/>)
}

export async function getStaticPaths() {
  const blogs = await Dbconnect('blogs')
  const categoryArray = ['樓市分析','市場熱話','歷史文化','經濟數據','學校教育','其他主題']
  let paths = [];
  for(const categoryItem of categoryArray){
      const pageCount = await blogs.countDocuments({category: categoryItem})
      const maxPage = Math.ceil(pageCount/8)
      let pathArray = (Array.from({length: maxPage},(_,j)=> ({params:{category: categoryItem, pageId: (j+1).toString()}})))
      paths = paths.concat(pathArray)
    }
  return {paths,fallback: 'blocking'}
}

export async function getStaticProps(context){
    const blogs = await Dbconnect('blogs')
    let category = context.params.category;
    let page = context.params.pageId;
    let recordPerPage = 8;
    const blogList = await blogs.find({category: category})
                                .sort({pinned: -1,timestamp: -1})
                                .skip((page-1) * recordPerPage)
                                .limit(recordPerPage)
                                .toArray();
    const recentBlog = await blogs.find()
                                .sort({timestamp: -1})
                                .limit(recordPerPage)
                                .toArray();
    const blogCount = await blogs.countDocuments({category: category})
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
            contentType: 'category'
          },
          metatag: {
            title: category + ' | 英國民間分析員阿P',
            type: category,
            description: '由國家宏觀經濟、地區樓價及學校數據以至各類主題分析。無論買樓投資或海外升學，下決定前參考數據非常重要'
          }
        },
        revalidate: 10
      }}