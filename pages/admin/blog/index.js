import Link from 'next/link.js';
import Script from 'next/script.js';
import Head from 'next/head.js';
import { useRouter } from 'next/router'
import Toolbar from '../../../components/toolbar.js';
import axios from 'axios';
import { useEffect,useContext, useState } from 'react';
import BlogContext from '../../../context/preview';
import QueryPagination from '../../../components/querypagination.js';
import Dbconnect from '../../../components/db.js';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';


const AdminBlogListings = ({blogs, pagination, changeLoading}) => {
    let router = useRouter();
    const {useBlogContent, useArticle, useBlogImage} =useContext(BlogContext);
    const [blogContent,setBlogContent] = useBlogContent;
    const [blogImage,setBlogImage] = useBlogImage;
    const [article,setArticle] = useArticle;
    const [search,setSearch] = useState('');
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
    const ChangeHandler = (e) =>{
        let value = e.target.value;
        setSearch(value);
    }
    const pinBlog = async(_id,pinned) =>{
        changeLoading();
        await axios.post('/api/blog/blogs/pin',{_id: _id, pinned: pinned})
        .then((res =>{
            alert(res.data.msg);
            console.log(res.data.msg)
            router.reload();
        }))
    }
    useEffect(()=>{
                setBlogContent({
                title: "",
                subtitle: "",
                article: "",
                timestamp: "",
                videoUrl: "",
                category: [],
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
                    <h1><i className="fas fa-upload"></i>新增文章</h1>
                </div>
            </Link>
            <section className="blog-filter">
                <input htmlFor="title" onChange={ChangeHandler} value={search} placeholder="搜尋標題..." className="admin-blog-search"/>
                <Link href={`/admin/blog?title=${search}`}><button className='admin-search-button pointer'><i className="fa fa-search"></i></button></Link>
            </section>
            <div className='listed'>
                <div className="listed-content" style={{ backgroundColor:'#e9e9e9',fontSize: '17px', gridTemplateRows: '50px',color: 'black'}}>
                    <div style={{gridColumn: '1/2',justifySelf: 'center'}}>標題</div>
                    <div style={{gridColumn: '2/3', justifySelf: 'center'}}>上載日期</div>
                    <div style={{gridColumn: '3/4', justifySelf: 'center'}}>文章類型</div>
                    <div style={{gridColumn: '4/5', justifySelf: 'center'}}>類別</div>
                </div>
                
                {blogs.map((blog,i) => 
                <div className="listed-content" key={i} style={{ backgroundColor: i%2===0 ? '#fcfcfc':'#f0f0f0'}}>
                        <Link href={`/content/${blog.url}`}><span style={{gridColumn: '1/2'}}>{blog.title}</span></Link>
                        <Link href={`/admin/blog?uploadDate=${blog.uploadDate}`}><span style={{gridColumn: '2/3', justifySelf: 'center'}} >{blog.uploadDate}</span></Link>
                        <Link href={`/admin/blog?contentType=${blog.contentType}`}><span style={{gridColumn: '3/4', justifySelf: 'center'}}>{blog.contentType}</span></Link>
                        <Link href={`/admin/blog?category=${blog.category}`}><span style={{gridColumn: '4/5', justifySelf: 'center'}}>{blog.category}</span></Link>
                    <div style={{gridColumn: '5/6', justifySelf: 'center'}} className="listed-action">
                        <div onClick={() => {pinBlog(blog._id,blog.pinned)}} className='pointer'><i className="fa-solid fa-thumbtack"  style={{ color: blog.pinned ? '#EE4B2B':'#000000'}}></i></div>
                        <Link href={`/admin/blog/upload/${blog._id}`}><div className=' pointer'><i className="fas fa-edit"></i> </div></Link>
                        <div onClick={() => {deleteBlog(blog._id,blog.image_id)}} className=' pointer'><i className="fas fa-trash"></i></div>
                    </div>
                </div>)}
            </div>
            <QueryPagination pagination={pagination}/>
        </div>
    )
}

export default function AdminBlog(props){
    const [loading, setLoading] = useState({
        alertBox: 'none',
        disableDiv: ''
    })
    const changeLoading = () =>{
        setLoading({ alertBox: 'flex', disableDiv: 'disableDiv'})
    }
    return (
        <div>
            <Head>
            <title>PentaGo! - 後台管理</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Script src="https://kit.fontawesome.com/dbb3bd5296.js" crossorigin="anonymous"/>
            <Toolbar/>
            <div className="overlap">
            <div className="loadingBox" style={{display: loading.alertBox}}>Please wait...</div>
                <div className={`admin-body ${loading.disableDiv}`}>
                    <section className="listings">
                        <AdminBlogListings {...props} changeLoading={changeLoading}/>              
                    </section>             
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps = withPageAuthRequired({
    returnTo: '/admin',
    async getServerSideProps(context) {
    let adminQuery = context.query
    let page = parseInt(adminQuery.page);
    if(!adminQuery.page) {page = 1};
    delete adminQuery.page;
    if(context.query.title){adminQuery = {title: {$regex : context.query.title}}}
    const blogs = await Dbconnect('blogs')
    let recordPerPage = 20;
    const blogList = await blogs.find(adminQuery)
                              .sort({pinned: -1,timestamp: -1})
                              .skip((page-1) * recordPerPage)
                              .limit(recordPerPage)
                              .toArray();
    const blogCount = await blogs.countDocuments(adminQuery)
    return{
        props: {
          blogs: blogList.map(data=>({
                    _id: data._id.toString(),
                    title: data.title,
                    category: data.category,
                    url: data.url,
                    pinned : data.pinned,
                    contentType: data.contentType,
                    image_id: data.image_id,
                    uploadDate: data.uploadDate,
                  })),
          pagination: {
                    blogCount: blogCount.toString(),
                    page: page,
                    query: adminQuery
            }
        }
        }
    }})