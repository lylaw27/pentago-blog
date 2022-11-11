import {v2 as cloudinary} from 'cloudinary';
import Dbconnect from '../../../../components/db';
import { ObjectId } from 'mongodb';

cloudinary.config({
    cloud_name: "pentagoproperty",
    api_key: "856789475668125",
    api_secret: "S2ggAr_6H5aUw5e9zq0LP5xqa2I",
});

const deleteImage = (image_id) => {
    image_id.map((image_id)=>{
        cloudinary.uploader.destroy(image_id, (err,result)=> {
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
        }
    });
    })
}

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
            const collection = req.query.type
            const blogs = await Dbconnect(collection);
            let newBlog = req.body.payload;
            const blogId = req.query.blogId;
            newBlog = await dataProcessor(newBlog);
            if(newBlog.oldimage){
                deleteImage(newBlog.oldimage);
            }
            delete newBlog._id;
            await blogs.updateOne({_id: ObjectId(blogId)},{$set: newBlog});
            res.status(201).json({msg: "Upload Completed!"});
    }
}


