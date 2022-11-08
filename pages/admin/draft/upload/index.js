import React, {useContext,useState,useRef} from 'react';
import Toolbar from '../../../../components/toolbar';
import Script from 'next/script';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';
import Link from 'next/link';
import BlogContext from '../../../../context/preview';
import axios from 'axios';

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default function CreateBlog(){
    const {useBlogContent, useArticle, useBlogImage} =useContext(BlogContext);
    const [blogContent,setBlogContent] = useBlogContent;
    const [blogImage,setBlogImage] = useBlogImage;
    const [submitDisabled,setSubmitDisabled] = useState(false);
    const [article,setArticle] = useArticle;
    const imageInput = useRef();
    const ChangeHandler = (e) =>{
        let target = e.target;
        let name = target.name;
        let value = target.value;
        setBlogContent({...blogContent,[name]: value});
    }
    const ImageSelectionHandler = async(e) => {
        const files = e.target.files
        let imagePreview = [];
        setBlogImage(Object.values(files));
        for(let i=0;i<files.length;i++){
            const imageUrl = URL.createObjectURL(files[i]);
            imagePreview.push({original: imageUrl});
        }
        setBlogContent({...blogContent, imagefile: imagePreview});
    }
    const clearAll = () =>{
        if(confirm('Are you sure you want to clear all contents?')){
           setBlogContent({
            title: "",
            subtitle: "",
            article: "",
            timestamp: "",
            videoUrl: "",
            category: "樓價",
            contentType: "英國懶人包",
            uploadDate : "",
            imagefile: []
            });
            imageInput.current.value = '';
            setBlogImage([]);
            setArticle('');
        }
    }
    const uploadImage = async()=>{
        let imageUrl = [];
        let imageId = [];
        let result;
        for(let i=0 ; i<blogImage.length;i++){
            const formData = new FormData();
            formData.append('file',blogImage[i])
            formData.append('upload_preset','cqjtny6l')
            const res = await axios.post('https://api.cloudinary.com/v1_1/pentagoproperty/image/upload',formData)
            imageUrl.push(res.data.secure_url);
            imageId.push(res.data.public_id);
            console.log(res)
        }
        result = {...blogContent, imagefile: imageUrl, image_id: imageId, article: article};
        console.log(result)
        return result
    }
    const submit = async(e) => {
        e.preventDefault();
        if(confirm('Confirm Upload?')){
        const payload = await uploadImage();
        console.log(payload)
        setSubmitDisabled(true);
        const res = await axios.post('/api/blog/post',{payload})
        const result = await res.data;
        alert('Upload Successful!');
        setSubmitDisabled(false);
    }}
    const save = async(e) => {
        e.preventDefault();
        if(confirm('Confirm Upload?')){
        const payload = await uploadImage();
        console.log(payload)
        setSubmitDisabled(true);
        const res = await axios.post('/api/blog/draft',{payload})
        const result = await res.data;
        alert('Saved as Draft!');
        setSubmitDisabled(false);
    }}
        return(
            <div>
            <Head>
            <title>PentaGo! - 後台管理</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Script src="https://kit.fontawesome.com/dbb3bd5296.js" crossorigin="anonymous"/>
            <Toolbar/>
            <div className='uploadpage admin-body'>
                <h2>Create Blog</h2>
                    <form>
                        <label htmlFor="Image">Image</label>
                        <input ref={imageInput} type="file" name="imagefile" accept="image/*" onChange={ImageSelectionHandler} multiple required/><br/>
                        <label htmlFor="contentType">Content Type</label>
                        <select className="input-border" name="contentType" onChange={ChangeHandler} value={blogContent.contentType}>
                            <option value="英國懶人包">英國懶人包</option>
                            <option value="民間博客">民間博客</option>
                            <option value="Youtube影片">Youtube影片</option>
                            <option value="英國物業小知識">英國物業小知識</option>
                            <option value="Patreon文章預覽">Patreon文章預覽</option>
                        </select>
                        <label htmlFor="title">Title</label>
                        <input className="input-border" type="text" name="title" value={blogContent.title} onChange={ChangeHandler} required/><br/>
                        <label htmlFor="subtitle">Subtitle</label>
                        <input className="input-border" type="text" name="subtitle" value={blogContent.subtitle} onChange={ChangeHandler} required/><br/>
                        <label htmlFor="timestamp">Date</label>
                        <input className="input-border" type="date" name="timestamp" value={blogContent.timestamp} onChange={ChangeHandler}/><br/>
                        <label htmlFor="videoUrl">Youtube Link</label>
                        <input className="input-border" type="text" name="videoUrl" value={blogContent.videoUrl} onChange={ChangeHandler}/><br/>
                        <label htmlFor="category">Category</label>
                        <select className="input-border" name="category" onChange={ChangeHandler} value={blogContent.category}>
                            <option value="樓價">樓價</option>
                            <option value="專題">專題</option>
                            <option value="歷史文化">歷史文化</option>
                            <option value="就業">就業</option>
                            <option value="教育">教育</option>
                        </select>
                        <label htmlFor="article">Article</label>
                        <div className="input-border textarea">
                            <SunEditor onChange={(content) => {setArticle(content)}} setContents={article} setOptions={{
                            height: "auto",
                            resizingBar: false, showPathLabel: false,
                            buttonList: [
                                ["undo", "redo"],
                                ["font", "fontSize", "formatBlock"],
                                ["paragraphStyle"],
                                [
                                "bold",
                                "underline",
                                "italic",
                                "strike",
                                "subscript",
                                "superscript"
                                ],
                                ["fontColor", "hiliteColor"],
                                ["removeFormat"],
                                "/",
                                ["outdent", "indent"],
                                ["align", "horizontalRule", "list", "lineHeight"],
                                ["table", "link", "image"]
                            ],
                            formats: ["p", "div",'blockquote', 'pre', "h1", "h2", "h3", "h4", "h5", "h6"],
                            font: [
                                "Openhuninn",
                                "Noto Sans TC",
                                "Montserrat",
                                "PMingLiU",
                                "Arial",
                                "Times New Roman"
                            ]
                            }}/>
                        </div>
                        <div className='submit-wrapper'>
                            <div className="input-border submit-button button-white pointer" onClick={save} type="submit" disabled={submitDisabled}>Save As Draft</div>
                            <div className="input-border submit-button button-white pointer" onClick={clearAll}>Clear All</div>   
                        </div>
                        <div className='submit-wrapper'>
                            <div className="input-border submit-button button-red pointer" onClick={submit} type="submit" disabled={submitDisabled}>Upload Blog</div>
                            <Link href={'/admin/blog/preview'}>
                            <div className="input-border submit-button button-red pointer">Preview</div>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        )
}

export const getServerSideProps = withPageAuthRequired({
    returnTo: '/admin',
})
