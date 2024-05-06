const CVEModel = require('../models/cveModel')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/SecurinDB')
    .then(result => {
            console.log("Database Connected")
            uploadData();
        })
    .catch(error => {
        console.log("Database Connection Failed")
        console.log(error)
    })


const uploadData = async (req, res) => {
    try {
        let startIndex = 0;
        while(true){

            const url = `https://services.nvd.nist.gov/rest/json/cves/2.0/
            ?resultsPerPage=2000&startIndex=${startIndex}`

            const response = await fetch(url)
            .then(res => {
                if (!res.ok) {
                throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .catch((err)=>console.log(err));
            const insert = await insertCVE(response.vulnerabilities);
            console.log(insert);
            startIndex += 2000;
            if(startIndex>=response.totalResults){
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
        return res.status(200).json("Upload into DB success");
    } catch (error) {
        res.json({ msg: error.message });
    }
};


const insertCVE = async (response) => {
    for (let i = 0; i < response.length; i++) {
        try {
            await CVEModel.create(response[i]);
        } 
        catch (error) {
            return error.message; 
        }
    }
    return "Inserted successfully";
};
  
