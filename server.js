import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import UserRoute from './Routes/User.route.js'


const app = express()
const database = "eConstat" 
const port = process.env.port || 3000
const hostname = '127.0.0.1'
import * as dotenv from 'dotenv' ;
dotenv.config()


app.use(express.json())






mongoose.set('debug', true)
mongoose.Promise = global.Promise
mongoose
    .connect(`mongodb://localhost:27017/${database}`)
    .then(() => {
        console.log(`connected to  ${database}`)
    })
    .catch(err => {
        console.log(err)
    })
app.use(cors())
app.use(morgan("dev"))


app.use("/user", UserRoute)

//Pour les images
app.use(express.urlencoded({ extended: true }))

app.listen(port, hostname, () => {
    console.log(`Server running at https://${hostname}:${port}/`);
});