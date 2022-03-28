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
const { EditRescheduleSR } = NewServiceRequestSchema;

const router: express.Router = express.Router();

const serviceRequestRepo: ServiceRequestRepository = new ServiceRequestRepository();
const serviceRequestService: ServiceRequestService = new ServiceRequestService(serviceRequestRepo);
const serviceRequestController: ServiceRequestController = new ServiceRequestController(serviceRequestService);

const userManagementRepo: UserManagementRepository = new UserManagementRepository();
const userManagementService: UserManagementService = new UserManagementService(userManagementRepo);
const userManagementController: UserManagementController =new UserManagementController(userManagementService);

const loginRepo: LoginRepository = new LoginRepository();
const loginService: LoginService = new LoginService(loginRepo);
const loginController: LoginController = new LoginController(loginService);

// Service Requests
router.get('/ServiceRequest', loginController.validateToken, serviceRequestController.getAllSR);

router.post('/SRList', loginController.validateToken, serviceRequestController.filteredSR);

router.get('/CancelSR/:requestId', loginController.validateToken, serviceRequestController.cancelSR);

router.post('/EditSR', celebrate(EditRescheduleSR), loginController.validateToken, serviceRequestController.editSR, serviceRequestController.rescheduleSR);

// User Management
router.get('/Users', loginController.validateToken, userManagementController.getAllUsers);

router.put('/AtiveInactiveUser/:userId', loginController.validateToken, userManagementController.activeInactiveUser);

export = router;