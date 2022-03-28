"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var newSR_repository_1 = require("../5. SP Pages/5.1 New SR/newSR.repository");
var newSR_service_1 = require("../5. SP Pages/5.1 New SR/newSR.service");
var newSR_controller_1 = require("../5. SP Pages/5.1 New SR/newSR.controller");
var upcomingSR_repository_1 = require("../5. SP Pages/5.2 Upcoming SR/upcomingSR.repository");
var upcomingSR_service_1 = require("../5. SP Pages/5.2 Upcoming SR/upcomingSR.service");
var upcomingSR_controller_1 = require("../5. SP Pages/5.2 Upcoming SR/upcomingSR.controller");
var SRHistory_repository_1 = require("../5. SP Pages/5.4 SR History/SRHistory.repository");
var SRHistory_controller_1 = require("../5. SP Pages/5.4 SR History/SRHistory.controller");
var SRHistory_service_1 = require("../5. SP Pages/5.4 SR History/SRHistory.service");
var blockUser_repository_1 = require("../5. SP Pages/5.6 Block User/blockUser.repository");
var blockUser_service_1 = require("../5. SP Pages/5.6 Block User/blockUser.service");
var blockUser_controller_1 = require("../5. SP Pages/5.6 Block User/blockUser.controller");
var mySettings_repository_1 = require("../5. SP Pages/5.7 My Settings/mySettings.repository");
var mySettings_service_1 = require("../5. SP Pages/5.7 My Settings/mySettings.service");
var mySettings_controller_1 = require("../5. SP Pages/5.7 My Settings/mySettings.controller");
var login_repository_1 = require("../2. Signup Login/2.1 Login/login.repository");
var login_service_1 = require("../2. Signup Login/2.1 Login/login.service");
var login_controller_1 = require("../2. Signup Login/2.1 Login/login.controller");
var mySettings_model_1 = require("../5. SP Pages/5.7 My Settings/mySettings.model");
var UpdateUser = mySettings_model_1.MySettingsSchema.UpdateUser, ChangePassword = mySettings_model_1.MySettingsSchema.ChangePassword;
var blockUser_model_1 = require("../5. SP Pages/5.6 Block User/blockUser.model");
var Blocked = blockUser_model_1.BlockCustomerSchema.Blocked;
var router = express_1.default.Router();
var serviceRequestRepo = new newSR_repository_1.SRRepository();
var serviceRequestService = new newSR_service_1.SRService(serviceRequestRepo);
var serviceRequestController = new newSR_controller_1.SRController(serviceRequestService);
var upcomingServiceRepo = new upcomingSR_repository_1.UpcomingServicesRepository();
var upcomingService = new upcomingSR_service_1.UpcomingService(upcomingServiceRepo);
var upcomingServiceController = new upcomingSR_controller_1.UpcomingServiceController(upcomingService);
var serviceHistoryRepo = new SRHistory_repository_1.ServiceHistoryRepository();
var serviceHistoryService = new SRHistory_service_1.SRHistoryService(serviceHistoryRepo);
var serviceHistoryController = new SRHistory_controller_1.SRHistoryController(serviceHistoryService);
var blockCustomerRepo = new blockUser_repository_1.BlockCustomerRepository();
var blockCustomerService = new blockUser_service_1.BlockCustomerService(blockCustomerRepo);
var blockCustomerController = new blockUser_controller_1.BlockCustomerController(blockCustomerService);
var mySettingsRepo = new mySettings_repository_1.MySettingsRepository();
var mySettingsService = new mySettings_service_1.MySettingsService(mySettingsRepo);
var mySettingsController = new mySettings_controller_1.MySettingsController(mySettingsService);
var loginRepo = new login_repository_1.LoginRepository();
var loginService = new login_service_1.LoginService(loginRepo);
var loginController = new login_controller_1.LoginController(loginService);
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
// Do something
// router.get("/SRHistoryDownload", loginController.validateToken, serviceHistoryController.exportDataInExcelFormat);
// Ratings
router.get("/SPRatings", loginController.validateToken, serviceHistoryController.getSPRating);
// Block Unblock Customer
router.get("/PastCustomers", loginController.validateToken, blockCustomerController.PastCustomersOfSP);
router.put("/BlockUnblockCustomer/:UserId", (0, celebrate_1.celebrate)(Blocked), loginController.validateToken, blockCustomerController.BlockCustomer, blockCustomerController.UnblockCustomer);
// My settings
router.get("/MyDetails", loginController.validateToken, mySettingsController.getUDById);
router.put("/MyDetails", (0, celebrate_1.celebrate)(UpdateUser), loginController.validateToken, mySettingsController.updateUDById, mySettingsController.CreateUpdateAddress);
router.put("/ChangePassword", (0, celebrate_1.celebrate)(ChangePassword), loginController.validateToken, mySettingsController.changePassword);
module.exports = router;
