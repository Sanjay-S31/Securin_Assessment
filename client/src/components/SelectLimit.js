export default function SelectLimit({onLimitChange}){
    return (
        <div className="d-flex">
            <h3>Results per page : </h3> &ensp;
            <select onChange={(event) => onLimitChange(event.target.value)} className="select">
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    )
}