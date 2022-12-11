import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
const app = express()
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
const {Schema , model} = mongoose

const ConstatSchema = mongoose.Schema(
    {
        UserA: {
            type : Schema.Types.ObjectId,
            ref: 'userA',
        },
        CarA: {
            type : Schema.Types.ObjectId,
            ref: 'carA',
        },
        InsuranceA: {
            type : Schema.Types.ObjectId,
            ref: 'InsuranceA',
        },
        UserB: {
            type : Schema.Types.ObjectId,
            ref: 'userB',
        },
        CarB: {
            type : Schema.Types.ObjectId,
            ref: 'carB',
        },
        InsuranceB: {
            type : Schema.Types.ObjectId,
            ref: 'InsuranceB',
        },
        CarDamageA: {
            type : Schema.Types.ObjectId,
            ref: 'CarDamageA',
        },
        CarDamageB: {
            type : Schema.Types.ObjectId,
            ref: 'CarDamageB',
        },
    }, 
        {
            timestamps : true
        }    
)

export default model("constat",ConstatSchema)