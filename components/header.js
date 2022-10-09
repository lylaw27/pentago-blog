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
            <Link href="/patreon" >
                <span className='pointer'>Patreon文章預覽</span>
            </Link>
            <Link href="/" >
                <span className='pointer'>英國懶人包</span>
            </Link>
            <Link href="/blog" >
                <span className='pointer'>英國物業小知識</span>
            </Link> 
            <Link href="/Youtube影片" >
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
          <Link href="/" >
            民間懶人包
          </Link>
          <Link href="/blog" >
            民間博客
          </Link> 
        </div>
    </header>
  );
}

