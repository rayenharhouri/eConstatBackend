import ConstatModel from "../Models/Constat.model.js"
import carModel from "../Models/Car.model.js"




export async function addNewConstat(req, res) {
    try {
      var userA = req.body.UserA
      var carA = req.body.CarA
      var InsuranceA = req.body.InsuranceA
      var carDamageA = req.body.CarDamageA
      
      const constat = await ConstatModel.create({
        UserA : userA,
        CarA : carA,
        InsuranceA : InsuranceA,
        CarDamageA : carDamageA
      })


      //carDamage.car = car
      //await carDamage.save()
      res.status(200).json({constat : constat})
      
    } catch (err) {
      console.log(err)
    }
  }

  export async function addNewConstatB(req, res) {
    try {
      var constatId = req.body.constatId
      var userB = req.body.UserB
      var carB = req.body.CarB
      var InsuranceB = req.body.InsuranceB
      var constat = await ConstatModel.findById(constatId)
      constat.UserB = userB
      constat.CarB = carB
      constat.InsuranceB = InsuranceB
        await constat.save()

      //carDamage.car = car
      //await carDamage.save()
      res.status(200).json({constat : constat})
      
    } catch (err) {
      console.log(err)
    }
  }
  export async function getConstat(req,res) {
    let idU = await req.body.idU
    var constat = await ConstatModel.find({idU})
    var x
    constat.forEach(e => x = e.CarA)
    var car = await carModel.findById(x)
    res.status(200).send(car)

    console.log(req.body)
  }