import { ObjectId } from 'mongodb';
import DbClient from '../../../../components/db';

export default async function blogDelete(req,res){
    if(req.method === 'POST'){
        const collection = req.query.type
        await DbClient.connect();
        const blogs = DbClient.db('Post').collection(collection);
        const _id = req.body._id
        const pinned = req.body.pinned
        await blogs.updateOne({_id: ObjectId(_id)},{$set: {pinned: !pinned}});
        await DbClient.close();
        if(!pinned){
           res.status(201).json({msg: 'Pinned!'}) 
        }
        else{
            res.status(201).json({msg: 'Unpinned!'}) 
        }
    }
}