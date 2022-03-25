import express from "express";
import { celebrate } from "celebrate";


import { ServiceRequestRepository } from "../6. Admin Screens/6.1 Service Requests/serviceRequests.repository";
import { ServiceRequestService } from "../6. Admin Screens/6.1 Service Requests/serviceRequests.service";
import { ServiceRequestController } from "../6. Admin Screens/6.1 Service Requests/serviceRequests.controller";

import { UserManagementRepository } from "../6. Admin Screens/6.2 Users Management/usersManagement.repository";
import { UserManagementService } from "../6. Admin Screens/6.2 Users Management/usersManagement.service";
import { UserManagementController } from "../6. Admin Screens/6.2 Users Management/usersManagement.controller";

import { LoginRepository } from "../2. Signup Login/2.1 Login/login.repository";
import { LoginService } from "../2. Signup Login/2.1 Login/login.service";
import { LoginController } from "../2. Signup Login/2.1 Login/login.controller";

import { NewServiceRequestSchema} from "../6. Admin Screens/6.1 Service Requests/serviceRequests.model";
const {EditRescheduleSR} = NewServiceRequestSchema


const router: express.Router = express.Router();

const serviceRequestRepo: ServiceRequestRepository = new ServiceRequestRepository();
const serviceRequestService: ServiceRequestService = new ServiceRequestService(
serviceRequestRepo);
const serviceRequestController: ServiceRequestController =new ServiceRequestController(serviceRequestService);

const userManagementRepo: UserManagementRepository = new UserManagementRepository();
const userManagementService: UserManagementService = new UserManagementService(
    userManagementRepo);
const userManagementController: UserManagementController =new UserManagementController(userManagementService);

const loginRepo: LoginRepository = new LoginRepository();
const loginService: LoginService = new LoginService(loginRepo);
const loginController: LoginController = new LoginController(loginService);



// Service Requests
router.get(
    '/service-requests',
    loginController.validateToken,
    serviceRequestController.getAllServiceRequests
);

router.post(
    '/service-requests/list',
    loginController.validateToken,
    serviceRequestController.filteredServiceRequests
);

router.get(
    '/cancel-service-request/:requestId',
    loginController.validateToken,
    serviceRequestController.cancelServiceRequest
);

router.post(
    '/service-request/edit',
    celebrate(EditRescheduleSR),
    loginController.validateToken,
    serviceRequestController.editServiceRequest,
    serviceRequestController.rescheduleServiceRequest
);

// User Management
router.get(
    '/users',
    loginController.validateToken,
    userManagementController.getAllUsers
);

router.put(
    '/active-inactive-user/:userId',
    loginController.validateToken,
    userManagementController.activeInactiveUser
);



/**
 *@swagger
 * definitions:
 *  Active:
 *   type: object
 *   properties:
 *    Active:
 *     type: boolean
 *     example: 'true'
 *  Filters:
 *   type: object
 *   properties:
 *    ServiceRequestId:
 *     type: integer
 *     description: service request id
 *     example: 1 
 *    Status:
 *     type: string
 *     description: status
 *     example: 'Pending'
 *    PostalCode:
 *     type: string
 *     description: zipcode
 *     example: '395006'
 *    Email:
 *     type: string
 *     description: email of the user
 *     example: 'yashvantdesai7@gmail.com'
 *    UserId:
 *     type: integer
 *     description: user id
 *     example: 1
 *    ServiceProviderId:
 *     type: integer
 *     description: service provider id
 *     example: 3
 *    HasIssue:
 *     type: boolean
 *     example: 'false'
 *    FromDate:
 *     type: string
 *     description: from date
 *     example: "17-03-2022"
 *    ToDate:
 *     type: string
 *     description: to date
 *     example: "30-10-2022"
 *  EditReschedule:
 *   type: object
 *   properties:
 *    Addressline1:
 *     type: string
 *     description: address
 *     example: 'New Shaktivijay'
 *    Addressline2:
 *     type: string
 *     description: house number
 *     example: '44'
 *    City:
 *     type: string
 *     description: city
 *     example: 'Surat'
 *    Notes:
 *     type: string
 *     description: notes
 *     example: 'notes'
 *    PostalCode:
 *     type: string
 *     description: zipcode
 *     example: '395006'
 *    RescheduleReason:
 *     type: string
 *     description: reschedule reason
 *     example: 'reason'
 *    ServiceRequestId:
 *     type: integer
 *     description: service request id
 *     example: 9
 *    ServiceStartDate:
 *     type: string
 *     description: service start date
 *     example: "16/03/2022"
 *    ServiceTime:
 *     type: string
 *     description: service start time
 *     example: "17:30" 
 */



 //all service requests
 /**
 * @swagger
 * /trainee2021/admin/service-requests:
 *  get:
 *   summary: All serivce requests 
 *   description: Service requests
 *   tags: 
 *    - Admin Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: service requests.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404:
 *     description: service requests not found.
 *    500:
 *     description: internal server error.
 */

 //filter service requests
/**
 * @swagger
 * /trainee2021/admin/service-requests/list:
 *  post:
 *   summary: Filter service requests
 *   description: apply filters
 *   tags: 
 *    - Admin Screens
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Filters'
 *   responses:
 *    200:
 *     description: sevice requests.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: service requests not found.
 *    500:
 *     description: internal server error.
 * 
 */


//Cancel service request
 /**
 * @swagger
 * /trainee2021/admin/cancel-service-request/{requestId}:
 *  get:
 *   summary: Cancel Service request
 *   description: feedback
 *   tags: 
 *    - Admin Screens
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
 *     description: service request cancelled successfully.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token or completed service request can not cancel or service request already cancelled / refunded.
 *    404:
 *     description: service request not found.
 *    422:
 *     description: error in canceling service or ServiceRequestId not found in request request.
 *    500:
 *     description: internal server error.
 * 
 */

 //filter service requests
/**
 * @swagger
 * /trainee2021/admin/service-request/edit:
 *  post:
 *   summary: Edit service request
 *   description: change detail to update service request
 *   tags: 
 *    - Admin Screens
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/EditReschedule'
 *   responses:
 *    200:
 *     description: service request updated successfully or service request address updated successfully.
 *    201: 
 *     description: no change in service request.
 *    400: 
 *     description: enter future date for reschedule service request.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    422: 
 *     description: error in rescheduling service request.
 *    500:
 *     description: internal server error.
 * 
 */


 //all users
 /**
 * @swagger
 * /trainee2021/admin/users:
 *  get:
 *   summary: All users
 *   description: users
 *   tags: 
 *    - Admin Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: users.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404:
 *     description: users not found.
 *    500:
 *     description: internal server error.
 */

 //all users
 /**
 * @swagger
 * /trainee2021/admin/active-inactive-user/{userId}:
 *  put:
 *   summary: All users
 *   description: users
 *   tags: 
 *    - Admin Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: userId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Active'
 *   responses:
 *    200:
 *     description: user activated/inactivated successfully.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404:
 *     description: user account already active/inactive or user not found.
 *    422: 
 *     description: error in  activating/inactivating user.
 *    500:
 *     description: internal server error.
 */

export = router;