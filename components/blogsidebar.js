import Link from 'next/link';
import Image from 'next/image';

export default function BlogSidebar({sidebar,scollFunc}){
    return(
    <div className="blog-sidebar">
        <div className="blog-sidebox">
            <h1>關於我們</h1>
            <div className='blog-sidebar-img'>
                <Image alt="" src={require('../images/profilepic.png')}/>
            </div>
            <p>身處香江 遠眺英倫</p>
            <p>不列顛島 地大物博</p>
            <p>歷史文化 璀璨奪目</p>
            <p>物業選擇 恆河沙數</p>
            <p>民間分析 逐一探討</p>
        </div>
        <div className="blog-sidebox blog-sidebox-signup">
            <h2>歡迎訂閲並接受我們最新的資訊！</h2>
            <div className="blog-sidebox-signup-button" onClick={scollFunc}>
            立即訂閲
            </div>
        </div>
        <div className="blog-sidebox blog-sidebox-post">
            <h1>最新帖子</h1>
            {sidebar.map((recentBlog,i)=>
                <Link key={i} href={`/blog/${recentBlog._id}`}>
                    {recentBlog.title}
                </Link>
            )}
        </div>
        <div className="blog-sidebox">
            <h1>聯絡我們</h1>
            <div className="icon-wrapper">
                <Link href="https://www.facebook.com/PentaGo-%E8%8B%B1%E5%9C%8B%E7%89%A9%E6%A5%AD%E9%A0%98%E8%88%AA-101672148357502/?view_public_for=101672148357502"><i className="fab fa-facebook-f"></i></Link>
                <Link href="https://www.instagram.com/pentagoproperty/"><i className="fab fa-instagram"/></Link>
                <Link href="https://api.whatsapp.com/send?phone=85251133670"><i className="fab fa-whatsapp"/></Link>
                <Link href="mailto:cs@pentagoproperty.com"><i className="far fa-envelope"/></Link>
            </div>
        </div>
        <div className="blog-sidebox blog-sidebox-post">
            <h1>分類</h1>
            <Link href='/category/樓市走勢'>樓市走勢🏠</Link>
            <Link href='/category/專題'>經濟發展📈</Link>
            <Link href='/category/專題'>專題</Link>
            <Link href='/category/歷史文化'>歷史文化🏰</Link>
            <Link href='/category/就業'>就業</Link>
            <Link href='/category/就業'>通勤交通🚅</Link>
            <Link href='/category/就業'>天氣地理🌦</Link>
            <Link href='/category/教育'>學校教育🧒🏻</Link>
            <Link href='/category/教育'>地區分析</Link>
            <Link href='/category/教育'>市場熱話</Link>
            <Link href='/category/教育'>數據比較</Link>
        </div>
    </div>
  )
}
