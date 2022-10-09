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


function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <BlogProvider>
        <Component {...pageProps} />
      </BlogProvider>
    </UserProvider>
  )
}

export default MyApp
