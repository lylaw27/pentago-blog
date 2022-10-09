import {v2 as cloudinary} from 'cloudinary';
import Dbconnect from '../../../../components/db';
import formidable from 'formidable';

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



const dateProcessor = (newBlog) => {
    let nowTime = new Date(newBlog.timestamp);
    let chineseMonth = ['一','二','三','四','五','六','七','八','九','十','十一','十二']
    let nowMonth = chineseMonth[nowTime.getMonth()];
    let nowDate = nowTime.getDate();
    let nowYear = nowTime.getFullYear();
    newBlog.uploadDate = nowMonth + "月 " + nowDate + ", " + nowYear;
    newBlog.timestamp = nowTime;
    return newBlog
}

export default async function blogPost(req,res){
    if(req.method === 'POST'){
        const blogs = await Dbconnect('blogs')
        const form = formidable({ multiples: true });
        form.keepExtensions = true;
        form.multiples = true;
        form.parse(req, async (err, fields, files) =>{
            let postData= fields.blogInfo;
            let postArticle = fields.blogArticle;
            let newBlog = JSON.parse(postData);
            newBlog.article = postArticle;
            newBlog = dateProcessor(newBlog);
            if(!files.blogImage.length){
                files.blogImage = [files.blogImage]
            }
            for (let i=0; i<files.blogImage.length;i++){
                await cloudinary.uploader.upload(files.blogImage[i].filepath, {folder : 'BlogListings'},(error, result)=>{
                    newBlog.imagefile.push(result.url);
                    newBlog.image_id.push(result.public_id);
            })}
            await blogs.insertOne(newBlog);
        })
        res.status(201).json({msg: "Upload Completed!"});
    }
}

