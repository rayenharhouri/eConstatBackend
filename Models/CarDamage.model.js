import bodyParser from 'body-parser'
import express from 'express'
import mongoose, { SchemaType } from 'mongoose'
const app = express()
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
const {Schema , model} = mongoose

const CarDamageSchema = mongoose.Schema(
    {
        TopLeft: {
            type: Boolean,
            required: true,
        },
        MidLeft: {
            type:Boolean,
            required : true,
        },
        BottomLeft: {
            type : Boolean,
            required : true,
        },
        TopRight: {
            type: Boolean,
            required: true,
        },
        MidRight: {
            type: Boolean,
            required : true,
        },
       BottomRight : {
        type : Boolean,
        require: true,
        },
       car: {
            type: Schema.Types.ObjectId,
            ref : 'car'
        }
    }, 
        {
            timestamps : true
        }    
)

export default model("carDamage",CarDamageSchema)