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
    const urlconverter = (title) =>{
        let regex1 = /[\u007b-\u007e\u005B-\u0060\u003A-\u0040\u0020-\u002F\u2000-\u206f\uff00-\uffef\u3000-\u303f\s]+/g;
        let string2 = title.replace(regex1,' ').trim()
        console.log(string2)
        let regex2 = /\s/g;
        return string2.replace(regex2,'-');
    }
    const data = await blogs.updateMany({},{$set :{'url': urlconverter($title)}})
    return{
        props:{
            article: 'done'
        }
    }
}