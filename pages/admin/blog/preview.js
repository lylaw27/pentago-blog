import BlogLayout from '../../../layout/BlogLayout.js';
import BlogContext from '../../../context/preview';
import { useContext } from 'react';
import DbClient from '../../../components/db.js';


export default function BlogContent({sidebar, suggestion}){
    const {useBlogContent, useArticle, useBlogImage} = useContext(BlogContext);
    const [blogContent,setBlogContent] = useBlogContent
    const [article,setArticle] = useArticle
    const imgArray = blogContent.imagefile.map(img => ({original: img}));
    const blogPreview = {...blogContent, imagefile: imgArray}
    return <BlogLayout blogContent={blogPreview} article={article} suggestion={suggestion} sidebar={sidebar}></BlogLayout>
}

export async function getStaticProps(){
    await DbClient.connect();
    const blogs = DbClient.db('Post').collection('blogs');
    const recentBlog = await blogs.find().sort({timestamp: -1}).limit(8).toArray();
    const suggestion = await blogs.aggregate([{ $sample: { size: 2 } }]).toArray();
    await DbClient.close();
    return{
        props:{
            suggestion: suggestion.map(data=>({
                _id: data._id.toString(),
                title: data.title,
                imagefile: data.imagefile[0]
                })),
            sidebar: recentBlog.map(data=>({
                _id: data._id.toString(),
                title: data.title,
                })),
            },
            revalidate: 10
        }
    }
