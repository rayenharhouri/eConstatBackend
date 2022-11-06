import express from "express";
import * as UserController from '../Controllers/userController.js'

const router = express.Router()

router.post('/signUp',UserController.SignUp)
router.post('/login',UserController.LogIn)
router.route('/updateUser/:dirverLicence').patch(UserController.UpdateProfile)
router.post('/forgetPassword',UserController.ForgetPasswordTokenGenrator)
router.get('/forgetPassword/:id/:token',UserController.ForgetPasswordReciver)
router.post('/forgetPassword/:id/:token',UserController.ForgetPasswordChanger)

export default router