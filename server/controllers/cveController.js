const CVEModel = require('../models/cveModel')
const mongoose = require('mongoose')

const getCVE = async (req,res) => {
    try{
        const {id} = req.params
        // id validation in mongodb
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send({
                success : false,
                message : "Invalid id "
            })
        }
        const cve = await CVEModel.findById(id)

        if(!cve){
            return res.status(400).send({
                success : false,
                message : "No cve available"
            })
        }
        
        res.status(200).send({
            success : true,
            message : "Single data sent successfully",
            data : cve
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            error,
            message : "Error occured in getting a cve"
        })
    }
}

const getAllCVE = async (req,res) => {
    try{
        const cveLength = await CVEModel.countDocuments()
        const cve = await CVEModel.find().sort({published : 1}).limit(2000)
        res.status(200).json({
            success : true,
            data : cve,
            length : cveLength,
            message : "Data Listed Successfully"
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            error,
            message : "Error occured in getting all cve"
        })
    }
}



const searchCVE = async (req,res) => {
    try{
        const {cveId} = req.body
        const cve = await CVEModel.find({ "cve.id" : cveId})

        if(!cve || cve.length==0){
            return res.status(400).send({
                success : false,
                message : "Couldn't find cve id"
            })
        }

        res.status(200).send({
            success : true,
            message : "CVE found",
            data : cve
        })
    }
    catch(error){
        res.status(500).send({
            success : false,
            message : "Error occured in finding",
            error
        })
        console.log(error)
    }
}

module.exports = {
    getAllCVE,
    getCVE,
    searchCVE
}


