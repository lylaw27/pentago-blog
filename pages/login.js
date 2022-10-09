import Link from "next/link";
import Image from "next/image.js";
import Head from "next/head";

export default function LoginPage(){
    return(
    <div>
        <Head>
            <title>PentaGo! - 登入</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="login-page">
            <div className="login-panel">
               <Image className="logo" alt="" src={require('../images/logo.svg')}/>
                    <Link href='/api/auth/login'>
                        <div className="input-border submit-button">
                            Login
                        </div>
                    </Link>
            </div>
        </div> 
    </div>
    )

}