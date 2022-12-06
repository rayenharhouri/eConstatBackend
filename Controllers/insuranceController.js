import InsuranceModel from '../Models/Insurance.model.js'
import CarModel from "../Models/Car.model.js"
import jwt from 'jsonwebtoken'


export async function addNewInsurance(req, res) {
  try {
    const {
      name,
      numContrat,
      agency,
      validityFrom,
      validityTo,
      carId
    } = req.body
    const car = await CarModel.findById(carId)
    if (!(name && numContrat && agency && validityFrom && validityTo)) {
      res.status(400).json({ message: 'All Fields are required' })
    }
    const existantInsurance = await InsuranceModel.findOne({ numContrat })
    if (existantInsurance) {
      return res.status(409).send('Contrat Already exist')
    }
    const insurance = await InsuranceModel.create({
      name,
      numContrat,
      agency,
      image : "http://localhost:3000/imgInsurance/"+name+".png",
      validityFrom,
      validityTo,
    })
    insurance.cars = car
    insurance.save()
    res.send(insurance)
  } catch (err) {
    console.log(err)
  }
}

export async function getInsurance (req, res) {
  var carId = req.body
  var Insurances = await InsuranceModel.findOne({carId})
  
  if (carId) {
    try {
        var CarInsurances
        if (true){  
          res.status(200).send(Insurances)
      } else {
          console.log("erruer");
        }        
    } catch (e) {
      return res.status(400).json({"error12" : e})
    }
  } else {
    return res.status(400).json({"error2" : "erreur2"})
  }
  
}