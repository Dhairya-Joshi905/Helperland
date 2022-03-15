import express from "express";
import { celebrate } from "celebrate";

const router: express.Router = express.Router();

import { DashboardRepository } from "../4. Customer's Pages/4.1 Dashboard/dashboard.repository";
import { DashboardService } from "../4. Customer's Pages/4.1 Dashboard/dashboard.service";
import { DashboardController } from "../4. Customer's Pages/4.1 Dashboard/dashboard.controller";

import { ServiceHistoryRepository } from "../4. Customer's Pages/4.2 Service History/servicehistory.repository";
import { ServiceHistoryService } from "../4. Customer's Pages/4.2 Service History/servicehistory.service";
import { ServiceHistoryController } from "../4. Customer's Pages/4.2 Service History/servicehistory.controller";

import { FavoriteProsRepository } from "../4. Customer's Pages/4.3 Favorite Pros/favoritepros.repository";
import { FavoriteProsService } from "../4. Customer's Pages/4.3 Favorite Pros/favoritepros.service";
import { FavoriteProsController } from "../4. Customer's Pages/4.3 Favorite Pros/favoritepros.controller";

import { ProfileRepository } from "../4. Customer's Pages/4.4 Profile/profile.repository";
import { ProfileService } from "../4. Customer's Pages/4.4 Profile/profile.service";
import { ProfileController } from "../4. Customer's Pages/4.4 Profile/profile.controller";

import { LoginRepository } from "../2. Signup & Login/2.1 Login/login.repository";
import { LoginService } from "../2. Signup & Login/2.1 Login/login.service";
import { LoginController } from "../2. Signup & Login/2.1 Login/login.controller";

// Validation models
import { DashboardSchema } from "../4. Customer's Pages/4.1 Dashboard/dashboard.model";
const { RescheduleSR, CancelSR, GetDashboard } = DashboardSchema;

import { ServiceHistorySchema } from "../4. Customer's Pages/4.2 Service History/servicehistory.model";
const { Ratings } = ServiceHistorySchema;

import { FavoriteProsSchema } from "../4. Customer's Pages/4.3 Favorite Pros/favoritepros.model";
const { Favorite, Blocked } = FavoriteProsSchema;

import { ProfileSchema } from "../4. Customer's Pages/4.4 Profile/profile.model";
const { UpdateUser, UpdateCreateUserAddress, ChangePassword } = ProfileSchema;

const dashboardRepo: DashboardRepository = new DashboardRepository();
const dashboardService: DashboardService = new DashboardService(dashboardRepo);
const dashboardController: DashboardController = new DashboardController(dashboardService);

const serviceHistoryRepo: ServiceHistoryRepository = new ServiceHistoryRepository();
const serviceHistoryService: ServiceHistoryService = new ServiceHistoryService(serviceHistoryRepo);
const serviceHistoryController: ServiceHistoryController = new ServiceHistoryController(serviceHistoryService);

const favoriteProsRepo: FavoriteProsRepository = new FavoriteProsRepository();
const favoriteProsService: FavoriteProsService = new FavoriteProsService(favoriteProsRepo);
const favoriteProsController: FavoriteProsController = new FavoriteProsController(favoriteProsService);

const profileRepo: ProfileRepository = new ProfileRepository();
const profileService: ProfileService = new ProfileService(profileRepo);
const profileController: ProfileController = new ProfileController(profileService);

const loginRepo: LoginRepository = new LoginRepository();
const loginService: LoginService = new LoginService(loginRepo);
const loginController: LoginController = new LoginController(loginService);

/**
 *@swagger
 * definitions:
 *  RescheduleService:
 *   type: object
 *   properties:
 *    date:
 *     type: string
 *     description: date
 *     example: "18-02-2022"
 *    time:
 *     type: string
 *     description: time
 *     example: "21:35"
 *  CancelService:
 *   type: object
 *   properties:
 *    comment:
 *     type: string
 *     description: comment
 *     example: "Cancel Service Comment"
 *  Ratings:
 *   type: object
 *   properties:
 *    Comments:
 *     type: string
 *     description: date
 *     example: "18-02-2022"
 *    OnTimeArrival:
 *     type: float
 *     description: rating
 *     example: 4.5
 *    Friendly:
 *     type: float
 *     description: rating
 *     example: 5
 *    QualityOfService:
 *     type: float
 *     description: rating
 *     example: 5
 *  Favorite:
 *   type: object
 *   properties:
 *    IsFavorite:
 *     type: boolean
 *     example: true
 *  Blocked:
 *   type: object
 *   properties:
 *    IsBlocked:
 *     type: boolean
 *     example: true
 *  UpdateUser:
 *   type: object
 *   properties:
 *    FirstName:
 *     type: string
 *     description: first name of user
 *     example: 'Dhairya'
 *    LastName:
 *     type: string
 *     description: last name of user
 *     example: 'Joshi'
 *    Mobile:
 *     type: string
 *     description: phone number
 *     example: "1234567890"
 *    DateOfBirth:
 *     type: string
 *     description: birth date
 *     example: "01-01-2001"
 *    LanguageId:
 *     type: integer
 *     description: language id
 *     example: 1
 *  UpdateCreateAddress:
 *     type: object
 *     properties:
 *      StreetName:
 *       type: string
 *       description: address
 *       example: 'My Home'
 *      HouseNumber:
 *       type: string
 *       description: house number
 *       example: '8'
 *      PostalCode:
 *       type: string
 *       description: zipcode
 *       example: '380015'
 *      City:
 *       type: string
 *       description: city
 *       example: 'Ahmedabad'
 *      Mobile:
 *       type: string
 *       description: phone number
 *       example: "1234567890"
 *  ChangePassword:
 *   type: object
 *   properties: 
 *    OldPassword:
 *     type: string
 *     description: oldpassword
 *     example: 'oldpassword'
 *    NewPassword:
 *     type: string
 *     description: newpassword
 *     example: 'newpassword'
 *    ConfirmPassword:
 *     type: string
 *     description: password
 *     example: 'newpassword'
 */

// Dashboard

/**
 * @swagger
 * /Helperland/CustomerPages/Dashboard:
 *  get:
 *   summary: Get requests of user
 *   description: User dashboard
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: requests found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: no pending service request found / no service request found for this user.
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /Helperland/CustomerPages/Dashboard/Detail/{id}:
 *  get:
 *   summary: Get request detail
 *   description: Request detail by id
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: request detail found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: no service request detail found for this request.
 *    500:
 *     description: internal server error.
 */

 /**
 * @swagger
 * /Helperland/CustomerPages/RescheduleService/{serviceId}:
 *  post:
 *   summary: Reschedule Service request
 *   description: Enter date and time
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: serviceId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/RescheduleService'
 *   responses:
 *    200:
 *     description: sevice request reschedule successfully.
 *    400:
 *     description: enter future date for reschedule service request.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: service request not found or No data found / service request id not found.
 *    422:
 *     description: error in rescheduling service request.
 *    500:
 *     description: failure in finding service provider.
 */

 /**
 * @swagger
 * /Helperland/CustomerPages/CancelServiceRequest/{srId}:
 *  post:
 *   summary: Cancel Service request
 *   description: feedback
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: srId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/CancelService'
 *   responses:
 *    200:
 *     description: service request cancelled successfully.
 *    201:
 *     description: service request already canceled.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: helper not found.
 *    422:
 *     description: error in canceling service request.
 *    500:
 *     description: internal server error.
 */

// Service history

/**
 * @swagger
 * /Helperland/CustomerPages/ServiceHistory:
 *  get:
 *   summary: User history
 *   description: history of users service request
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: history found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: service request history not found in past.
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /Helperland/CustomerPages/ServiceHistory/{id}:
 *  get:
 *   summary: history request detail
 *   description: users completed or cancelled service request detail
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: detail found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: No service request detail found for this request.
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /Helperland/CustomerPages/Rating/{serviceId}:
 *  post:
 *   summary: Ratings
 *   description: rete service provider
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: serviceId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Ratings'
 *   responses:
 *    200:
 *     description: Success.
 *    201:
 *     description: ratings already set for this service request.
 *    400:
 *     description: service request not completed or service provider not found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: helper not found / srvice request not found / request id not found.
 *    500:
 *     description: internal server error.
 */

// Favorite And Blocked

 /**
 * @swagger
 * /Helperland/CustomerPages/FavoritePros:
 *  get:
 *   summary: Favorite helper
 *   description: helper worked with customer in past
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: helper found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: no service provider found worked with customer in past.
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /Helperland/CustomerPages/FavoritePros/{helperId}:
 *  post:
 *   summary: Favorite Service Provider
 *   description: Add or remove favorite service provider
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: helperId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Favorite'
 *   responses:
 *    200:
 *     description: favorite helper created successfully.
 *    201:
 *     description: favorite helper updated successfully.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: content not found / no service provider found worked with customer in past.
 *    409:
 *     description: helper already in you favorite list
 *    500:
 *     description: internal server error.
 *    502:
 *     description: error in creating favorite helper / error in creating favorite helper.
 */

/**
 * @swagger
 * /Helperland/CustomerPages/BlockPros/{helperId}:
 *  post:
 *   summary: Block Service Provider
 *   description: Add or remove block service provider
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: helperId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Blocked'
 *   responses:
 *    200:
 *     description: blocked helper created successfully / helper removed from blocked list.
 *    201:
 *     description: helper added in blocked list.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: content not found / no service provider found worked with customer in past.
 *    409:
 *     description: helper already in you blocked/unblocked list.
 *    500:
 *     description: internal server error.
 *    502:
 *     description: error in adding / removing helper in blocked list or error in creating blocked helper.
 */

// Profile routes

// My details

/**
 * @swagger
 * /Helperland/CustomerPages/MyDetails:
 *  get:
 *   summary: User detail
 *   description: Display user details.
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
 * /Helperland/CustomerPages/MyDetails:
 *  put:
 *   summary: Update User detail
 *   description: edit user details to update.
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
 *     description: detail updated.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404:
 *     description: user not found.
 *    400:
 *     description: proper input not found in request.
 *    500:
 *     description: internal server error.
 */

// My Address

/**
 * @swagger
 * /Helperland/CustomerPages/MyAddress:
 *  get:
 *   summary: User addresses
 *   description: Display user addresses.
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: addresses found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: address not found for this user.
 *    400:
 *     description: proper input not found in request.
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /Helperland/CustomerPages/MyAddress/{addressId}:
 *  get:
 *   summary: User addresses
 *   description: Display user addresses.
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: addressId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: address found.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: address not found.
 *    400:
 *     description: proper input not found in request.
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /Helperland/CustomerPages/MyAddress/{addressId}:
 *  put:
 *   summary: Update address
 *   description: Change detail to update address.
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: addressId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UpdateCreateAddress'
 *   responses:
 *    201:
 *     description: address updated successfully.
 *    400:
 *     description: proper input not found in request.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: error in updating information.
 *    422:
 *     description: error in updating information.
 *    500:
 *     description: failure in finding service provider.
 */

/**
 * @swagger
 * /Helperland/CustomerPages/MyAddress:
 *  post:
 *   summary: Create address
 *   description: add new address
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UpdateCreateAddress'
 *   responses:
 *    200:
 *     description: address created successfully.
 *    400:
 *     description: proper input not found in request.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    422:
 *     description: error in creating address.
 *    500:
 *     description: internal server error.
 */

 /**
 * @swagger
 * /Helperland/CustomerPages/MyAddress/DeleteAddress/{addressId}:
 *  put:
 *   summary: Delete address
 *   description: remove address.
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: addressId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: address deleted successfully.
 *    400:
 *     description: proper input not found in request.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    422:
 *     description: error in deleting address.
 *    500:
 *     description: internal server error.
 * 
 */

 // Change Password

  /**
 * @swagger
 * /Helperland/CustomerPages/ChangePassword:
 *  put:
 *   summary: Change password
 *   description: enter old password and new password.
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
 *     description: Incorrect old password or new Password and Confirm Password must be same.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    422:
 *     description: error in changing password.
 *    500:
 *     description: internal server error.
 */


router.get('/Dashboard', loginController.validateToken, dashboardController.getDashboard);

router.get('/Dashboard/Detail/:id', celebrate(GetDashboard), loginController.validateToken, dashboardController.getSRDetail);

router.post('/RescheduleService/:serviceId', celebrate(RescheduleSR), loginController.validateToken, dashboardController.rescheduleSR, dashboardController.rescheduleByCustomer);

router.post('/CancelServiceRequest/:srId', celebrate(CancelSR), loginController.validateToken, dashboardController.cancelSR);


router.get('/ServiceHistory', loginController.validateToken, serviceHistoryController.getSRHistory);

router.get('/ServiceHistory/:id', loginController.validateToken, serviceHistoryController.getSRDetail);

router.post('/Rating/:serviceId', celebrate(Ratings), loginController.validateToken, serviceHistoryController.rateSP);


router.get('/FavoritePros', loginController.validateToken, favoriteProsController.getAllSPWorkedWithCustomer);

router.post('/FavoritePros/:helperId', celebrate(Favorite), loginController.validateToken, favoriteProsController.createFavoriteHelper, favoriteProsController.removeFavSP);

router.post('/BlockPros/:helperId', celebrate(Blocked), loginController.validateToken, favoriteProsController.blockSP, favoriteProsController.removeBlockedHelper);


router.get('/MyDetails', loginController.validateToken, profileController.getUserDetailById);

router.put('/MyDetails', celebrate(UpdateUser), loginController.validateToken, profileController.updateUserDetailById);


router.get('/MyAddress', loginController.validateToken, profileController.getUserAddressesByUserId);

router.get('/MyAddress/:addressId', loginController.validateToken, profileController.getUserAddressByAddressId);

router.put('/MyAddress/:addressId', celebrate(UpdateCreateUserAddress), loginController.validateToken, profileController.updateUserAddressByAddressId);

router.post("/MyAddress", celebrate(UpdateCreateUserAddress), loginController.validateToken, profileController.createUserAddress);

router.put("/MyAddress/DeleteAddress/:addressId", loginController.validateToken, profileController.deleteUserAddressByAddressId);


router.put("/ChangePassword", celebrate(ChangePassword), loginController.validateToken, profileController.changeUserPassword);

export = router;