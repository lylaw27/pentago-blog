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
    const data = await blogs.updateMany({videoUrl: {$ne: ''}},{$set :{contentType: 'Youtube影片'}})
    return{
        props:{
            article: 'done'
        }
    }
}