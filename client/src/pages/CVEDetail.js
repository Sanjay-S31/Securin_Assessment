import { useLocation } from "react-router-dom"

export default function CVEDetail(){

    const location = useLocation()
    const item = location.state.item

    return (
        <div className="cve-detail">
            <h1 className="heading">CVE Detail</h1>
            <h2>{item.cve.id}</h2>
            <h3>Description : </h3>
            <p>{item.cve.descriptions[0].value}</p>
            <h3>CVSS V2 Metrics </h3>
            <p>
                <strong>Severity : </strong><span>{item.cve.metrics.cvssMetricV2[0].cvssData.accessComplexity}</span> 
                &emsp; &emsp;
                <strong>Score : </strong><span>{item.cve.metrics.cvssMetricV2[0].cvssData.baseScore}</span>
            </p>
            <p>
                <strong>Vector String</strong>
                &emsp;
                <span>{item.cve.metrics.cvssMetricV2[0].cvssData.vectorString}</span>
            </p>

            <table className="table table-bordered cve-detail-table">
                <thead>
                    <tr>
                        <th className="p-3">Access Vector</th>
                        <th className="p-3">Access Complexity</th>
                        <th className="p-3">Authentication</th>
                        <th className="p-3">Confidentiality Impact</th>
                        <th className="p-3">Integrity Impact</th>
                        <th className="p-3">Availability Impact</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{item.cve.metrics.cvssMetricV2[0].cvssData.accessVector}</td>
                        <td>{item.cve.metrics.cvssMetricV2[0].cvssData.accessComplexity}</td>
                        <td>{item.cve.metrics.cvssMetricV2[0].cvssData.authentication}</td>
                        <td>{item.cve.metrics.cvssMetricV2[0].cvssData.confidentialityImpact}</td>
                        <td>{item.cve.metrics.cvssMetricV2[0].cvssData.integrityImpact}</td>
                        <td>{item.cve.metrics.cvssMetricV2[0].cvssData.availabilityImpact}</td>
                    </tr>
                </tbody>
            </table>

            <h3>Scores : </h3>
            <p>
                <strong>Exploitability Score : </strong> &emsp;
                <span>{item.cve.metrics.cvssMetricV2[0].exploitabilityScore}</span>
            </p>
            <p>
                <strong>Impact Score : </strong> &emsp;
                <span>{item.cve.metrics.cvssMetricV2[0].impactScore}</span>
            </p>

            <h3>CPE:</h3>
            <table className="table table-bordered cve-detail-table">
                <thead>
                    <tr>
                        <th className="p-3">Criteria</th>
                        <th className="p-3">Match Criteria ID</th>
                        <th className="p-3">Vulnerable</th>
                    </tr>
                </thead>
                <tbody>
                    {item.cve.configurations[0].nodes[0].cpeMatch.map((data,index) => (
                        <tr key={index}>
                            <td>{data.criteria}</td>
                            <td>{data.matchCriteriaId}</td>
                            <td>{data.vulnerable ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    )
}