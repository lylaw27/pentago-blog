import Link from 'next/link';
import{useRouter} from 'next/router';

export default function QueryPagination({pagination}){
    const router = useRouter()
    let currentPage = pagination.page;
    let currentPath = useRouter().pathname;
    let pageDisplay = []
    let maxPage = (Math.ceil(parseInt(pagination.blogCount)/20))
    let pagearray = Array.from({length: maxPage}, (_, i) => i + 1)
    if(maxPage >= 5){
        if(currentPage === 1 || currentPage === 2){
            pageDisplay = pagearray.slice(0,5)
        }
        else if(currentPage === maxPage || currentPage === maxPage-1){
            pageDisplay = pagearray.slice(-5)
        }
        else{
            pageDisplay = pagearray.slice(currentPage-3,currentPage+2);
        }
    }
    else{
        pageDisplay = pagearray
    }
    return(
        <div className='pageBar'>
            <Link href={{ pathname: currentPath, query: { page: String(currentPage-1), ...pagination.query} }}>
                <div className={(currentPage === 1) ? 'pageDisabled':'pageNumber '}>
                    <i className="fas fa-angle-left"/>
                </div>
            </Link>
            {pageDisplay.map((number,i) => 
            <Link key={i} href={{ pathname: currentPath, query: { page: String(number), ...pagination.query} }}>
            <div   className={(currentPage === number) ? 'pageCurrent':'pageNumber'}>
                {number}
            </div>
            </Link>
            )}
            <Link href={{ pathname: currentPath, query: { page: String(currentPage-1), ...pagination.query}}}>
                <div className={(currentPage === maxPage) ? 'pageDisabled':'pageNumber'}>
                    <i className="fas fa-angle-right"/>
                </div>
            </Link> 
        </div>
    )
    }
