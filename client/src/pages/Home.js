import { useEffect, useState } from "react";
import CVEList from "../components/cveList";
import axios from 'axios'
import Pagination from "../components/Pagination";
import SelectLimit from "../components/SelectLimit";
import { FaSearch } from "react-icons/fa";

export default function Home(){

    const [cveData,setCVEData] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(10)
    const [totalPage,setTotalPage] = useState(0)
    const [cveId,setCveId] = useState('')
    const [length,setLength] = useState(0)

    useEffect(() => {
        const showData = async () => {
            try{
                const response = await axios.get('/api/cves/lists')

                if(!response.data.success){
                    console.log("Error occured in fetching")
                }
                
                setCVEData(response.data.data)
                setIsLoading(false)
                setLength(response.data.length)
                setTotalPage(Math.ceil(response.data.data.length / limit))

                if(page>totalPage){
                    setPage(totalPage)
                }
                else if(page<1){
                    setPage(1)
                }
            }
            catch(error){
                setIsLoading(true)
                console.log(error)
            }
        }
        showData()
    },[limit,page,totalPage])

    const handlePageChange = (value) => {
        if(value === "start" || value === "... "){
            setPage(1)
        }
        else if(value === "end" || value === " ..."){
            setPage(totalPage)
        }
        else if(value === "prev"){
            if(page!==1){
                setPage(page-1)
            }
        }
        else if(value === "next"){
            if(page!==totalPage){
                setPage(page+1)
            }
        }
        else{
            setPage(value)
        }
    }

    const handleSearch = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        try{
            const res = await axios.post('/api/cves/search',{
                cveId
            })

            if(!res.data.success){
                console.log("Error occured in fetching")
                alert(res.data.message)
            }

            setCVEData(res.data.data)
            setIsLoading(false)
            setCveId('')
        }
        catch(error){
            alert(error.response.data.message)
            setIsLoading(false)
        }
    }

    return (
        <div className="homepage">
            <h1>CVE List</h1>
            {isLoading && <p>Loading....</p>}
            {!isLoading && (
                <div>
                    <div className="search-container">
                        <h3 className="results">Total Results : {length}</h3>

                        <div className="input-group rounded search-bar">
                            <input 
                                type="search" 
                                className="form-control rounded" 
                                placeholder="Search for CVE ID"
                                value={cveId}
                                onChange={(e) => setCveId(e.target.value)}
                            />
                            <span className="input-group-text border-0" id="search-addon">
                                <FaSearch onClick={handleSearch}/>
                            </span>
                        </div>
                    </div>

                    < CVEList 
                        data = {cveData} 
                        page = {page}
                        limit = {limit}
                    />
                    <div className="pagination-container">
                        <SelectLimit
                            onLimitChange={setLimit}
                        />
                        <Pagination
                            totalPage = {totalPage}
                            page = {page}
                            limit = {limit}
                            siblings={1}
                            onPageChange = {handlePageChange}
                        />
                    </div>
                </div>
            )}
            
        </div>
    )
}