import '../styles/adminhome.css';
import '../styles/blog-admin.css';
import '../styles/details.css';
import '../styles/globals.css';
import '../styles/home.css';
import '../styles/aboutus.css';
import '../styles/login.css';
import '../styles/pagination.css';
import '../styles/sidebar.css';
import '../styles/upload.css';
import '../styles/texteditor.css'
import { UserProvider } from '@auth0/nextjs-auth0';
import { BlogProvider } from '../context/preview';
import Script from 'next/script';


function MyApp({ Component, pageProps }) {
  return (
    <>
    <Script src="https://kit.fontawesome.com/dbb3bd5296.js" crossorigin="anonymous"/>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=G-TJ8JNZMR1Y`} />

<Script id="google-analytics">
    {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-TJ8JNZMR1Y', {
          page_path: window.location.pathname,
        });
    `}
</Script>
    <Script id="facebook-pixel">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '730992154174691');
        fbq('track', 'PageView');
      `}
    </Script>

    <UserProvider>
      <BlogProvider>
        <Component {...pageProps} />
      </BlogProvider>
    </UserProvider>
    </>
  )
}

export default MyApp
