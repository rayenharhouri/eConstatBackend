import express from "express";
import * as UserController from '../Controllers/userController.js'

const router = express.Router()

router.route('/')
    .get(UserController.LogIn)
    .post(UserController.SignUp)

router.route('/update')
    .patch(UserController.UpdateProfile)

export default router