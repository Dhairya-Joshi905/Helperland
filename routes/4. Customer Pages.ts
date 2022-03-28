import express from "express";
import { celebrate } from "celebrate";

const router: express.Router = express.Router();

import { DashboardRepository } from "../4. Customer Pages/4.1 Dashboard/dashboard.repository";
import { DashboardService } from "../4. Customer Pages/4.1 Dashboard/dashboard.service";
import { DashboardController } from "../4. Customer Pages/4.1 Dashboard/dashboard.controller";

import { SRHistoryRepository } from "../4. Customer Pages/4.2 SR History/srhistory.repository";
import { SRHistoryService } from "../4. Customer Pages/4.2 SR History/srhistory.service";
import { SRHistoryController } from "../4. Customer Pages/4.2 SR History/srhistory.controller";

import { FavSPRepository } from "../4. Customer Pages/4.3 Favorite SP/favsp.repository";
import { FavSPService } from "../4. Customer Pages/4.3 Favorite SP/favsp.service";
import { FavSPController } from "../4. Customer Pages/4.3 Favorite SP/favsp.controller";

import { ProfileRepository } from "../4. Customer Pages/4.4 Profile/profile.repository";
import { ProfileService } from "../4. Customer Pages/4.4 Profile/profile.service";
import { ProfileController } from "../4. Customer Pages/4.4 Profile/profile.controller";

import { LoginRepository } from "../2. Signup Login/2.1 Login/login.repository";
import { LoginService } from "../2. Signup Login/2.1 Login/login.service";
import { LoginController } from "../2. Signup Login/2.1 Login/login.controller";

// Validation models
import { DashboardSchema } from "../4. Customer Pages/4.1 Dashboard/dashboard.model";
const { RescheduleSR, CancelSR, GetDashboard } = DashboardSchema;

import { SRHistorySchema } from "../4. Customer Pages/4.2 SR History/srhistory.model";
const { Ratings } = SRHistorySchema;

import { FavSPSchema } from "../4. Customer Pages/4.3 Favorite SP/favsp.model";
const { Favorite, Blocked } = FavSPSchema;

import { ProfileSchema } from "../4. Customer Pages/4.4 Profile/profile.model";
const { UpdateUser, UpdateCreateUserAddress, ChangePassword } = ProfileSchema;

const dashboardRepo: DashboardRepository = new DashboardRepository();
const dashboardService: DashboardService = new DashboardService(dashboardRepo);
const dashboardController: DashboardController = new DashboardController(dashboardService);

const serviceHistoryRepo: SRHistoryRepository = new SRHistoryRepository();
const serviceHistoryService: SRHistoryService = new SRHistoryService(serviceHistoryRepo);
const serviceHistoryController: SRHistoryController = new SRHistoryController(serviceHistoryService);

const favoriteProsRepo: FavSPRepository = new FavSPRepository();
const favoriteProsService: FavSPService = new FavSPService(favoriteProsRepo);
const favoriteProsController: FavSPController = new FavSPController(favoriteProsService);

const profileRepo: ProfileRepository = new ProfileRepository();
const profileService: ProfileService = new ProfileService(profileRepo);
const profileController: ProfileController = new ProfileController(profileService);

const loginRepo: LoginRepository = new LoginRepository();
const loginService: LoginService = new LoginService(loginRepo);
const loginController: LoginController = new LoginController(loginService);

// 4.1 Dashboard
router.get('/Dashboard', loginController.validateToken, dashboardController.getDashboard);

router.get('/Dashboard/SRDetail/:SRId', celebrate(GetDashboard), loginController.validateToken, dashboardController.getSRDetail);

router.post('/Dashboard/RescheduleSR/:SRId', celebrate(RescheduleSR), loginController.validateToken, dashboardController.rescheduleSR, dashboardController.rescheduleByCustomer);

router.post('/Dashboard/CancelSR/:SRId', celebrate(CancelSR), loginController.validateToken, dashboardController.cancelSR);

// 4.2 SR History
router.get('/SRHistory', loginController.validateToken, serviceHistoryController.getSRHistory);

router.get('/SRHistory/:SRId', loginController.validateToken, serviceHistoryController.getSRDetail);

router.post('/SRHistory/Rating/:SRId', celebrate(Ratings), loginController.validateToken, serviceHistoryController.rateSP);

// 4.3 Favorite SP
router.get('/PastSP', loginController.validateToken, favoriteProsController.getAllPastSP);

router.post('/FavSP/:SPId', celebrate(Favorite), loginController.validateToken, favoriteProsController.createFavSP, favoriteProsController.removeFavSP);

router.post('/BlockSP/:SPId', celebrate(Blocked), loginController.validateToken, favoriteProsController.blockSP, favoriteProsController.unblockedSP);

// 4.4 Profile
router.get('/MyDetails', loginController.validateToken, profileController.getUDById);

router.put('/MyDetails', celebrate(UpdateUser), loginController.validateToken, profileController.updateUDById);


router.post("/MyAddress", celebrate(UpdateCreateUserAddress), loginController.validateToken, profileController.createUA);

router.get('/MyAddress', loginController.validateToken, profileController.getUAsByUId);

router.get('/MyAddress/:AId', loginController.validateToken, profileController.getUAByAId);

router.put('/MyAddress/:AId', celebrate(UpdateCreateUserAddress), loginController.validateToken, profileController.updateUAByAId);

router.put("/DeleteAddress/:AId", loginController.validateToken, profileController.deleteUAByAId);


router.put("/ChangePassword", celebrate(ChangePassword), loginController.validateToken, profileController.changePassword);

export = router;