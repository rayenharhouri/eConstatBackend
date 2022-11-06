import User from '../Models/User.model.js'
import Token from '../Models/TokenJwt.js'
import bcrypt from "bcrypt"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'



export async function LogIn(req,res) {
    try {
        const {email , password} = req.body
        if (! (email && password)){
            res.status(400).send("Required Input")
        }
        const user = await User.findOne({email : email.toLowerCase()})
        if (user && (await bcrypt.compare(password, user.password))) {
            dotenv.config()
            let token = new Token({
                userId: user._id,
                token: jwt.sign({email: user.email,password: user.password},process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1H'}),
              })
       
        res.status(200).json({message : "login avec succeés",user,token}) 
        } 
  
    }catch(err) {
        console.log(err);
    }
}

export async function SignUp(req,res) {
    try {
        //Get User Input
        const { name, lastName , email , password , adress , driverLicense , delevredOn , number } = req.body
        
        //Validate user input
        if (!(name && lastName && email && password && adress && driverLicense && delevredOn && number )) {
            res.status(400).send("Required Inputs")
        }

        //checking the existance of user 
        
        const existUser = await User.findOne({email})

        if (existUser) {
            return res.status(409).send("User Already exist.LogIn")
        }
        

        //Encrypt user Password
        const encryptedPassword = await bcrypt.hash(password, 10)

        //create user in our database
        const user = await User.create({
            name,
            lastName,
            email: email.toLowerCase(),
            password: encryptedPassword, 
            adress,
            driverLicense,
            delevredOn,
            number,
        })

        res.send(user)
    }
    catch(err){
        console.log(err)
    }
}

export async function UpdateProfile(req,res) {
    const driverLicense = req.params.driverLicense
    var user = await User.findOneAndUpdate({
        driverLicense: driverLicense,
        name: req.body.name
    })
    res.status(200).json(user)
}

export async function ForgetPasswordTokenGenrator(req,res,next) {
    const {email} = req.body
    //existance of user in database
    const userEmail = await User.findOne({ "email": email })
    if (email !== userEmail.email){
        res.status(400).json({email})
        return
    } 
    dotenv.config()
    const token = jwt.sign(userEmail.email,process.env.ACCESS_TOKEN_SECRET)
    const link = `http://localhost:3000/user/forgetPassword/${userEmail._id}/${token}`
    console.log(link)//sending email here to User
}

export async function ForgetPasswordReciver(req,res,next) {
    const {id, token} = req.params
    //check if this id exist in DB
    const user = await User.findOne({ "_id": id })
    console.log("lennnnnnnnnnnnnaaaaaaaaaaa")
    console.log(user._id)
    console.log(id)
    if(!(user._id.equals(id))) {
        res.send('invalid Id...')
        return
    }
    //WE HAVE A VALID ID AND WE HAVE A VALID USER WITH THIS ID
    dotenv.config()
    try{
        const payload = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        res.send(user.email)    
    }
    catch(err) {
        res.send(err)
    }
}

export async function ForgetPasswordChanger(req,res,next) {
    const {id, token} = req.params
    const {password,password2} = req.body
    //check if this id exist in DB
    const user = await User.findOne({ "email": email })
   
    if(id !== user._id){
        res.send('invalid Id...')
        return
    }
    dotenv.config()
    try{
        const payload = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        //validate password & password2 
        user.password = password
        res.send(user)     
    }
    catch(err) {
        res.send(err)
    }
}
