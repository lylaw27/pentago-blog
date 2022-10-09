import {MongoClient} from 'mongodb';

export default async function Dbconnect(collection){
    const dbClient = await MongoClient.connect('mongodb+srv://lylaw:lylaw@pentago-db.3rvcu.mongodb.net/Post?retryWrites=true&w=majority')
    const db = dbClient.db().collection(collection)
    return(db)
}