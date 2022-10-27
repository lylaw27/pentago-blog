import { ObjectId } from 'mongodb';
import Dbconnect from '../../components/db.js'
import BlogLayout from '../../layout/BlogLayout.js';

export default function BlogContent(props){
    return <BlogLayout {...props}></BlogLayout>
}

export async function getStaticPaths(){
    const blogs = await Dbconnect('blogs');
    const idArray = await blogs.distinct("_id");
    const paths = idArray.map(id => ({params: {blogId: id.toString()}}))
    return{paths, fallback: false}
}

export async function getStaticProps(context){
    const blogId = context.params.blogId;
    const blogs = await Dbconnect('blogs');
    const blogContent = await blogs.findOne({_id: ObjectId(blogId)});
    const recentBlog = await blogs.find().sort({timestamp: -1}).limit(8).toArray();
    const suggestion = await blogs.aggregate([{$match: {_id: {$ne: ObjectId(blogId)}}},{ $sample: { size: 2 } }]).toArray();
    return{
        props:{
            blogContent: {
                _id: blogContent._id.toString(),
                title: blogContent.title,
                imagefile: blogContent.imagefile.map(data=>({
                    original: data,
                    originalAlt: blogContent.title
                })),
                article: blogContent.article,
                videoUrl: blogContent.videoUrl
                },
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
            revalidate: 30
        }
    }