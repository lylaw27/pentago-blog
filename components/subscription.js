import React, { useState,useRef } from "react";

export default function BlogSubscription(){
    async function submitEmail(){
        const response = await fetch('/api/subscription',{
            method: 'POST',
            body: JSON.stringify({email}),
            headers: {'Content-Type': 'application/json'}
        });
        const data = await response.json();
        alert(data.msg);
    }
    const submitted = useRef(null);
    const [email,setEmail] = useState('');
    const ChangeHandler = (e) => {
        setEmail(e.target.value);
    }
    return(
    <section className="subscription">
        <h1>歡迎訂閲並接收我們最新的資訊！</h1>
        <div className="subscription-details">
            <input htmlFor="email" placeholder="電子郵件" type="email" className="input-email" onChange={ChangeHandler} value={email} required/>
            <input ref={submitted} type="submit" value="訂閲" className="input-submit" onClick={submitEmail}/>
        </div>
    </section>
    )
}
