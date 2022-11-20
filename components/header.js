import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header(){
  const [displayState,setDisplayState] = useState('none');
  const navDropdown = () =>{
    if(displayState === 'none'){
      setDisplayState('block');
    }
    else{
      setDisplayState('none');
    }
  }
  return (
    <header>
        <div className="header-box">
          <Link href="/">
            <div className='logo'>
                <Image alt="" src={require('../images/logo.svg')}/>
            </div>
          </Link>
          <nav className='nav-pc'>
            <Link href="/民間博客">
                <span className='pointer'>民間博客</span>
            </Link>
            <Link href="/Patreon文章預覽">
                <span className='pointer'>Patreon文章預覽</span>
            </Link>
            <Link href="/英國物業小知識">
                <span className='pointer'>英國物業小知識</span>
            </Link> 
            <Link href="/英國懶人包">
                <span className='pointer'>英國懶人包</span>
            </Link>
            <Link href="/Youtube影片">
                <span className='pointer'>Youtube影片</span>
            </Link>
          </nav>
          <nav className='nav-mobile'>
            <div onClick={navDropdown}>
              <i className="fa-solid fa-bars"/>
            </div>
          </nav>
        </div>
        <div className='nav-dropdown' style={{display: displayState}}>
          <Link href="/英國懶人包" >
            <div className='nav-item'>民間懶人包</div>
          </Link>
          <Link href="/民間博客" >
            <div className='nav-item'>民間博客</div>
          </Link>
          <Link href="/Patreon文章預覽" >
            <div className='nav-item'>Patreon文章預覽</div>
          </Link>
          <Link href="/英國物業小知識" >
            <div className='nav-item'>英國物業小知識</div>
          </Link>
          <Link href="/Youtube影片" >
            <div className='nav-item'>Youtube影片</div>
          </Link>
          <div className="nav-item">
          <Link href="https://www.facebook.com/PentaGo-%E8%8B%B1%E5%9C%8B%E7%89%A9%E6%A5%AD%E9%A0%98%E8%88%AA-101672148357502/?view_public_for=101672148357502"><i className="fab fa-facebook-f"></i></Link>
          <Link href="https://www.instagram.com/pentagoproperty/"><i className="fab fa-instagram"></i></Link>
          <Link href="https://api.whatsapp.com/send?phone=85251133670"><i className="fab fa-whatsapp"></i></Link>
          <Link href="https://www.youtube.com/c/ResearcherP"><i className="fa-brands fa-youtube"></i></Link>
        </div>
        </div>
    </header>
  );
}

