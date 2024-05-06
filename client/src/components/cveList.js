import axios from "axios";
import { useNavigate } from 'react-router-dom'

export default function CVEList({data,page,limit}){

    const formatDate = (isoDate) => {
        const date = new Date(isoDate)
        const options = { year: 'numeric', month: 'short', day: 'numeric' }
        return date.toLocaleDateString('en-UK' , options)
    }

    let array = []
    for(let i=(page-1)*limit; i<Math.min(page*limit , data.length);i++){
        if (data[i] && data[i].cve) {
            data[i].cve.published = formatDate(data[i].cve.published)
            data[i].cve.lastModified = formatDate(data[i].cve.lastModified)
            array.push(data[i]);
        }
    }

    const navigate = useNavigate()

    const handleClick = async (id) => {
        const response = await axios.get('/api/cves/'+id)

        if(response && response.data.success){
            navigate('/item' , {state : {item : response.data.data}})
        }
    }

    return (
        <table className="table table-bordered cve-table">
            <thead>
                <tr>
                    <th className="p-3">CVE ID</th>
                    <th className="p-3">IDENTIFIER</th>
                    <th className="p-3">PUBLISHED DATE</th>
                    <th className="p-3">LAST MODIFIED DATE</th>
                    <th className="p-3">STATUS</th>
                </tr>
            </thead>
            <tbody>
                {array.length!==0 && array.map((item) => (
                    <tr key={item.cve.id} onClick={() => handleClick(item._id)}>
                        <td>{item.cve.id}</td>
                        <td>{item.cve.sourceIdentifier}</td>
                        <td>{item.cve.published}</td>
                        <td>{item.cve.lastModified}</td>
                        <td>{item.cve.vulnStatus}</td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    )
}