"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var router = express_1.default.Router();
var dashboard_repository_1 = require("../4. Customer Pages/4.1 Dashboard/dashboard.repository");
var dashboard_service_1 = require("../4. Customer Pages/4.1 Dashboard/dashboard.service");
var dashboard_controller_1 = require("../4. Customer Pages/4.1 Dashboard/dashboard.controller");
var srhistory_repository_1 = require("../4. Customer Pages/4.2 SR History/srhistory.repository");
var srhistory_service_1 = require("../4. Customer Pages/4.2 SR History/srhistory.service");
var srhistory_controller_1 = require("../4. Customer Pages/4.2 SR History/srhistory.controller");
var favsp_repository_1 = require("../4. Customer Pages/4.3 Favorite SP/favsp.repository");
var favsp_service_1 = require("../4. Customer Pages/4.3 Favorite SP/favsp.service");
var favsp_controller_1 = require("../4. Customer Pages/4.3 Favorite SP/favsp.controller");
var profile_repository_1 = require("../4. Customer Pages/4.4 Profile/profile.repository");
var profile_service_1 = require("../4. Customer Pages/4.4 Profile/profile.service");
var profile_controller_1 = require("../4. Customer Pages/4.4 Profile/profile.controller");
var login_repository_1 = require("../2. Signup Login/2.1 Login/login.repository");
var login_service_1 = require("../2. Signup Login/2.1 Login/login.service");
var login_controller_1 = require("../2. Signup Login/2.1 Login/login.controller");
// Validation models
var dashboard_model_1 = require("../4. Customer Pages/4.1 Dashboard/dashboard.model");
var RescheduleSR = dashboard_model_1.DashboardSchema.RescheduleSR, CancelSR = dashboard_model_1.DashboardSchema.CancelSR, GetDashboard = dashboard_model_1.DashboardSchema.GetDashboard;
var srhistory_model_1 = require("../4. Customer Pages/4.2 SR History/srhistory.model");
var Ratings = srhistory_model_1.SRHistorySchema.Ratings;
var favsp_model_1 = require("../4. Customer Pages/4.3 Favorite SP/favsp.model");
var Favorite = favsp_model_1.FavSPSchema.Favorite, Blocked = favsp_model_1.FavSPSchema.Blocked;
var profile_model_1 = require("../4. Customer Pages/4.4 Profile/profile.model");
var UpdateUser = profile_model_1.ProfileSchema.UpdateUser, UpdateCreateUserAddress = profile_model_1.ProfileSchema.UpdateCreateUserAddress, ChangePassword = profile_model_1.ProfileSchema.ChangePassword;
var dashboardRepo = new dashboard_repository_1.DashboardRepository();
var dashboardService = new dashboard_service_1.DashboardService(dashboardRepo);
var dashboardController = new dashboard_controller_1.DashboardController(dashboardService);
var serviceHistoryRepo = new srhistory_repository_1.SRHistoryRepository();
var serviceHistoryService = new srhistory_service_1.SRHistoryService(serviceHistoryRepo);
var serviceHistoryController = new srhistory_controller_1.SRHistoryController(serviceHistoryService);
var favoriteProsRepo = new favsp_repository_1.FavSPRepository();
var favoriteProsService = new favsp_service_1.FavSPService(favoriteProsRepo);
var favoriteProsController = new favsp_controller_1.FavSPController(favoriteProsService);
var profileRepo = new profile_repository_1.ProfileRepository();
var profileService = new profile_service_1.ProfileService(profileRepo);
var profileController = new profile_controller_1.ProfileController(profileService);
var loginRepo = new login_repository_1.LoginRepository();
var loginService = new login_service_1.LoginService(loginRepo);
var loginController = new login_controller_1.LoginController(loginService);
// 4.1 Dashboard
router.get('/Dashboard', loginController.validateToken, dashboardController.getDashboard);
router.get('/Dashboard/SRDetail/:SRId', (0, celebrate_1.celebrate)(GetDashboard), loginController.validateToken, dashboardController.getSRDetail);
router.post('/Dashboard/RescheduleSR/:SRId', (0, celebrate_1.celebrate)(RescheduleSR), loginController.validateToken, dashboardController.rescheduleSR, dashboardController.rescheduleByCustomer);
router.post('/Dashboard/CancelSR/:SRId', (0, celebrate_1.celebrate)(CancelSR), loginController.validateToken, dashboardController.cancelSR);
// 4.2 SR History
router.get('/SRHistory', loginController.validateToken, serviceHistoryController.getSRHistory);
router.get('/SRHistory/:SRId', loginController.validateToken, serviceHistoryController.getSRDetail);
router.post('/SRHistory/Rating/:SRId', (0, celebrate_1.celebrate)(Ratings), loginController.validateToken, serviceHistoryController.rateSP);
// 4.3 Favorite SP
router.get('/PastSP', loginController.validateToken, favoriteProsController.getAllPastSP);
router.post('/FavSP/:SPId', (0, celebrate_1.celebrate)(Favorite), loginController.validateToken, favoriteProsController.createFavSP, favoriteProsController.removeFavSP);
router.post('/BlockSP/:SPId', (0, celebrate_1.celebrate)(Blocked), loginController.validateToken, favoriteProsController.blockSP, favoriteProsController.unblockedSP);
// 4.4 Profile
router.get('/MyDetails', loginController.validateToken, profileController.getUDById);
router.put('/MyDetails', (0, celebrate_1.celebrate)(UpdateUser), loginController.validateToken, profileController.updateUDById);
router.post("/MyAddress", (0, celebrate_1.celebrate)(UpdateCreateUserAddress), loginController.validateToken, profileController.createUA);
router.get('/MyAddress', loginController.validateToken, profileController.getUAsByUId);
router.get('/MyAddress/:AId', loginController.validateToken, profileController.getUAByAId);
router.put('/MyAddress/:AId', (0, celebrate_1.celebrate)(UpdateCreateUserAddress), loginController.validateToken, profileController.updateUAByAId);
router.put("/DeleteAddress/:AId", loginController.validateToken, profileController.deleteUAByAId);
router.put("/ChangePassword", (0, celebrate_1.celebrate)(ChangePassword), loginController.validateToken, profileController.changePassword);
module.exports = router;
