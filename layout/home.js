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
            <title>英國民間分析員阿P - 最強英國地區全面分析</title>
            <meta name="description" content="由國家宏觀經濟、地區樓價及學校數據以至各類主題分析。無論買樓投資或海外升學，下決定前參考數據非常重要"/>
            <meta charset="UTF-8"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
      <Script src="https://kit.fontawesome.com/dbb3bd5296.js" crossorigin="anonymous"/>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{__html: `(window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-TJ8JNZMR1Y');)`,}}/>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-TJ8JNZMR1Y"></Script>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{__html: `(!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '730992154174691');fbq('track', 'PageView');)`}}>
    </Script>
        <Header/>
      <div className="overlap">
      <div className="background">
        <div className="title">
            <h1>最強英國地區全面分析</h1>
            <h1 className="chineseheader">英國民間分析員阿P</h1>
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