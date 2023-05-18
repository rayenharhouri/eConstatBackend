import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import UserModel from './User.model.js'
const app = express()
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
const {Schema , model} = mongoose

const InsuranceSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        numContrat: {
            type:String,
            required : true,
        },
        agency: {
            type : String,
            required : true,
        },
        validityFrom: {
            type: String,
            required: true,
        },
        validityTo: {
            type: String,
            required : true,
        },
        image: {
            type: String,
            required: true
        },
        car : {type : Schema.Types.ObjectId, ref: "car"}
    }, 
        {
            timestamps : true
        }    
)

export default model("insurance",InsuranceSchema)