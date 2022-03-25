import express from 'express';
import { celebrate } from 'celebrate';

import { UsersController } from '../2. Signup Login/2.2 Customer SignUp/customer.controller';
import { UserSchema } from '../2. Signup Login/2.2 Customer SignUp/customer.model';
import { UsersRepository } from '../2. Signup Login/2.2 Customer SignUp/customer.repository';
import { UsersService } from '../2. Signup Login/2.2 Customer SignUp/customer.service';

import { LoginController} from '../2. Signup Login/2.1 Login/login.controller';
import { LoginSchema } from '../2. Signup Login/2.1 Login/login.model';
import { LoginRepository } from '../2. Signup Login/2.1 Login/login.repository';
import { LoginService } from '../2. Signup Login/2.1 Login/login.service';

import { HelpersController} from '../2. Signup Login/2.3 Service Provider SignUp/sp.controller';
import { HelperSchema } from '../2. Signup Login/2.3 Service Provider SignUp/sp.model';
import { HelpersRepository} from '../2. Signup Login/2.3 Service Provider SignUp/sp.repository';
import { HelpersService } from '../2. Signup Login/2.3 Service Provider SignUp/sp.service';

import { ResetRepository } from '../2. Signup Login/2.4 Forgot Password/forgotPassword.repository';
import { ResetSchema } from '../2. Signup Login/2.4 Forgot Password/forgotPassword.model';
import { ResetService } from '../2. Signup Login/2.4 Forgot Password/forgotPassword.service';
import { ResetController } from '../2. Signup Login/2.4 Forgot Password/forgotPassword.controller';

const {add} = UserSchema;
const {validate} = HelperSchema;
const {addLogin} = LoginSchema;
const { addReset, addPassword } = ResetSchema;

const router: express.Router = express.Router();

const userRepo: UsersRepository = new UsersRepository();
const userService: UsersService = new UsersService(userRepo);
const userController: UsersController = new UsersController(userService);

const helperRepo: HelpersRepository = new HelpersRepository();
const helperService: HelpersService = new HelpersService(helperRepo);
const helperController: HelpersController = new HelpersController(helperService);

const loginRepo: LoginRepository = new LoginRepository();
const loginService: LoginService = new LoginService(loginRepo);
const loginController: LoginController = new LoginController(loginService);

const resetPassRepo: ResetRepository = new ResetRepository();
const resetPassService: ResetService = new ResetService(resetPassRepo);
const resetPassController: ResetController = new ResetController(resetPassService);

/**
 *@swagger
 * definitions:
 *  User:
 *   type: object
 *   properties:
 *    FirstName:
 *     type: string
 *     description: first name of the user
 *     example: 'Dhairya'
 *    LastName:
 *     type: string
 *     description: last name of the user
 *     example: 'Joshi'
 *    Email:
 *     type: string
 *     description: user email
 *     example: 'dhairyajoshi.905@gmail.com'
 *    Password:
 *     type: string
 *     description: password
 *     example: 'abcd1234'
 *    ConfirmPassword:
 *     type: string
 *     description: password
 *     example: 'abcd1234'
 *    Mobile:
 *     type: string
 *     description: phone number
 *     example: '1234567890'
 *  Login:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: email of the user
 *     example: 'dhairyajoshi.905@gmail.com'
 *    Password:
 *     type: string
 *     description: password
 *  Reset:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: email of the user
 *     example: 'dhairyajoshi.905@gmail.com'
 *  NewPassword:
 *   type: object
 *   properties:
 *    resetLink:
 *     type: string
 *     description: reset link
 *    newPassword:
 *     type: string
 *     description: new password
 */

// Customer SignUp routes

/**
 * @swagger
 * /Helperland/SignUp&Login/createCustomer:
 *  post:
 *   summary: Customer Sign-up
 *   description: user registration
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/User'
 *   responses:
 *    200:
 *     description: Email successfully sent, kindly activate your account.
 *    400:
 *     description: password does not match / email or mobile number already registered.
 *    500:
 *     description: failure in User registration.
 */
router.post('/createCustomer', celebrate(add), userController.createUsers);

router.get('/activate/Customer/:token', userController.activateAccount);

// Service Provider SignUp routes

/**
 * @swagger
 * /Helperland/SignUp&Login/createServiceProvider:
 *  post:
 *   summary: Become Helper
 *   description: Helper registration
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/User'
 *   responses:
 *    200:
 *     description: Email successfully sent, kindly active your account.
 *    400:
 *     description: password does not match / email or mobile number already registered.
 *    500:
 *     description: failure in  Service Provider registration.
 */
router.post('/createServiceProvider', celebrate(validate), helperController.createHelper);

router.get('/activate/ServiceProvider/:token', helperController.activateAccount);

// Login routes

/**
 * @swagger
 * /Helperland/SignUp&Login/Login:
 *  post:
 *   summary: User Login
 *   description: Login
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Login'
 *   responses:
 *    200:
 *     description: Login successful.
 *    401:
 *     description: invalid username or password.
 *    500:
 *     description: something went wrong.
 */
router.post('/Login', celebrate(addLogin), loginController.checkLogin);

router.delete('/Logout', loginController.validateToken, loginController.removeToken);

// Forgot password routes

/**
 * @swagger
 * /Helperland/SignUp&Login/ForgotPassword:
 *  post:
 *   summary: forgot Password
 *   description: Enter email
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Reset'
 *   responses:
 *    200:
 *     description: Email successfully sent.
 *    400:
 *     description: User does not exist.
 *    500:
 *     description: something went wrong.
 */
router.post('/ForgotPassword', celebrate(addReset), resetPassController.forgotPassword);

/**
 * @swagger
 * /Helperland/SignUp&Login/ResetPassword:
 *  post:
 *   summary: Reset Password
 *   description: Enter new password
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/NewPassword'
 *   responses:
 *    200:
 *     description: Password successfully changed.
 *    401:
 *     description: Incorrect or expired token.
 *    400:
 *     description: You used that password recently. Choose different password.
 *    500:
 *     description: something went wrong.
 */
router.post('/ResetPassword', celebrate(addPassword), resetPassController.resetPassword);

export = router;