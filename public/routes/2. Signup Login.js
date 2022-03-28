"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var customer_controller_1 = require("../2. Signup Login/2.2 Customer SignUp/customer.controller");
var customer_model_1 = require("../2. Signup Login/2.2 Customer SignUp/customer.model");
var customer_repository_1 = require("../2. Signup Login/2.2 Customer SignUp/customer.repository");
var customer_service_1 = require("../2. Signup Login/2.2 Customer SignUp/customer.service");
var login_controller_1 = require("../2. Signup Login/2.1 Login/login.controller");
var login_model_1 = require("../2. Signup Login/2.1 Login/login.model");
var login_repository_1 = require("../2. Signup Login/2.1 Login/login.repository");
var login_service_1 = require("../2. Signup Login/2.1 Login/login.service");
var sp_controller_1 = require("../2. Signup Login/2.3 Service Provider SignUp/sp.controller");
var sp_model_1 = require("../2. Signup Login/2.3 Service Provider SignUp/sp.model");
var sp_repository_1 = require("../2. Signup Login/2.3 Service Provider SignUp/sp.repository");
var sp_service_1 = require("../2. Signup Login/2.3 Service Provider SignUp/sp.service");
var forgotPassword_repository_1 = require("../2. Signup Login/2.4 Forgot Password/forgotPassword.repository");
var forgotPassword_model_1 = require("../2. Signup Login/2.4 Forgot Password/forgotPassword.model");
var forgotPassword_service_1 = require("../2. Signup Login/2.4 Forgot Password/forgotPassword.service");
var forgotPassword_controller_1 = require("../2. Signup Login/2.4 Forgot Password/forgotPassword.controller");
var add = customer_model_1.UserSchema.add;
var validate = sp_model_1.HelperSchema.validate;
var addLogin = login_model_1.LoginSchema.addLogin;
var addReset = forgotPassword_model_1.ResetSchema.addReset, addPassword = forgotPassword_model_1.ResetSchema.addPassword;
var router = express_1.default.Router();
var userRepo = new customer_repository_1.UsersRepository();
var userService = new customer_service_1.UsersService(userRepo);
var userController = new customer_controller_1.UsersController(userService);
var helperRepo = new sp_repository_1.HelpersRepository();
var helperService = new sp_service_1.HelpersService(helperRepo);
var helperController = new sp_controller_1.HelpersController(helperService);
var loginRepo = new login_repository_1.LoginRepository();
var loginService = new login_service_1.LoginService(loginRepo);
var loginController = new login_controller_1.LoginController(loginService);
var resetPassRepo = new forgotPassword_repository_1.ResetRepository();
var resetPassService = new forgotPassword_service_1.ResetService(resetPassRepo);
var resetPassController = new forgotPassword_controller_1.ResetController(resetPassService);
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
router.post('/createCustomer', (0, celebrate_1.celebrate)(add), userController.createUsers);
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
router.post('/createServiceProvider', (0, celebrate_1.celebrate)(validate), helperController.createHelper);
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
router.post('/Login', (0, celebrate_1.celebrate)(addLogin), loginController.checkLogin);
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
router.post('/ForgotPassword', (0, celebrate_1.celebrate)(addReset), resetPassController.forgotPassword);
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
router.post('/ResetPassword', (0, celebrate_1.celebrate)(addPassword), resetPassController.resetPassword);
module.exports = router;
