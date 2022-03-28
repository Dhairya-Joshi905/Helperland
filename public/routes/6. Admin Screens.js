"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var serviceRequests_repository_1 = require("../6. Admin Screens/6.1 Service Requests/serviceRequests.repository");
var serviceRequests_service_1 = require("../6. Admin Screens/6.1 Service Requests/serviceRequests.service");
var serviceRequests_controller_1 = require("../6. Admin Screens/6.1 Service Requests/serviceRequests.controller");
var usersManagement_repository_1 = require("../6. Admin Screens/6.2 Users Management/usersManagement.repository");
var usersManagement_service_1 = require("../6. Admin Screens/6.2 Users Management/usersManagement.service");
var usersManagement_controller_1 = require("../6. Admin Screens/6.2 Users Management/usersManagement.controller");
var login_repository_1 = require("../2. Signup Login/2.1 Login/login.repository");
var login_service_1 = require("../2. Signup Login/2.1 Login/login.service");
var login_controller_1 = require("../2. Signup Login/2.1 Login/login.controller");
var serviceRequests_model_1 = require("../6. Admin Screens/6.1 Service Requests/serviceRequests.model");
var EditRescheduleSR = serviceRequests_model_1.NewServiceRequestSchema.EditRescheduleSR;
var router = express_1.default.Router();
var serviceRequestRepo = new serviceRequests_repository_1.ServiceRequestRepository();
var serviceRequestService = new serviceRequests_service_1.ServiceRequestService(serviceRequestRepo);
var serviceRequestController = new serviceRequests_controller_1.ServiceRequestController(serviceRequestService);
var userManagementRepo = new usersManagement_repository_1.UserManagementRepository();
var userManagementService = new usersManagement_service_1.UserManagementService(userManagementRepo);
var userManagementController = new usersManagement_controller_1.UserManagementController(userManagementService);
var loginRepo = new login_repository_1.LoginRepository();
var loginService = new login_service_1.LoginService(loginRepo);
var loginController = new login_controller_1.LoginController(loginService);
// Service Requests
router.get('/ServiceRequest', loginController.validateToken, serviceRequestController.getAllSR);
router.post('/SRList', loginController.validateToken, serviceRequestController.filteredSR);
router.get('/CancelSR/:requestId', loginController.validateToken, serviceRequestController.cancelSR);
router.post('/EditSR', (0, celebrate_1.celebrate)(EditRescheduleSR), loginController.validateToken, serviceRequestController.editSR, serviceRequestController.rescheduleSR);
// User Management
router.get('/Users', loginController.validateToken, userManagementController.getAllUsers);
router.put('/AtiveInactiveUser/:userId', loginController.validateToken, userManagementController.activeInactiveUser);
module.exports = router;
