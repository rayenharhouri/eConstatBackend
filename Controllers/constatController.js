import ConstatModel from "../Models/Constat.model.js"
import carModel from "../Models/Car.model.js"
import User from '../Models/User.model.js'
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import * as path from 'path'
import CarModel from "../Models/Car.model.js"
import InsuranceModel from "../Models/Insurance.model.js"




export async function addNewConstat(req, res) {
    try {
      var InsuranceA = req.body.InsuranceA
      var carA = req.body.CarA
      var car = await CarModel.findById(carA)
      console.log(car);
      var userA = car.owner
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
    const constat = await ConstatModel.findOne({idU : req.body.idU})
    if(constat) {
      console.log("nice");
      var userBid = constat.UserB
      var carBid = constat.CarB
      const userB = await User.findById(userBid)
      const carB = await CarModel.findById(carBid)
      const response = {car : carB.brand}
      res.status(200).send(response)
    }else {
      res.status(400).json({message : "erreur"})
    }

  }

  export async function sendConfirmationEmail(req, res) {
    //finding the user mail
    const user = await User.findOne({ email: req.body.email.toLowerCase() })
    var userId = user._id
    const constat = await ConstatModel.findOne({userId})
    console.log(constat);

      //sending mail
      await doSendConfirmationEmail(req.body.email,constat,user)
    if(user && constat) {
      res.status(200).send({
        message: "L'email de confirmation a été envoyé a " +  user.email,
      })
    }
     else {
      res.status(404).send({ message: 'User innexistant' })
    }
  }

  async function doSendConfirmationEmail(email,constat,user) {
    var userBid = constat.UserB
    const userB = await User.findById(userBid)
    var carAid = constat.CarA
    var carBid = constat.CarB
    var InsuranceAid = constat.InsuranceA
    var InsuranceBid = constat.InsuranceB
    const carA = await CarModel.findById(carAid)
    const carB = await CarModel.findById(carBid)
    const InsuranceA = await InsuranceModel.findById(InsuranceAid)
    const InsuranceB = await InsuranceModel.findById(InsuranceBid)
    if(userB){
    var B_name = userB.name + " " + userB.lastName
    var B_Adress = userB.adress
    var B_license = userB.driverLicense
    var B_userMail = userB.email
    var A_brand = carA.brand
    var B_brand = carB.brand
    var A_type = carA.type
    var B_type = carB.type
    var A_imm = carA.numImmatriculation
    var B_imm = carB.numImmatriculation
    var A_Iname = InsuranceA.name
    var B_Iname = InsuranceB.name
    var A_Iagency = InsuranceA.agency
    var B_Iagency = InsuranceB.agency
    var A_vFrom = InsuranceA.validityFrom
    var B_vFrom = InsuranceB.validityFrom
    var B_vTo = InsuranceB.validityTo
    var A_vTo = InsuranceA.validityTo  
    sendEmail({
      from: process.env.eConstat_Mail,
      to: B_userMail,
      subject: 'eConstat Report',
      template: 'index' ,
      context: {
         //user details
          A_Name : user.name+" "+user.lastName,
          A_Adress : user.adress,
          A_license : user.driverLicense,
          B_Name: B_name,
          B_Adress : B_Adress,
          B_license : B_license,
          //car Details
          A_brand : A_brand,
          A_type : A_type,
          A_imm : A_imm,
          B_brand : B_brand,
          B_type : B_type,
          B_imm : B_imm,
          //insurance details
          A_Iname : A_Iname,
          B_Iname :B_Iname ,
          A_Iagency :A_Iagency,
          B_Iagency :B_Iagency,
          A_vFrom :A_vFrom,
          B_vFrom :B_vFrom,
          B_vTo :B_vTo,
          A_vTo:A_vTo
      }
    })
    sendEmail({
      from: process.env.eConstat_Mail,
      to: email,
      subject: 'eConstat Report',
      template: 'index' ,
      context: {
         //user details
          A_Name : user.name+" "+user.lastName,
          A_Adress : user.adress,
          A_license : user.driverLicense,
          B_Name: B_name,
          B_Adress : B_Adress,
          B_license : B_license,
          //car Details
          A_brand : A_brand,
          A_type : A_type,
          A_imm : A_imm,
          B_brand : B_brand,
          B_type : B_type,
          B_imm : B_imm,
          //insurance details
          A_Iname : A_Iname,
          B_Iname :B_Iname ,
          A_Iagency :A_Iagency,
          B_Iagency :B_Iagency,
          A_vFrom :A_vFrom,
          B_vFrom :B_vFrom,
          B_vTo :B_vTo,
          A_vTo:A_vTo
      }
    })
  }else {
    console.log("erreur"+ userB);
  }
  }

  function sendEmail(mailOptions) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.eConstat_Mail,
          pass: process.env.eConstat_Password,
        },
      })
      const handlebarOptions = {
        viewEngine: {
          extName: ".html",
          partialsDir: path.resolve('./views'),
          defaultLayout: false,
        },
        viewPath: path.resolve('./views'),
        extName: ".html",
      }
      transporter.use('compile', hbs(handlebarOptions))
    
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error)
          console.log('Server not ready')
        } else {
          console.log('Server is ready to take our messages')
        }
      })
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })
}
