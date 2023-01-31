import Dbconnect from "../components/db";

export default function Temp({result}){
    return(
        <div>{result}</div>
    )
}
export async function getStaticProps(){
    const blogs = await Dbconnect('blogs');
    const blogList = blogs.find();
    blogList.forEach((list) => {
        blogs.findOneAndUpdate({_id: list._id},{ $unset: { categorytrial: ""}})
    });
    return{
        props: {
            result: 'ok'
        }
    }
}