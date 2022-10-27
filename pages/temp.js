import Dbconnect from "../components/db";


export default function Temp({article}){
    return(
       <div>
        {article}
        </div> 
    )
}

export async function getStaticProps(){
    const blogs = await Dbconnect('blogs');
    // const data = await blogs.updateMany({},{$set :{'url': urlconverter($title)}})
    blogs.find().forEach((item)=>{
        let string1 = item.title;
        let regex1 = /[\u007b-\u007e\u005B-\u0060\u003A-\u0040\u0020-\u002F\u2000-\u206f\uff00-\uffef\u3000-\u303f\s]+/g;
        let string2 = string1.replace(regex1,' ').trim()
        let regex2 = /\s/g;
        let result = string2.replace(regex2,'-');
        blogs.updateOne({_id: item._id},{'$set':{'url': result}})
    }
    )
    return{
        props:{
            article: 'done'
        }
    }
}