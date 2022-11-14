import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import UserRoute from './Routes/User.route.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'


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


const options={
    definition:{
        openapi:'3.0.0',
        info : {
            title:'e-Constat Project',
            version:'1.0.0'
        },
        servers:[
            {
               url: 'http://localhost:3000/'
            }
        ]
    },
    apis:['./mongodb.js']
    
    }
    
    const swaggerSpec=swaggerJSDoc(options)
    app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))




app.use("/user", UserRoute)

//Pour les images
app.use(express.urlencoded({ extended: true }))

app.listen(port, hostname, () => {
    console.log(`Server running at https://${hostname}:${port}/`);
});