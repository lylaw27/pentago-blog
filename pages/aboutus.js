import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import {useRef} from 'react';
import Header from '../components/header.js';
import Footer from '../components/footer.js';

export default function Aboutus(){
        return(
            <div className="aboutus">
            <Head>
                <title>PentaGo! - 關於我們</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Script src="https://kit.fontawesome.com/dbb3bd5296.js" crossorigin="anonymous"/>
                <Header/>
                <div className="overlap">
                <section className="top">
                    <div className=''>
                        <h1>PentaGO! <br/>英國物業領航</h1>
                        <p>跟進買賣前後服務 <br className="break"/>助您置業無後顧之憂</p>
                    </div>
                </section>
                <section className="service1">
                    <div className='aboutImg'>
                        <Image alt="" src={require('../images/about2.jpg')} layout='fill'/>
                    </div>
                    <div>    
                        <h1>我們的服務</h1>
                        <p>PentaGo! 提供最強英國物業分析，專業駐英團隊實地搵樓，專攻二手物業，一站式服務尋找物業、買賣協商、設計裝修、改建增值、驗樓報告、法律支援、按揭顧問及租賃管理等。</p>
                    </div>
                </section>
                <section className="service2">
                    <div className="content">    
                        <h1>準備置業</h1>
                        <div><i className="fas fa-home"></i><p>搜羅低於市價BMV (Below Market Value) 優質物業</p></div>
                        <div><i className="fas fa-pound-sign"></i><p>與當地房地產中介進行買賣協商</p></div>
                        <div><i className="far fa-newspaper"></i><p>提供驗樓服務及報告 監督修葺樓宇結構</p></div>
                    </div>
                    <Image alt="" src={require('../images/about3.jpg')}/>
                </section>
                <section className="service3">
                    <Image alt="" src={require('../images/about4.jpg')}/>
                    <div className="content">
                        <h1>置業完成</h1>
                        <div><i className="fas fa-ruler-combined"></i><p>專業室內設計 度身訂造不同方案</p></div>
                        <div><i className="fas fa-tools"></i><p>擴建及改造 提升物業回報</p></div>
                        <div><i className="fas fa-chart-line"></i><p>洽談租客 追逐長期穩定收益</p></div>
                    </div>
                </section>
                <Footer/>
                </div>
            </div>
        )
    }

