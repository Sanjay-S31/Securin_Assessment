import { returnPaginationRange } from "../utils/AppUtils"

export default function Pagination({totalPage,page,limit,siblings,onPageChange}){

    let arr = returnPaginationRange(totalPage,page,limit,siblings)

    return (
        <ul className="pagination pagination-md">
            <li className="page-item">
                <span onClick={() => onPageChange("start")} className="page-link">&laquo;</span>
            </li>
            <li className="page-item">
                <span onClick={() => onPageChange("prev")} className="page-link">&lsaquo;</span>
            </li>
            {
                arr.map(item => (
                    <li key={item} className={`page-item ${item === page ? 'active' : ''}`}>
                        <span onClick={() => onPageChange(item)} className="page-link">{item}</span>
                    </li>
                ))
            }
            <li className="page-item">
                <span onClick={() => onPageChange("next")} className="page-link">&rsaquo;</span>
            </li>
            <li className="page-item">
                <span onClick={() => onPageChange("end")} className="page-link">&raquo;</span>
            </li>
        </ul>
    )
}