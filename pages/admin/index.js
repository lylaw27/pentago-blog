import Head from 'next/head';
import Script from 'next/script';
import Toolbar from '../../components/toolbar';
import Dbconnect from '../../components/db';
import { useUser } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function AdminDashboard({blogs,properties}){
    const { user, error, isLoading } = useUser();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    return (
        <div>
            <Head>
            <title>PentaGo! - 後台管理</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Script src="https://kit.fontawesome.com/dbb3bd5296.js" crossorigin="anonymous"/>
            <Toolbar/>
            <div className='admin-body'>
                <div className='db-title'>Dashboard
                <hr/>
                </div>
                <div className='db-content'>
                    <div className='db-stats'>
                        <i className="fa-solid fa-file-pen"></i>
                        <div className="db-count">{blogs}</div>
                        <div>Blogs</div>
                    </div>
                    <div className='db-stats'>
                        <i className="fa-solid fa-house-chimney"></i>
                        <div className="db-count">{properties}</div>  
                        <div>Properties</div>
                    </div>
                    <div className='db-stats'>
                        <i className="fa-solid fa-file-contract"/>
                        <div className="db-count">1</div>
                        <div>Subcriptions</div>
                    </div>
                    <div className='db-stats'>
                        <i className="fa-solid fa-chart-line"/>
                        <div className="db-count">1</div>
                        <div>Monthly Views</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = withPageAuthRequired({
    returnTo: '/admin',
    async getServerSideProps() {
        const blogs = await Dbconnect('blogs');
        const properties = await Dbconnect('properties');
        const blogCount = await blogs.countDocuments();
        const propertyCount = await properties.countDocuments();
        return { 
            props:{
                        blogs: blogCount.toString(),
                        properties: propertyCount.toString()
                    }
                }
            }})