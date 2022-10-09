import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import {useRef} from 'react';
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import BlogPagination from '../components/blogpagination.js';
import BlogSidebar from '../components/blogsidebar';
import BlogSubscription from '../components/subscription.js';

export default function Home({blogs, sidebar, pagination}){ 
  const scrollRef = useRef(null);
  const scrollToSub = () =>{
    scrollRef.current.scrollIntoView({behavior: 'smooth'});
  }
    return(
    <div>
        <Head>
            <title>PentaGo! - 英國地區最強宏觀數據分析</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
      <Script src="https://kit.fontawesome.com/dbb3bd5296.js" crossorigin="anonymous"/>
        <Header/>
      <div className="overlap">
      <div className="background">
        <div className="title">
            <h2>Your UK Property Navigator</h2>
            <h3 className="chineseheader">英 國 物 業 領 航</h3>
        </div>
      </div>
      <section className="blog-section">
        <div className="blog-body">
          <BlogList blogs={blogs}/>
          <BlogSidebar scollFunc={scrollToSub} sidebar={sidebar} contentType={pagination.contentType}/>
        </div>
          <BlogPagination pagination={pagination}/>
      </section>
      <div ref={scrollRef}>
        <BlogSubscription/>
      </div>
    <Footer/>
    </div>
    </div>
  )
}
function BlogList({blogs}){
    if(!blogs){
    return(
        <div className="blog-wrapper">
        <div className='loading'>
        <h1>很抱歉，我們暫時沒有相關的文章...</h1>
        </div>
        </div>
    )}
    return(
        <div className="blog-wrapper">
        {blogs.map((blogs,i) =>
        <div className="blog-list" key={i}>
            <div className="blog-date">
            {blogs.uploadDate}
            </div>
            <div className="blog-list-img">
              <Image alt="" src={blogs.imagefile[0]} layout="fill" objectFit="contain"/>
            </div>
            <span className="blog-tag">
            {blogs.category}
            </span>
            <h2 className='blog-list-title'>
            {blogs.title}
            </h2>
            <p className='blog-list-subtitle'>
            {blogs.subtitle}
            </p>
              <Link href={`/content/${blogs._id}`} >
                <div className="blog-read">
                  閲讀更多
                </div>
              </Link>
        </div>)}
        </div>
    )
}