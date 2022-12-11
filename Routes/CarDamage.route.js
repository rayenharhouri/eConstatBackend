import express from "express";
import * as carDamage from "../Controllers/carDamageController.js"
const route = express.Router()



route.post("/addNew",carDamage.addNewCarDamage)



export default route