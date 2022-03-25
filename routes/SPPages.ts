import express from "express";
import { celebrate } from "celebrate";

import { SRRepository } from "../5. SP Pages/5.1 New SR/newSR.repository";
import { SRService } from "../5. SP Pages/5.1 New SR/newSR.service";
import { SRController } from "../5. SP Pages/5.1 New SR/newSR.controller";

import { UpcomingServicesRepository } from "../5. SP Pages/5.2 Upcoming SR/upcomingSR.repository";
import { UpcomingService } from "../5. SP Pages/5.2 Upcoming SR/upcomingSR.service";
import { UpcomingServiceController } from "../5. SP Pages/5.2 Upcoming SR/upcomingSR.controller";

import { ServiceHistoryRepository } from "../5. SP Pages/5.4 SR History/SRHistory.repository";
import { SRHistoryController } from "../5. SP Pages/5.4 SR History/SRHistory.controller";
import { SRHistoryService } from "../5. SP Pages/5.4 SR History/SRHistory.service";

import { BlockCustomerRepository } from "../5. SP Pages/5.6 Block User/blockUser.repository";
import { BlockCustomerService } from "../5. SP Pages/5.6 Block User/blockUser.service";
import { BlockCustomerController } from "../5. SP Pages/5.6 Block User/blockUser.controller";

import { MySettingsRepository } from "../5. SP Pages/5.7 My Settings/mySettings.repository";
import { MySettingsService } from "../5. SP Pages/5.7 My Settings/mySettings.service";
import { MySettingsController } from "../5. SP Pages/5.7 My Settings/mySettings.controller";

import { LoginRepository } from "../2. Signup Login/2.1 Login/login.repository";
import { LoginService } from "../2. Signup Login/2.1 Login/login.service";
import { LoginController } from "../2. Signup Login/2.1 Login/login.controller";

import { MySettingsSchema } from "../5. SP Pages/5.7 My Settings/mySettings.model";
const { UpdateUser, ChangePassword } = MySettingsSchema;

import { BlockCustomerSchema } from "../5. SP Pages/5.6 Block User/blockUser.model";
const { Blocked } = BlockCustomerSchema;

const router: express.Router = express.Router();

const serviceRequestRepo: SRRepository = new SRRepository();
const serviceRequestService: SRService = new SRService(serviceRequestRepo);
const serviceRequestController: SRController = new SRController(serviceRequestService);

const upcomingServiceRepo: UpcomingServicesRepository = new UpcomingServicesRepository();
const upcomingService: UpcomingService = new UpcomingService(upcomingServiceRepo);
const upcomingServiceController: UpcomingServiceController = new UpcomingServiceController(upcomingService);

const serviceHistoryRepo: ServiceHistoryRepository = new ServiceHistoryRepository();
const serviceHistoryService: SRHistoryService = new SRHistoryService(serviceHistoryRepo);
const serviceHistoryController: SRHistoryController = new SRHistoryController(serviceHistoryService);

const blockCustomerRepo: BlockCustomerRepository = new BlockCustomerRepository();
const blockCustomerService: BlockCustomerService = new BlockCustomerService(blockCustomerRepo);
const blockCustomerController: BlockCustomerController =new BlockCustomerController(blockCustomerService);

const mySettingsRepo: MySettingsRepository = new MySettingsRepository();
const mySettingsService: MySettingsService = new MySettingsService(mySettingsRepo);
const mySettingsController: MySettingsController = new MySettingsController(mySettingsService);

const loginRepo: LoginRepository = new LoginRepository();
const loginService: LoginService = new LoginService(loginRepo);
const loginController: LoginController = new LoginController(loginService);

// New Service Requests
router.get("/AllNewSR", loginController.validateToken, serviceRequestController.getAllNewSR);

router.get("/NewSR/:SRId", loginController.validateToken, serviceRequestController.isSRAccepted, serviceRequestController.acceptNewSR);

router.get("/NewSRDetail/:SRId", loginController.validateToken, serviceRequestController.getSRDetailById);

// Upcoming Services
router.get("/AllUpcomingSR", loginController.validateToken, upcomingServiceController.getUpcomingServices);

router.put("/CancelSR/:SRId", loginController.validateToken, upcomingServiceController.cancelService);

router.put("/CompleteSR/:SRId", loginController.validateToken, upcomingServiceController.completeServiceRequest);

router.get("/UpcomingSRDetail/:SRId", loginController.validateToken, upcomingServiceController.getServiceRequestDetailById);

// Service History
router.get("/SRHistory", loginController.validateToken, serviceHistoryController.getSRHistory);

router.get("/SRHistoryDetail/:SRId", loginController.validateToken, serviceHistoryController.getSRDetailById);

router.get("/SRHistoryDownload", loginController.validateToken, serviceHistoryController.exportDataInExcelFormat);

// Ratings
router.get("/SPRatings", loginController.validateToken, serviceHistoryController.getSPRating);

// Block Unblock Customer
router.get("/PastCustomers", loginController.validateToken, blockCustomerController.PastCustomersOfSP);

router.put("/BlockUnblockCustomer/:UserId", celebrate(Blocked), loginController.validateToken, blockCustomerController.BlockCustomer, blockCustomerController.UnblockCustomer);

// My settings
router.get("/MyDetails", loginController.validateToken, mySettingsController.getUDById);

router.put("/MyDetails", celebrate(UpdateUser), loginController.validateToken, mySettingsController.updateUDById, mySettingsController.CreateUpdateAddress);

router.put("/ChangePassword", celebrate(ChangePassword), loginController.validateToken, mySettingsController.changePassword);

/**
 *@swagger
 * definitions:
 *  Blocked:
 *   type: object
 *   properties:
 *    IsBlocked:
 *     type: boolean
 *     example: 'true'
 *  UpdateUser:
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
 *    Mobile:
 *     type: string
 *     description: phone number
 *     example: "9876543210"
 *    DateOfBirth:
 *     type: string
 *     description: birth date
 *     example: "01-01-2000"
 *    NationalityId:
 *     type: integer
 *     description: nationality
 *     example: 1 
 *    Gender:
 *     type: string
 *     description: gender
 *     example: "Male / Female"
 *    Address:
 *      type: object
 *      properties:
 *       StreetName:
 *        type: string
 *        description: address
 *        example: 'My House'
 *       HouseNumber:
 *        type: string
 *        description: house number
 *        example: 'Near This'
 *       PostalCode:
 *        type: string
 *        description: zipcode
 *        example: '380001'
 *       City:
 *        type: string
 *        description: city
 *        example: 'Ahmedabad'
 *  ChangePassword:
 *   type: object
 *   properties: 
 *    OldPassword:
 *     type: string
 *     description: password
 *     example: 'abcd1234'
 *    NewPassword:
 *     type: string
 *     description: password
 *     example: '1234Abcd'
 *    ConfirmPassword:
 *     type: string
 *     description: password
 *     example: '1234Abcd'
 */

// 5.1 New SR

/**
 * @swagger
 * /Helperland/SPPages/AllNewSR:
 *  get:
 *   summary: New serivce requests 
 *   description: Service requests
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: service request accepted successfully.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404:
 *     description: you have not provided zipcode in your detail please update your detail to get requests available in your entered zipcode area / service requests not found / helper not found.
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /Helperland/SPPages/NewSR/{SRId}:
 *  get:
 *   summary: Accept service request
 *   description: helper can accept new service request
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: SRId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: service request accepted successfully.
 *    400: 
 *     description: proper input not found in request.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: no service request detail found for this request / error in accepting service request.
 *    422:
 *     description: another service request has already been assigned which has time overlap with this service request. You can’t pick this one! / this service request is no more available. It has been assigned to another provider
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /Helperland/SPPages/NewSRDetail/{SRId}:
 *  get:
 *   summary: Service request detail
 *   description: display service request detail
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: requestId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: sevice request detail.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: request detail not available.
 *    500:
 *     description: internal server error.
 */

 // 5.2 Upcoming SR

/**
 * @swagger
 * /Helperland/SPPages/AllUpcomingSR:
 *  get:
 *   summary: Upcoming service request
 *   description: display upcoming service requests
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: upcoming service requests.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: no upcoming service requests found.
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /Helperland/SPPages/CancelSR/{SRId}:
 *  put:
 *   summary: Cancel service request
 *   description: Cancel service request
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: SRId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: service request cancelled successfully.
 *    400:
 *     description: service request id not found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: service request detail not found.
 *    422:
 *     description: error in cancelling service request
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /Helperland/SPPages/CompleteSR/{SRId}:
 *  put:
 *   summary: Complete service request
 *   description: complete service request
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: SRId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: service request completed successfully.
 *    400:
 *     description: You can not complete service request before end time / service request id not found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: service request detail not found.
 *    422:
 *     description: error in updating service request
 *    500:
 *     description: internal server error.
 */

 /**
 * @swagger
 * /Helperland/SPPages/NewSRDetail/{SRId}:
 *  get:
 *   summary: Service request detail
 *   description: display service request detail
 *   tags: 
 *    - Service Provider Screens  
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: SRId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: sevice request detail.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: request detail not available.
 *    500:
 *     description: internal server error.
 */

// 5.4 Service History

/**
 * @swagger
 * /Helperland/SPPages/SRHistory:
 *  get:
 *   summary:  Serivce request history 
 *   description: service request history
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: service request history.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404:
 *     description: service request history not found in past / service request not found.
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /Helperland/SPPages/SRHistoryDetail/{SRId}:
 *  get:
 *   summary: Service request detail
 *   description: display service request detail
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: SRId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: sevice request detail.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: no service request detail found for this request.
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /Helperland/SPPages/SRHistoryDownload:
 *  get:
 *   summary: History download
 *   description: download history
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: sevice request detail.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: no data to export.
 *    500:
 *     description: internal server error.
 */

// 5.5 My Ratings

/**
 * @swagger
 * /Helperland/SPPages/SPRatings:
 *  get:
 *   summary:  Ratings
 *   description:  display ratings of service provider given by customer
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: ratings.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: ratings / data not found.
 *    500:
 *     description: internal server error.
 */

// 5.6 Block Unblock Customer

 /**
 * @swagger
 * /Helperland/SPPages/PastCustomers:
 *  get:
 *   summary: Display customers
 *   description: list of customers worked with service provider in past
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: customers.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: customers not found.
 *    500:
 *     description: internal server error.
 */

 /**
 * @swagger
 * /Helperland/SPPages/BlockUnblockCustomer/{UserId}:
 *  put:
 *   summary: Block unblock customer
 *   description: block unblock customer worked with service provider in past
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: UserId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Blocked'
 *   responses:
 *    200:
 *     description: customer successfully added in block / unblock list.
 *    201:
 *     description: customer alraedy in blocked/unblocked list.
 *    400: 
 *     description: helper has not worked for this customer. / proper input not found in request body.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: no service provider found worked with customer in past / no customer in blocklist to unblock.
 *    422:
 *     description: error in adding blocked / unblocked list.
 *    500:
 *     description: internal server error.
 */

// 5.7 My Settings

/**
 * @swagger
 * /Helperland/SPPages/MyDetails:
 *  get:
 *   summary: Service provider detail
 *   description: display service provider details.
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: detail found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: user not found.
 *    400:
 *     description: proper input not found in request.
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /Helperland/SPPages/MyDetails:
 *  put:
 *   summary: Update service provider detail
 *   description: edit user details to update.
 *   tags: 
 *    - Service Provider Screens
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UpdateUser'
 *   responses:
 *    200:
 *     description: details updated successfully.
 *    400:
 *     description: proper input not found in request.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    422: 
 *     description: error in updating user detail.
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /Helperland/SPPages/ChangePassword:
 *  put:
 *   summary: Change password
 *   description: enter old password and new password.
 *   tags: 
 *    - Service Provider Screens
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ChangePassword'
 *   responses:
 *    200:
 *     description: password changed successfully.
 *    400:
 *     description: incorrect old password or new Password and confirm Password must be same.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    422:
 *     description: error in changing password.
 *    500:
 *     description: internal server error.
 */

export = router;