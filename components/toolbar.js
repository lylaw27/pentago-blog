import Link from 'next/link';
import Image from 'next/image';

export default function Toolbar(){
    return(
        <div className='adminMenu'>
            <Link href='/admin'>
                <div className="logo">
                    <Image  alt="" src={require('../images/logo.svg')}/>
                </div>
            </Link>
            <Link href='/admin' >
                <div className="menu-list pointer">
                    <i className="fa-brands fa-flipboard"/>主頁<i className="fa-solid fa-angle-right"/>
                </div>
            </Link>
            <Link href='/admin/blog'>
                <div className="menu-list pointer">
                    <i className="fa-solid fa-file-pen"/>文章<i className="fa-solid fa-angle-right"/>
                </div>
            </Link>
            <Link href='/admin/draft'>
                <div className="menu-list pointer">
                    <i className="fa-solid fa-paste"/>草稿<i className="fa-solid fa-angle-right"/>
                </div>
            </Link>
            {/* <Link href='/admin'>
                <div className="menu-list pointer">
                    <i className="fa-solid fa-house-chimney"/>Properties<i className="fa-solid fa-angle-right"/>
                </div>
            </Link>
            <Link href='/admin'>
                <div className="menu-list pointer">
                    <i className="fa-solid fa-gear"/>Settings<i className="fa-solid fa-angle-right"/>
                </div>
            </Link> */}
            <div className="menu-user">
                <i className="fa-solid fa-user"/>Ken Au
                <Link href="/api/auth/logout">
                    <i className="fa-solid fa-right-from-bracket"/>
                </Link>
            </div>
        </div>
        )
}