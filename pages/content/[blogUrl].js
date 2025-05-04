import DbClient from '../../components/db.js'
import BlogLayout from '../../layout/BlogLayout.js';

export default function BlogContent(props){
    return <BlogLayout {...props}></BlogLayout>
}

export async function getStaticPaths(){
    const blogs = await DbClient.db().collection('blogs');
    const idArray = await blogs.distinct("url");
    const paths = idArray.map(url => ({params: {blogUrl: url.toString()}}))
    await DbClient.close();
    return{paths, fallback: 'blocking'}
}

export async function getStaticProps(context){
    const blogUrl = context.params.blogUrl;
    const blogs = await DbClient.db().collection('blogs');
    const blogContent = await blogs.findOne({url: blogUrl});
    const recentBlog = await blogs.find().sort({timestamp: -1}).limit(8).toArray();
    const suggestion = await blogs.aggregate([{$match: {url: {$ne: blogUrl}}},{ $sample: { size: 2 } }]).toArray();
    await DbClient.close();
    return{
        props:{
            blogContent: {
                title: blogContent.title,
                subtitle: blogContent.subtitle,
                imagefile: blogContent.imagefile.map(data=>({
                    original: data,
                    originalAlt: blogContent.title
                })),
                contentType: blogContent.contentType,
                uploadDate: blogContent.uploadDate,
                category: blogContent.category,
                article: blogContent.article,
                videoUrl: blogContent.videoUrl,
                url: blogContent.url
                },
            suggestion: suggestion.map(data=>({
                title: data.title,
                imagefile: data.imagefile[0],
                url: data.url
                })),
            sidebar: recentBlog.map(data=>({
                title: data.title,
                url: data.url
                })),
            },
            revalidate: 10
        }
    }