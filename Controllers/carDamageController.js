import InsuranceModel from '../Models/Insurance.model.js'
import CarModel from "../Models/Car.model.js"
import CarDamageModel from '../Models/CarDamage.model.js'



export async function addNewCarDamage(req, res) {
  try {
    const {
      TopLeft,
      MidLeft,
      BottomLeft,
      TopRight,
      MidRight,
      BottomRight,
      carId
    } = req.body
    const car = await CarModel.findById(carId)
    const carDamage = await CarDamageModel.create({
      TopLeft,
      MidLeft,
      BottomLeft,
      BottomRight,
      TopRight,
      MidRight,
    })
    carDamage.car = car
    await carDamage.save()
    res.status(200).json({carDamage : carDamage})
    
  } catch (err) {
    console.log(err)
  }
}