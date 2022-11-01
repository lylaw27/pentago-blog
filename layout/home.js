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

export default function Home({blogs, sidebar, pagination, metatag}){ 
  const scrollRef = useRef(null);
  const scrollToSub = () =>{
    scrollRef.current.scrollIntoView({behavior: 'smooth'});
  }
    return(
    <div>
        <Head>
            <title>{metatag.title}</title>
            <meta name="description" content={metatag.description}/>
            <meta charSet="UTF-8"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <Header/>
      <div className="overlap">
      <div className="background">
        <div className="title">
            <h1>最強英國地區全面分析<br/>英國民間分析員阿P</h1>
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
              <Image alt={blogs.title} src={blogs.imagefile[0]} layout="fill" objectFit="contain"/>
            </div>
            <span className="blog-tag">
            {blogs.category}
            </span>
            <h1 className='blog-list-title'>
            {blogs.title}
            </h1>
            <p className='blog-list-subtitle'>
            {blogs.subtitle}
            </p>
              <Link href={`/content/${blogs.url}`} >
                <div className="blog-read">
                  閲讀更多
                </div>
              </Link>
        </div>)}
        </div>
    )
}