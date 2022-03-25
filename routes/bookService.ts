import express from "express";
import { celebrate } from 'celebrate';

import { BookServiceController} from "../3. Book Service/bookservice.controller";
import { BookServiceSchema } from "../3. Book Service/bookservice.model";
import { BookServiceRepository } from "../3. Book Service/bookservice.repository";
import { BookService } from "../3. Book Service/bookservice.service";

import { LoginController} from '../2. Signup Login/2.1 Login/login.controller';
import { LoginRepository } from '../2. Signup Login/2.1 Login/login.repository';
import { LoginService } from '../2. Signup Login/2.1 Login/login.service';

const router: express.Router = express.Router();

const bookServiceRepo: BookServiceRepository = new BookServiceRepository();
const bookServiceService: BookService= new BookService(bookServiceRepo);
const bookServiceController: BookServiceController = new BookServiceController(bookServiceService);

const loginRepo: LoginRepository = new LoginRepository();
const loginService: LoginService = new LoginService(loginRepo);
const loginController: LoginController = new LoginController(loginService);

const {zipcode, userAddress, createService} = BookServiceSchema;

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
router.post('/checkZipcode', celebrate(zipcode), loginController.validateToken, bookServiceController.checkAvailibility);

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
router.post('/createServiceRequest', celebrate(createService), loginController.validateToken, bookServiceController.decodeToken, bookServiceController.CreateServiceRequest);

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
router.post('/createUserAddress', celebrate(userAddress), loginController.validateToken, bookServiceController.createUserAddress);

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

export = router;