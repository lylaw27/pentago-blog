import React, {useContext,useState,useRef} from 'react';
import Toolbar from '../../../../components/toolbar';
import Script from 'next/script';
import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';
import Link from 'next/link';
import BlogContext from '../../../../context/preview';
import Image from 'next/image';
import axios from 'axios';

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default function CreateBlog(){
    const {useBlogContent, useArticle, useBlogImage} =useContext(BlogContext);
    const [blogContent,setBlogContent] = useBlogContent;
    const [blogImage,setBlogImage] = useBlogImage;
    const [article,setArticle] = useArticle;
    const categoryArray = ['樓市分析','市場熱話','歷史文化','經濟數據','學校教育','其他主題']
    const [loading, setLoading] = useState({
        alertBox: 'none',
        disableDiv: ''
    })
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
        for(const image of files){
            const imageUrl = URL.createObjectURL(image);
            imagePreview.push(imageUrl);
        }
        setBlogContent({...blogContent, imagefile: imagePreview});
    }
    const CheckboxClick = (category) =>{
        let categoryList = blogContent.category
        if(categoryList.includes(category)){
            const index = categoryList.indexOf(category)
                categoryList.splice(index,1)
        }
        else{
            categoryList = categoryList.concat(category)
        }
        setBlogContent({...blogContent,category: categoryList});
    }
    const clearAll = () =>{
        if(confirm('Are you sure you want to clear all contents?')){
           setBlogContent({
            title: "",
            subtitle: "",
            article: "",
            timestamp: "",
            videoUrl: "",
            category: [],
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
        for(const image of blogImage){
            const formData = new FormData();
            formData.append('file',image)
            formData.append('upload_preset','cqjtny6l')
            const res = await axios.post('https://api.cloudinary.com/v1_1/pentagoproperty/image/upload',formData)
            imageUrl.push(res.data.secure_url);
            imageId.push(res.data.public_id);
        }
        return {imagefile: imageUrl, image_id: imageId};
    }
    const submit = async(e) => {
        e.preventDefault();
        if(confirm('Confirm Upload?')){
        setLoading({ alertBox: 'flex', disableDiv: 'disableDiv'})
        const contentWithImage = await uploadImage();
        const payload = {...blogContent, imagefile: contentWithImage.imagefile,image_id: contentWithImage.image_id, article: article}
        const res = await axios.post('/api/blog/blogs',{payload})
        const result = await res.data;
        alert('Upload Successful!');
        setLoading({ alertBox: 'none', disableDiv: ''})
    }}
    const save = async(e) => {
        e.preventDefault();
        setLoading({ alertBox: 'flex', disableDiv: 'disableDiv'})
        const contentWithImage = await uploadImage();
        const payload = {...blogContent, imagefile: contentWithImage.imagefile,image_id: contentWithImage.image_id, article: article}
        const res = await axios.post('/api/blog/draft',{payload})
        const result = await res.data;
        alert('Saved as Draft!');
        setLoading({ alertBox: 'none', disableDiv: ''})
    }
        return(
            <div>
            <Head>
            <title>PentaGo! - 後台管理</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Script src="https://kit.fontawesome.com/dbb3bd5296.js" crossorigin="anonymous"/>
            <Toolbar/>
            <div className="loadingBox" style={{display: loading.alertBox}}>Uploading... Please wait</div>
            <div className={`uploadpage admin-body ${loading.disableDiv}`}>
                <h2>Create Blog</h2>
                    <form>
                        <label htmlFor="Image">Image</label>
                        <input ref={imageInput} type="file" name="imagefile" accept="image/*" onChange={ImageSelectionHandler} multiple required/><br/>
                        {blogContent.imagefile.map((img,i) => <div key={i} className='imgPreview'><Image  alt="" src={img} layout='fill' objectFit='contain'/></div> )}
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
                        {categoryArray.map((category)=>{
                            if(blogContent.category.includes(category)){
                                return <div className='checkbox-delete pointer' key={category} onClick={()=>CheckboxClick(category)}><i className="fa-solid fa-xmark"/>{category}</div>
                            }
                            else{
                                return <div className='checkbox-add pointer' key={category} onClick={()=>CheckboxClick(category)}><i className="fa-solid fa-plus"/>{category}</div>
                            }
                        })}
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
                                "SourceHanSansOLD-Light-2",
                                "SourceHanSansSC-Heavy-2",
                                "SweiFistLegCJKtc-Black-2",
                                "GenYoGothicTW-H-01",
                                "Openhuninn",
                                "JingNanMaiYuanTi-2",
                                "Noto Sans TC",
                                "Montserrat",
                                "新細明體",
                                "Arial",
                                "Times New Roman"
                            ],
                            defaultStyle: "font-family: SourceHanSansOLD-Light-2; font-size: 16px;"
                            }}/>
                        </div>
                        <div className='submit-wrapper'>
                            <div className="input-border submit-button button-white pointer" onClick={save} type="submit">Save As Draft</div>
                            <div className="input-border submit-button button-white pointer" onClick={clearAll}>Clear All</div>   
                        </div>
                        <div className='submit-wrapper'>
                            <div className="input-border submit-button button-red pointer" onClick={submit} type="submit">Upload Blog</div>
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
