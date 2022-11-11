import Link from 'next/link.js';
import Image from 'next/image.js';
import Script from 'next/script.js';
import Head from 'next/head.js';
import { useRouter } from 'next/router'
import Toolbar from '../../../components/toolbar.js';
import axios from 'axios';
import { useEffect,useContext } from 'react';
import BlogContext from '../../../context/preview';
import QueryPagination from '../../../components/querypagination.js';
import Dbconnect from '../../../components/db.js';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';


const AdminBlogListings = ({blogs, pagination}) => {
    let router = useRouter();
    const {useBlogContent, useArticle, useBlogImage} =useContext(BlogContext);
    const [blogContent,setBlogContent] = useBlogContent;
    const [blogImage,setBlogImage] = useBlogImage;
    const [article,setArticle] = useArticle;
    const deleteBlog = async (_id,image_id) =>{
        let confirmDelete = window.confirm('Are you sure you want to delete this blog?')
        if(confirmDelete){
            await axios.post('/api/blog/blogs/delete',{_id: _id,image_id: image_id})
            alert('Deleted!');
            router.reload();
        }
        else{
            window.close();
        }
    }
    useEffect(()=>{
                setBlogContent({
                title: "",
                subtitle: "",
                article: "",
                timestamp: "",
                videoUrl: "",
                category: "樓價",
                contentType: "英國懶人包",
                uploadDate : "",
                imagefile: []
                });
                setBlogImage([]);
                setArticle('');
            },[]) // eslint-disable-line react-hooks/exhaustive-deps
        return(
        <div>
            <Link href='/admin/blog/upload'>
                <div className="listed addBlog pointer">
                    <h1><i className="fas fa-upload"></i>Add New Blog</h1>
                </div>
            </Link>
            {blogs.map((blog,i) =>
            <div className="listed" key={i}>
                <div className='listed-image'>
                    <Image alt="" src={blog.imagefile} layout='fill'/> 
                </div>
                <div className="list-content">
                    <h2>{blog.title}</h2>
                    <h4 className='adminlist-mid'>
                        <span><i className="fas fa-calendar-day"></i>{blog.uploadDate}</span>
                    </h4>
                </div>
                <div className="adminlist-right">
                    <Link href={`/admin/blog/upload/${blog._id}`}>
                        <div className='buttonLink pointer'>
                           Edit<i className="fas fa-edit"></i> 
                        </div>
                    </Link>
                        <div onClick={() => {deleteBlog(blog._id,blog.image_id)}} className='buttonLink pointer'>Delete<i className="fas fa-trash"></i></div>
                </div>
            </div>)}
            <QueryPagination pagination={pagination}/>
        </div>
    )
}

export default function AdminBlog(props){
    return (
        <div>
            <Head>
            <title>PentaGo! - 後台管理</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Script src="https://kit.fontawesome.com/dbb3bd5296.js" crossorigin="anonymous"/>
            <Toolbar/>
            <div className="overlap">
                <div className="admin-body">
                    <section className="blog-filter">
                        <input htmlFor="title" placeholder="Search title..." className="admin-blog-search"/>
                    </section>
                    <section className="listings">
                        <AdminBlogListings {...props}/>              
                    </section>             
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps = withPageAuthRequired({
    returnTo: '/admin',
    async getServerSideProps(context) {
    let page = context.query.page
    if(!page) {page = 1};
    const blogs = await Dbconnect('blogs')
    let recordPerPage = 8;
    const blogList = await blogs.find()
                              .sort({timestamp: -1})
                              .skip((page-1) * recordPerPage)
                              .limit(recordPerPage)
                              .toArray();
    const blogCount = await blogs.countDocuments()
    return{
        props: {
          blogs: blogList.map(data=>({
                    _id: data._id.toString(),
                    title: data.title,
                    imagefile: data.imagefile[0],
                    image_id: data.image_id,
                    uploadDate: data.uploadDate,
                  })),
          pagination: blogCount.toString(),
        }
        }
    }})