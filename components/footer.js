import Image from 'next/image';
import Link from 'next/link'

export default function Footer(){
  return (
    <section className="footer">
        <Link href="/">
            <div className="footer-logo logo">
                <Image alt="" src={require('../images/logo.svg')}/>
            </div>
        </Link>
        <div className="footer-icons">
          <Link href="https://www.facebook.com/PentaGo-%E8%8B%B1%E5%9C%8B%E7%89%A9%E6%A5%AD%E9%A0%98%E8%88%AA-101672148357502/?view_public_for=101672148357502"><i className="fab fa-facebook-f"></i></Link>
          <Link href="https://www.instagram.com/pentagoproperty/"><i className="fab fa-instagram"></i></Link>
          <Link href="https://www.youtube.com/c/ResearcherP"><i className="fa-brands fa-youtube"></i></Link>
          <Link href="https://api.whatsapp.com/send?phone=85251133670"><i className="fab fa-whatsapp"></i></Link>
          <Link href="mailto:cs@pentagoproperty.com"><i className="far fa-envelope"></i></Link>
        </div>
        <p><i className="fas fa-map-marker-alt"></i>20/F, Leighton Centre, 77 Leighton Road, Causeway Bay, HK</p>
        <p className="copyright">Copyright © 2020 Pentago Property Limited. All rights reserved.</p>
    </section>
  );
}
