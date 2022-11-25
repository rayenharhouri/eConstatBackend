import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import InsuranceModel from './Insurance.model.js'
import UserModel from './User.model.js'
const app = express()
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
const {Schema , model} = mongoose

const CarSchema = mongoose.Schema(
    {
        brand: {
            type: String,
            required: true,
            enum: ['Alfa Romeo','Audi','Bentley','BMW','Brabus','Chery','Chevrolet','Chrysler','Citroen','Corvette','Dacia','Fiat','Ford','Geely','Genesis','GMC','Haval','Honda','Hummer','Hyundai','Infiniti','Isuzu','Iveco','Jaguar','Jeep','Kia','Lamborghini','Land Rover','Lexus','Mahindra','MAN','Maserati','Maybach','Mazda','Mercedes Benz','MG','Mini','Mitsubishi','Nissan','Opel','Peugeot','Porsche','Renault','SEAT','Skoda','SsangYong','Suzuki','Triumph','Volkswagen']
        },
        type: {
            type:String,
            required : true,
        },
        numSerie: {
            type : String,
            required : true,
        },
        fiscalPower: {
            type: Number,
            required: true,
        },
        numImmatriculation: {
            type: String,
            required : true,
        },
       owner : {
        type : Schema.Types.ObjectId,
        ref: 'user',
        },
       carImage: {
            type: String,
        }
    }, 
        {
            timestamps : true
        }    
)

export default model("car",CarSchema)