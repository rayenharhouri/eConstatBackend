import express from "express";
import * as UserController from '../Controllers/userController.js'



const router = express.Router()

/////////////////////////////////////////////////////////////////////////////schemas


/**
 * @openapi
 * components:
 *  schemas:
 *    UserSignup:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *        - lastName
 *        - adress
 *        - number
 *        - driverLicense
 *        - delevredOn
 *      properties:
 *        email:
 *          type: string
 *          default: foulen.elfouleni@example.com
 *        name:
 *          type: string
 *          default: foulen
 *        password:
 *          type: string
 *          default: stringPassword123
 *        lastName:
 *          type: string
 *          default: elFouleni
 *        adress:
 *          type: string
 *          default: ariana
 *        number:
 *          type: Int
 *          default: 53342234
 *        driverLicense:
 *          type: string
 *          default: F23322443
 *        delevredOn:   
 *          type: date
 *          default: 02-03-2018
 *    UserSignupResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        _id:
 *          type: string
 *        password:
 *          type: string
 *        lastName:
 *          type: string
 *        adress:
 *          type: string
 *        number:
 *          type: Int
 *        driverLicense:
 *          type: string
 *        delevredOn:
 *          type: date
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */



/**
 * @openapi
 * components:
 *  schemas:
 *    UserLogin:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: foulen.elfouleni@example.com
 *        password:
 *          type: string
 *          default: stringPassword123
 *    UserLoginResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 */







/**
 * @openapi
 * components:
 *  schemas:
 *    UserUpdate:
 *      type: object
 *      required:
 *        - email
 *        - name
 *        - password
 *        - lastName
 *        - adress
 *        - number
 *        - driverLicense
 *        - delevredOn
 *        - verified
 *      properties:
 *        email:
 *          type: string
 *          default: foulen.elfouleni@example.com
 *        name:
 *          type: string
 *          default: foulen
 *        password:
 *          type: string
 *          default: stringPassword123
 *        lastName:
 *          type: string
 *          default: elFouleni
 *        adress:
 *          type: string
 *          default: ariana
 *        number:
 *          type: Int
 *          default: 53342234
 *        driverLicense:
 *          type: string
 *          default: F23322443
 *        delevredOn:   
 *          type: date
 *          default: 02-03-2018
 */





/**
 * @openapi
 * components:
 *  schemas:
 *    UserSend-confirmation-email:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        email:
 *          type: string
 *          default: foulen.elfouleni@example.com
 *    UserSend-confirmation-emailResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 */






/**
 * @openapi
 * components:
 *  schemas:
 *    UserForgotPassword:
 *      type: object
 *      required:
 *        - email
 *      properties:
 *        email:
 *          type: string
 *          default: foulen.elfouleni@example.com
 *    UserForgotPasswordResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 */



/**
 * @openapi
 * components:
 *  schemas:
 *    UserConfirmationOtp:
 *      type: object
 *      required:
 *        - otp
 *      properties:
 *        otp:
 *          type: Int
 *          default: 4444
 *    UserConfirmationOtpResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: Int
 */

 ////////////////////////////////////////////////////////////////////////end schemas  





/**
   * @openapi
   * '/user/signUp':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true     
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/UserSignup'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:   
   *              $ref: '#/components/schemas/UserSignupResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
router.post('/signUp',UserController.SignUp)



/**
   * @openapi
   * '/user/login':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true     
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/UserLogin'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:   
   *              $ref: '#/components/schemas/UserLoginResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */

router.post('/login',UserController.LogIn)

/**
   * @openapi
   * '/api/users/update/{driverLicense}':
   *  patch:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true     
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/UserSignup'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
router.route('/updateUser/:dirverLicence').patch(UserController.UpdateProfile)


/**
   * @openapi
   * '/user/send-confirmation-email':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true     
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/UserSend-confirmation-email'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:   
   *              $ref: '#/components/schemas/UserSend-confirmation-emailResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
router.post("/send-confirmation-email", UserController.sendConfirmationEmail)

router.get("/confirmation/:token", UserController.confirmation)


/**
   * @openapi
   * '/user//forgotPassword':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true     
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/UserForgotPassword'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:   
   *              $ref: '#/components/schemas/UserForgotPasswordResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
router.post('/forgotPassword',UserController.forgotPassword)



/**
   * @openapi
   * '/user//confirmationOtp':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true     
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/UserConfirmationOtp'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:   
   *              $ref: '#/components/schemas/UserConfirmationOtpResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
router.post("/confirmationOtp",UserController.confirmationOTP)

router.put("/updatePassword",UserController.updatePassword)

router.post("/userProfil",UserController.userProfil)



export default router