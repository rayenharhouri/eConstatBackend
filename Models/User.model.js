import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
const app = express()
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
const {Schema , model} = mongoose

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        lastName: {
            type:String,
            required : true,
        },
        adress: {
            type : String,
            required : true,
        },
        driverLicense: {
            type: String,
            minlengh: 8,
            required: true,
        },
        delevredOn: {
            type: Date,
        },
        number : {
            type: Number,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        verified: {
            type : Boolean,
            default : false
        },
        otp : {
            type : Number,
            default : '8989'
        },
        cars : [{type : Schema.Types.ObjectId, ref: "car"}],
        token: {
            type: String,
        },
       
        
    }, 
        {
            timestamps : true
        }    
)

export default model("user",userSchema)