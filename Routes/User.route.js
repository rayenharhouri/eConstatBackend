import express from "express";
import * as UserController from '../Controllers/userController.js'

const router = express.Router()

router.post('/signUp',UserController.SignUp)
router.post('/login',UserController.LogIn)
router.route('/updateUser/:dirverLicence').patch(UserController.UpdateProfile)
router.post("/send-confirmation-email", UserController.sendConfirmationEmail)
router.get("/confirmation/:token", UserController.confirmation)

export default router