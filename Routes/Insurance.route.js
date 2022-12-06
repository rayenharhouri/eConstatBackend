import express from "express";

import * as insurance from "../Controllers/insuranceController.js"
const route = express.Router()


//route.route("/addNewCar").post(multer,car.addNewCar)
route.post("/addNew",insurance.addNewInsurance)
route.post("/getAll",insurance.getInsurance)


export default route