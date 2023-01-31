import Link from 'next/link';
import Head from 'next/head'
import Script from 'next/script.js';
import { useRef } from 'react';
import ImageGallery from 'react-image-gallery';
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import BlogSidebar from '../components/blogsidebar';
import BlogSubscription from '../components/subscription.js';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default function BlogLayout(props){
    const sidebar = props.sidebar;
    const blogContent= props.blogContent;
    if(props.article){blogContent.article = props.article}
    const scrollRef = useRef(null);
    const scrollToSub = () =>{
        scrollRef.current.scrollIntoView({behavior: 'smooth'});
    }
    const currentURL = `https://researcherp.com/content/${blogContent.url}`
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <title>{blogContent.title}</title>
                <meta name="publisher" content="ReseacherP"/>
                <meta property="og:url" content={currentURL}/>
                <meta property="og:title" content={blogContent.title}/>
                <meta property="og:description" content={blogContent.subtitle}/>
                <meta property="og:image" content={blogContent.imagefile[0]}/>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </Head>
            <div>
            <Header/>
            <div className="overlap">
            <section className="blog-body">
                <div className="blog-share">
                    <i className="fas fa-share-alt"/>
                    <Link href={`https://www.facebook.com/share.php?u=${currentURL}`}><i className="fab fa-facebook-f pointer"/></Link>
                    <Link href={`https://api.whatsapp.com/send?text=${currentURL}`}><i className="fab fa-whatsapp pointer"/></Link>
                    <Link href={`mailto:?subject=${blogContent.title}&body=${currentURL}`}><i className="far fa-envelope pointer"/></Link>
                </div>
                <Blogdetail {...props}/>
                <BlogSidebar display={'blog-sidebar'} sidebar={sidebar} contentType={blogContent.contentType} scollFunc={scrollToSub}/>
            </section>
                <BlogSidebar display={'blog-sidebar-m'} sidebar={sidebar} contentType={blogContent.contentType}/>
            <section className="mobile-share">
                <div className="share-wrapper">
                <h3>分享文章</h3>
                    <div>
                        <Link href={`https://www.facebook.com/sharer/sharer.php?u=${currentURL}`}><i className="fab fa-facebook-f"/></Link>
                        <Link href={`https://api.whatsapp.com/send?text=${currentURL}`}><i className="fab fa-whatsapp"/></Link>
                        <Link href={`mailto:?subject=${blogContent.title}&body=${currentURL}`}><i className="far fa-envelope"/></Link>
                    </div>
                </div>
            </section>
            <div ref={scrollRef}>
                <BlogSubscription />
            </div>
            <Footer/>
            </div>
        </div>
       </>
    );
}

export function Blogdetail({blogContent,suggestion}){
    return(
        <div className="blog-content">
        <div className='blog-header'>
            {blogContent.category.map((category)=>(
              <Link key={category} href={`/category/${category}`} >
              <div className="blog-tag txt-pointer">
              {category}
              </div>
              </Link>
            ))
            }
                <h1 className='blog-header-title'>{blogContent.title}</h1>
                <div className="blog-content-date">
            {blogContent.uploadDate}
            </div>
        </div>
                <div style={{display: blogContent.videoUrl ? 'none' : 'block', margin: '30px 0px'}}>
                    <ImageGallery items={blogContent.imagefile} showFullscreenButton={false} showPlayButton={false}/>
                </div>
                <iframe className="blog-video"
                src={blogContent.videoUrl} style={{display: blogContent.videoUrl ? 'block' : 'none'}}>
                </iframe>
                <SunEditor setAllPlugins={false} autoFocus={false} setContents={blogContent.article} disable={true} disableToolbar={true} hideToolbar={true} setOptions={{height: "auto",resizingBar: false, showPathLabel: false}}/>
            <h3 className="suggestion-title">你可能會喜歡</h3>
                <div className="suggestion">
                    {suggestion.map((suggest,i) =>
                        <Link href={`/content/${suggest.url}`} key={i} >
                            <div className={"suggest-list-" + i + " suggest-list pointer"}>
                               <div className="suggest-image" style={{backgroundImage: `url(${suggest.imagefile})`}}/>
                                <h3>{suggest.title}</h3>
                            </div>
                        </Link>
                    )}
                </div>
        </div>
   )
}