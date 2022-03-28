"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var bookservice_controller_1 = require("../3. Book Service/bookservice.controller");
var bookservice_model_1 = require("../3. Book Service/bookservice.model");
var bookservice_repository_1 = require("../3. Book Service/bookservice.repository");
var bookservice_service_1 = require("../3. Book Service/bookservice.service");
var login_controller_1 = require("../2. Signup Login/2.1 Login/login.controller");
var login_repository_1 = require("../2. Signup Login/2.1 Login/login.repository");
var login_service_1 = require("../2. Signup Login/2.1 Login/login.service");
var router = express_1.default.Router();
var bookServiceRepo = new bookservice_repository_1.BookServiceRepository();
var bookServiceService = new bookservice_service_1.BookService(bookServiceRepo);
var bookServiceController = new bookservice_controller_1.BookServiceController(bookServiceService);
var loginRepo = new login_repository_1.LoginRepository();
var loginService = new login_service_1.LoginService(loginRepo);
var loginController = new login_controller_1.LoginController(loginService);
var zipcode = bookservice_model_1.BookServiceSchema.zipcode, userAddress = bookservice_model_1.BookServiceSchema.userAddress, createService = bookservice_model_1.BookServiceSchema.createService;
/**
 *@swagger
 * definitions:
 *  ServiceRequest:
 *   type: object
 *   properties:
 *    ServiceId:
 *     type: integer
 *     description: ServiceId
 *     example: 1
 *    ServiceStartDate:
 *     type: date
 *     description: date
 *     example: '01-01-01'
 *    ServiceStartTime:
 *     type: string
 *     description: time
 *     example: '09:35'
 *    ServiceHours:
 *     type: integer
 *     description: hours
 *     example: 2
 *    Comments:
 *     type: string
 *     description: comment
 *     example: 'Hello'
 *    PaymentDue:
 *     type: boolean
 *     example: 'false'
 *    HasPets:
 *     type: boolean
 *     example: 'false'
 *    ServiceRequestAddress:
 *     type: object
 *     properties:
 *      Addressline1:
 *       type: string
 *       description: Address Line 1
 *       example: 'My House'
 *      Addressline2:
 *       type: string
 *       description: Address Line 2
 *       example: 'Near This'
 *      City:
 *       type: string
 *       description: city
 *       example: 'Ahmedabad'
 *      State:
 *       type: string
 *       description: state
 *       example: 'Gujarat'
 *      Mobile:
 *       type: string
 *       description: phone number
 *       example: '1234567890'
 *      PostalCode:
 *       type: string
 *       description: zipcode
 *       example: '380015'
 *    ExtraService:
 *     type: array
 *     items:
 *      type: object
 *      properties:
 *       ServiceExtraId:
 *        type: integer
 *        description: extra service
 *        example: 1
 *  CheckZipCode:
 *   type: object
 *   properties:
 *    postalcode:
 *     type: string
 *     description: postal code
 *     example: '380015'
 *  UserAddress:
 *     type: object
 *     properties:
 *      Addressline1:
 *       type: string
 *       description: Address Line 2
 *       example: 'My House'
 *      Addressline2:
 *       type: string
 *       description: Address Line 2
 *       example: 'Near This'
 *      City:
 *       type: string
 *       description: city
 *       example: 'Ahmedabad'
 *      State:
 *       type: string
 *       description: state
 *       example: 'Gujarat'
 *      IsDefault:
 *       type: boolean
 *       example: 'true'
 *      IsDeleted:
 *       type: boolean
 *       example: 'false'
 *      Mobile:
 *       type: string
 *       description: phone number
 *       example: '1234567890'
 */
// Service Request routes
/**
 * @swagger
 * /Helperland/BookService/checkZipcode:
 *  post:
 *   summary: Check helper availibility
 *   description: Enter zip code
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/CheckZipCode'
 *   responses:
 *    200:
 *     description: service provider found
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: We are not providing service in this area.
 *    500:
 *     description: failure in finding service provider.
 *
 */
router.post('/checkZipcode', (0, celebrate_1.celebrate)(zipcode), loginController.validateToken, bookServiceController.checkAvailibility);
/**
 * @swagger
 * /Helperland/BookService/createServiceRequest:
 *  post:
 *   summary: Create Service Request
 *   description: service setup
 *   securityDefinitions:
 *    JWT:
 *     schema:
 *     type: apiKey
 *     name: authorization
 *     in: header
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ServiceRequest'
 *   responses:
 *    200:
 *     description: service booked successfully
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: user not found
 *    500:
 *     description: failure in service booking.
 */
router.post('/createServiceRequest', (0, celebrate_1.celebrate)(createService), loginController.validateToken, bookServiceController.decodeToken, bookServiceController.CreateServiceRequest);
// User routes
/**
 * @swagger
 * /Helperland/BookService/createUserAddress:
 *  post:
 *   summary: Create Address
 *   description: Enter address
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UserAddress'
 *   responses:
 *    200:
 *     description: address created successfully
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: user not found
 *    500:
 *     description: failure in creating address.
 */
router.post('/createUserAddress', (0, celebrate_1.celebrate)(userAddress), loginController.validateToken, bookServiceController.createUserAddress);
/**
 * @swagger
 * /Helperland/BookService/getAllUserAddresses:
 *  get:
 *   summary: Get user addresses
 *   description: get address
 *   responses:
 *    200:
 *     description: address found
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: user not found or Addresses not found
 *    500:
 *     description: failure in finding address
 */
router.get('/getAllUserAddresses', loginController.validateToken, bookServiceController.getUserAddresses);
router.post('/createFavoriteAndBlocked', loginController.validateToken, bookServiceController.createFavoriteAndBlocked);
/**
 * @swagger
 * /Helperland/BookService/getFavoriteAndBlocked:
 *  get:
 *   summary: Get favorite and blocked
 *   description: favorite and blocked user
 *   responses:
 *    200:
 *     description: user found
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: user not found
 *    500:
 *     description: failure in finding user
 */
router.get('/getFavoriteAndBlocked', loginController.validateToken, bookServiceController.getFavoriteAndBlocked);
module.exports = router;
