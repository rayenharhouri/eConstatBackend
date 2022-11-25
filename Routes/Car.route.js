import express from "express";
import * as car from "../Controllers/carController.js"
import multer from "../Middleware/multer-config.js"

const route = express.Router()


//route.route("/addNewCar").post(multer,car.addNewCar)
route.post("/addNew",car.addNewCar)
route.delete("/removeCar",car.removeCar)
route.get("/getCar",car.getCar)
route.get("/allCars",car.getAllCars)
export default route