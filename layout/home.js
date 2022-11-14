import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
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
          <BlogList blogs={blogs} metatag={metatag}/>
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

function BlogHeader({metatag}){
  let divider = '\xa0>\xa0';
  if(!metatag.category){
     divider = '';
  }
return (
      <div className="blog-header-wrapper">
          <Link href={`/${metatag.contentType}`}><h1 className="blog-header pointer">{metatag.contentType}</h1></Link>
          <span className="blog-header-divider">{divider}</span>
          <Link href={`/${metatag.contentType}/category/${metatag.category}`}><h1 className="blog-header pointer">{metatag.category}</h1></Link>
      </div>
    )
}

function BlogList({blogs,metatag}){
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
        <BlogHeader metatag={metatag}/>
        {blogs.map((blogs,i) =>
        <div className="blog-list" key={i}>
          <Link href={`/content/${blogs.url}`}>
            <div className="blog-list-img pointer">
                <Image alt={blogs.title} src={blogs.imagefile[0]} layout="fill" objectFit="contain"/>
            </div>
          </Link>
          <div className='blog-list-info'>
            <div className="blog-date">
            {blogs.uploadDate}
            </div>
            <Link href={`/${blogs.contentType}/category/${blogs.category}`} >
            <div className="blog-tag pointer">
            {blogs.category}
            </div>
            </Link>
            <Link href={`/content/${blogs.url}`} >
            <h1 className='blog-list-title pointer'>
            {blogs.title}
            </h1>
            </Link>
            <p className='blog-list-subtitle'>
            {blogs.subtitle}
            </p>
{/*             
              <div className="blog-read">
                閲讀更多
              </div> */}
          </div>
        </div>)}
        </div>
    )
}