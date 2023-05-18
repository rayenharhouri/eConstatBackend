import carModel from '../Models/Car.model.js'
import Car from '../Models/Car.model.js'
import InsuranceModel from '../Models/Insurance.model.js'
import jwt from 'jsonwebtoken'
import UserModel from '../Models/User.model.js'
import CarModel from '../Models/Car.model.js'

export async function addNewCar(req, res) {
  try {
    const { brand, type, numSerie, fiscalPower, numImmatriculation } = req.body
    let token = req.body.token
    if (!(brand && type && numSerie && fiscalPower && numImmatriculation)) {
      res.status(400).json({ message: 'All Fields are required' })
    }
    if(token) {
    token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const userId = token.user._id
    const user = await UserModel.findById(userId)
  
    
    const existantCar = await Car.findOne({ numSerie })
    if (existantCar) {
      return res.status(409).send('Car Already exist')
    }
   

    const car = await Car.create({
      brand,
      type,
      numSerie,
      fiscalPower,
      numImmatriculation,
      carImage : "/img/"+brand+".png",
      owner : userId
    })
    console.log(car._id);
    user.cars.push(car._id)
    user.save()
    res.status(200).json({car : car})
  } else {
    res.status(400).json({message : "INVALID TOKEN"})
  }
  } catch (err) {
    console.log(err)
  }
}

export async function removeCar(req,res) {
    try {
        const numSerie = req.body
        const car = Car.findOne({numSerie})
        if(car) {
           await Car.remove()
           res.status(200).send("car deleted")
        } else {
            res.status(400).send("cannot delete car")
        }
    }    catch(err) {
        console.log(err);
    }
}

export async function getCar(req,res) {
  let numSerie = await req.body.numSerie
  res.send({ car: await Car.findOne({numSerie}).populate('owner') })
  console.log(req.body)
}

export async function getAllCars (req, res) {
  var token = req.body.token
  let Token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  var cars =await Car.find()
  
  if (Token) {
    try {
        let Token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        let userId = Token.user._id
        var userCars
        if (true){
          userCars = cars.filter( car => {
            let isValid = true
              console.log(car);
              isValid = isValid && car.owner == userId
            return isValid
          })     
          res.status(200).send({cars:userCars})
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




export async function getDataFromQrCode(req,res) {
let ids = req.body.ids;

try {
  
    console.log(ids);
    const idCar = ids.substring(0, 24);
    var car = await CarModel.findById(idCar);
    console.log("car = " + idCar);
    console.log("car = " + car);
    
    const idUser =  ids.substring(24, 48);
    var user = await UserModel.findById(idUser)
    console.log("user = " + idUser);
    console.log("user = " + user);

    
    const idInsurance = ids.substring(48, 72);
    var Insurance = await InsuranceModel.findById(idInsurance)
    console.log("insurance = " + idInsurance);
    console.log("insurance = " + Insurance);

    var response = {
      
          user
      ,
      car
      ,
  
        Insurance
      
    }
    
    res.status(200).send(response)
} catch (e){
  res.status(400).json({err : e})
}
}
