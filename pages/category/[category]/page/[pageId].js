import Home from '../../../../layout/home'
import Dbconnect from '../../../../components/db';

export default function Layout(props){
    return (<Home {...props}/>)
}

export async function getStaticPaths() {
    const blogs = await Dbconnect('blogs')
    const category = await blogs.distinct('category')
    let paths = [];
    for(let j=0;j<category.length;j++){
        let maxPage = await blogs.countDocuments({category: category[j]})
        let categoryAdd = Array.from({length: maxPage},(_,i)=> ({params: {pageId: (i+1).toString(), category: category[j]}}))
        paths = paths.concat(categoryAdd);
    }
    return {paths,fallback: false}
}

export async function getStaticProps(context){
    const blogs = await Dbconnect('blogs')
    let category = context.params.category;
    let page = context.params.pageId;
    let recordPerPage = 8;
    const blogList = await blogs.find({category: category})
                                .sort({timestamp: -1})
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
        },
        },
        revalidate: 30
      }}