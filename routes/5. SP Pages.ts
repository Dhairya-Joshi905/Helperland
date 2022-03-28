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

// Do something
// router.get("/SRHistoryDownload", loginController.validateToken, serviceHistoryController.exportDataInExcelFormat);

// Ratings
router.get("/SPRatings", loginController.validateToken, serviceHistoryController.getSPRating);

// Block Unblock Customer
router.get("/PastCustomers", loginController.validateToken, blockCustomerController.PastCustomersOfSP);

router.put("/BlockUnblockCustomer/:UserId", celebrate(Blocked), loginController.validateToken, blockCustomerController.BlockCustomer, blockCustomerController.UnblockCustomer);

// My settings
router.get("/MyDetails", loginController.validateToken, mySettingsController.getUDById);

router.put("/MyDetails", celebrate(UpdateUser), loginController.validateToken, mySettingsController.updateUDById, mySettingsController.CreateUpdateAddress);

router.put("/ChangePassword", celebrate(ChangePassword), loginController.validateToken, mySettingsController.changePassword);

export = router;