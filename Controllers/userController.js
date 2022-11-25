import User from '../Models/User.model.js'
import Token from '../Models/TokenJwt.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import * as os from 'os'
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import * as path from 'path'
import otpGenerator from 'otp-generator'

export async function getAllUserCars (req, res) {
  var token = req.body.token
  let Token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  var users =await User.findOne().populate('cars')
  try{
    res.send(users)
  } catch(err) {
    console.log(err);
  }
}


export async function LogIn(req, res) {
  try {
    const { email, password } = req.body
    if (!(email && password)) {
      res.status(400).send('Required Input')
    }
    const user = await User.findOne({ email: email })
    if (user && (await bcrypt.compare(password, user.password))) {
      dotenv.config()
      let token = new Token({
        userId: user._id,
        token: jwt.sign(
          { user },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '1H' },
        ),
      })

      res.status(200).json({ message: 'login avec succeés', user, token })
     
    } else {
      res.status(400).json({erreur : "erreur"})
    }
  } catch (err) {
    res.status(400).json({json:"erreur"})
    console.log(err)
  }
}

export async function SignUp(req, res) {
  const emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  try {
    //Get User Input
    const {
      name,
      lastName,
      email,
      password,
      adress,
      driverLicense,
      delevredOn,
      number,
    } = req.body

    //Validate user input
    if (
      !(
        name &&
        lastName &&
        email &&
        password &&
        adress &&
        driverLicense &&
        delevredOn &&
        number
      )
    ) {
      res.status(400).send('Required Inputs')
    }
    if (emailValid.test(email) == false) {
      res.status(400).send('email invalid')
      return
    }

    //checking the existance of user

    const existUser = await User.findOne({ email })

    if (existUser) {
      return res.status(409).send('User Already exist.LogIn')
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
  } catch (err) {
    console.log(err)
  }
}

export async function UpdateProfile(req, res) {
  const {driverLicense,name,lastName,token} = req.body
if (token) {
  try {
    let Token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    let user = await User.findOneAndUpdate(
      { email: Token.user.email },
      {
        $set: {
          driverLicense: driverLicense,
          name: name,
          lastName: lastName
        },
      }
    )
    console.log(user);
    await res.status(200).send(user)
  } catch (e) {
    return res.status(400).json({ "error1": e })
  }
} else {
  return res.status(400).json({ "error2": "erreur2" })
}
}


export async function sendConfirmationEmail(req, res) {
  //finding the user mail
  const user = await User.findOne({ email: req.body.email.toLowerCase() })
  //generating token
  if (user) {
    let token = new Token({
      userId: user._id,
      token: jwt.sign(
        { user },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1H' },
      ),
    })
    //sending mail
    await doSendConfirmationEmail(req.body.email, token.token)

    res.status(200).send({
      message: "L'email de confirmation a été envoyé a " + user.email,
    })
  } else {
    res.status(404).send({ message: 'User innexistant' })
  }
}

async function doSendConfirmationEmail(email, token) {
  let port = process.env.PORT || 3000
 
  sendEmail({
    from: process.env.eConstat_Mail,
    to: email,
    subject: 'Confirm your email',
    template: 'email' ,
    context: {
        port : port,
        token : token
    }
  })
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

export async function confirmation(req, res) {
  console.log(req.params.token);
  if (req.params.token) {
    try {
        let token = jwt.verify(req.params.token, process.env.ACCESS_TOKEN_SECRET)
        console.log("ghefsfsdfdsf");
        console.log(token.user._id);
    } catch (e) {
      return res.status(200).json({"error" : "erreur"})
    }
  } else {
    return res.status(200).json({"error" : "erreur"})
  }
  let token = jwt.verify(req.params.token, process.env.ACCESS_TOKEN_SECRET)
  console.log(token);
  User.findById(token.user._id, function (err, user) {
    if (!user) {
      return res.status(200).json({"error" : "user does Not Exist"})
    } else if (user.verified) {
      return res.status(200).json({"error" : "user alerady verified"})
    } else {
      user.verified = true
      user.save(function (err) {
        if (err) {
          return res.status(400).json({"error" : "erreur"})
        } else {
          return res.status(200).json({"success" : "user verified"})
        }
      })
    }
  })
}

// exports.delete = async (req, res) => {
//   let user = await User.findById(req.body._id)
//   if (user) {
//     await user.remove()
//     return res.send({ message: "Users" + user._id + " have been deleted" })
//   } else {
//     return res.status(404).send({ message: "User does not exist" })
//   }
// }


//FORGET PASSWORD LOGIC
export async function forgotPassword (req, res) {
  const {email} = req.body
  const isExisting = await User.findOne({email})
  console.log(isExisting)
  if (isExisting) {
    let OTP = otpGenerator.generate(4,{upperCaseAlphabets:false,specialChars:false,digits:true,lowerCaseAlphabets:false})
    const user = await User.findOneAndUpdate({email: isExisting.email,otp: OTP})
    await sendOTP(req.body.email)
    res.status(200).send({
      message: "L'email de reinitialisation a été envoyé a " + isExisting.email,
    })
  } else {
    res.status(404).send({ message: "User innexistant" })
  }
}
async function sendOTP(email) {
  const user = await User.findOne({ email: email })
    sendEmailOTP({
      from: process.env.eConstat_Mail,
      to: email,
      subject: "Password reset",
      template: 'otp',
      context: {
        OTP : user.otp
      }
    })
  

}
function sendEmailOTP(mailOptions) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
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
      console.log("Server not ready")
    } else {
      console.log("Server is ready to take our messages")
    }
  })

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
  })
}

export async function confirmationOTP(req,res) {
    const user = await User.findOne({ otp: req.body.otp })
      if (user) {
          res.status(200).json({"message" : "success"})
      } else {
        res.status(400).json({"error": "error"})
      }
}

//FORGET PASSWORD LOGIC ENDS HERE

export async function updatePassword(req, res) {
  const { email ,newPasswordConfirm,newPassword } = req.body

  if (newPassword==newPasswordConfirm) {
    let newPasswordEncrypted = await bcrypt.hash(newPassword, 10)

    let user = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          password: newPasswordEncrypted,
        },
      }
    )
    return res.status(200).send({ message: "Password updated successfully", user })
  } else {
    return res.status(403).send({ message: "Password should match" })
  }
}

export async function userProfil(req,res) {
  var token = req.body.token
  console.log(token);
  if (token) {
    try {
        let Token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(Token.user);
        res.status(200).send(Token)
    } catch (e) {
      return res.status(400).json({"error1" : e})
    }
  } else {
    return res.status(400).json({"error2" : "erreur2"})
  }

}

