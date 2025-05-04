import { ObjectId } from 'mongodb';
import DbClient from '../../../../components/db';
import {v2 as cloudinary} from 'cloudinary';

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

export default async function blogDelete(req,res){
    if(req.method === 'POST'){
        const collection = req.query.type
        await DbClient.connect();
        const blogs = DbClient.db('Post').collection(collection);
        deleteImage(req.body.image_id);
        await blogs.deleteOne({_id : ObjectId(req.body._id)})
        await DbClient.close();
        res.status(201).json({msg: 'Deleted'})
    }
}