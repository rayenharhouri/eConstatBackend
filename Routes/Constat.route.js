import express from "express";

import * as constat from "../Controllers/constatController.js"
const route = express.Router()


route.post("/addNew",constat.addNewConstat)
route.post("/addNewB",constat.addNewConstatB)
route.post("/get",constat.getConstat)
route.post("/sendReport",constat.sendConfirmationEmail)



export default route