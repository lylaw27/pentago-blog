import {v2 as cloudinary} from 'cloudinary';
import Dbconnect from '../../../../components/db';
var multiparty = require('multiparty');

export const config = {
    api: {
      bodyParser: false
    }
  }
  
cloudinary.config({
    cloud_name: "pentagoproperty",
    api_key: "856789475668125",
    api_secret: "S2ggAr_6H5aUw5e9zq0LP5xqa2I",
});


const dataProcessor = (newBlog) => {
    //dateProcessor
    let nowTime = new Date(newBlog.timestamp);
    let chineseMonth = ['一','二','三','四','五','六','七','八','九','十','十一','十二']
    let nowMonth = chineseMonth[nowTime.getMonth()];
    let nowDate = nowTime.getDate();
    let nowYear = nowTime.getFullYear();
    //urlProcessor
    let string1 = newBlog.title;
    let regex1 = /[\u2700-\u27BF\uE000-\uF8FF\uD83C\uDC00-\uDFFF\uD83D\uDC00-\uDFFF\u2011-\u26FF\uD83E\uDD10-\uDDFF\u007b-\u007e\u005B-\u0060\u003A-\u0040\u0020-\u002F\u2000-\u206f\uff00-\uffef\u3000-\u303f\s]+/g;
    let string2 = string1.replace(regex1,' ').trim();
    let regex2 = /\s/g;
    let newUrl = string2.replace(regex2,'-');
    //Combine
    newBlog.uploadDate = nowMonth + "月 " + nowDate + ", " + nowYear;
    newBlog.timestamp = nowTime;
    newBlog.url = newUrl;
    return newBlog
}

export default async function blogPost(req,res){
    if(req.method === 'POST'){
        const blogs = await Dbconnect('blogs')
        const form = new multiparty.Form();
        form.parse(req, async(err, fields, files) =>{
            let postData= fields.blogInfo;
            let postArticle = fields.blogArticle;
            let newBlog = JSON.parse(postData);
            newBlog.article = postArticle;
            newBlog.imagefile = [];
            newBlog = dataProcessor(newBlog);
            for (let i=0; i<files.blogImage.length;i++){
                 await cloudinary.uploader.upload(files.blogImage[i].path, {folder : 'BlogListings'},(error, result)=>{
                    newBlog.imagefile.push(result.url);
                    newBlog.image_id.push(result.public_id);
            })}
            await blogs.insertOne(newBlog);
        })
        res.status(201).json({msg: "Upload Completed!"});
    }
}

