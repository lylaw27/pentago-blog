import Head from 'next/head';
import Toolbar from '../../components/toolbar';
import Dbconnect from '../../components/db';
import { useUser } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Link from 'next/link';

export default function AdminDashboard(props){
    const { user, error, isLoading } = useUser();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    return (
        <div>
            <Head>
            <title>PentaGo! - 後台管理</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Toolbar/>
            <div className='admin-body'>
                <div className='db-title'>Dashboard
                <hr/>
                </div>
                <div className='db-content'>
                    <Link href={'/admin/blog?contentType=民間博客'}>
                    <div className='db-stats pointer'>
                        <i className="fa-solid fa-file-pen"></i>
                        <div className="db-count">{props.blog}</div>
                        <div>民間博客</div>
                    </div>
                    </Link>
                    <Link href={'/admin/blog?contentType=英國懶人包'}>
                    <div className='db-stats pointer'>
                        <i className="fa-brands fa-instagram"/>
                        <div className="db-count">{props.ig}</div>
                        <div>英國懶人包</div>
                    </div>
                    </Link>
                    <Link href={'/admin/blog?contentType=Youtube影片'}>
                    <div className='db-stats pointer'>
                        <i className="fa-brands fa-youtube"/>
                        <div className="db-count">{props.youtube}</div>
                        <div>Youtube影片</div>
                    </div>
                    </Link>
                    <Link href={'/admin/blog?contentType=Patreon文章預覽'}>
                    <div className='db-stats pointer'>
                        <i className="fa-brands fa-patreon"/>
                        <div className="db-count">{props.patreon}</div>
                        <div>Patreon文章預覽</div>
                    </div>
                    </Link>
                    <Link href={'/admin/blog?contentType=英國物業小知識'}>
                    <div className='db-stats pointer'>
                        <i className="fa-solid fa-house-chimney"></i>
                        <div className="db-count">{props.property}</div>  
                        <div>英國物業小知識</div>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = withPageAuthRequired({
    returnTo: '/admin',
    async getServerSideProps() {
        const blogs = await Dbconnect('blogs');
        const blogCount = await blogs.countDocuments({contentType: '民間博客'});
        const propertyCount = await blogs.countDocuments({contentType: '英國物業小知識'});
        const igCount = await blogs.countDocuments({contentType: '英國懶人包'});
        const youtubeCount = await blogs.countDocuments({contentType: 'Youtube影片'});
        const patreonCount = await blogs.countDocuments({contentType: 'Patreon文章預覽'})
        return { 
            props:{
                        blog: blogCount.toString(),
                        property: propertyCount.toString(),
                        ig: igCount.toString(),
                        youtube: youtubeCount.toString(),
                        patreon: patreonCount.toString(),
                    }
                }
            }})