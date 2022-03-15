"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
var mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
var mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: process.env.MAILGUN_DOMAIN,
});
var DashboardController = /** @class */ (function () {
    function DashboardController(dashboardService) {
        var _this = this;
        this.dashboardService = dashboardService;
        this.getDashboard = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // console.log(req.body);
                // let request: ServiceRequest[] = [];
                if (req.body.userTypeId === 4)
                    return [2 /*return*/, this.dashboardService
                            .getDashboard(req.body.userId)
                            .then(function (serviceRequestArray) {
                            if (serviceRequestArray) {
                                if (serviceRequestArray.length > 0)
                                    return res.status(200).json(serviceRequestArray);
                                else
                                    return res.status(404).json({ message: "No pending service request found" });
                            }
                            else
                                return res.status(404).json({ message: "No service request found for this user" });
                        })
                            .catch(function (err) {
                            console.log(err);
                            return res.status(500).json({ error: err });
                        })];
                else
                    return [2 /*return*/, res.status(401).json({ message: "Unauthorised User" })];
                return [2 /*return*/];
            });
        }); };
        this.getSRDetail = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var Id;
            return __generator(this, function (_a) {
                Id = parseInt(req.params.id);
                if (req.body.userTypeId === 4)
                    return [2 /*return*/, this.dashboardService
                            .getSRDetail(Id)
                            .then(function (serviceRequestDetail) {
                            if ((serviceRequestDetail === null || serviceRequestDetail === void 0 ? void 0 : serviceRequestDetail.UserId) === req.body.userId)
                                return res.status(200).json(serviceRequestDetail);
                            else
                                return res.status(404).json({ message: "No service request detail found for this request" });
                        })
                            .catch(function (err) {
                            console.log(err);
                            return res.status(500).json({ error: err });
                        })];
                else
                    return [2 /*return*/, res.status(401).json({ message: "Unauthorised User" })];
                return [2 /*return*/];
            });
        }); };
        this.rescheduleSR = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var serviceId, greaterThanPresentTime;
            var _this = this;
            return __generator(this, function (_a) {
                serviceId = req.params.serviceId;
                greaterThanPresentTime = this.dashboardService.compareWithCurrentDate(req.body.date);
                if (greaterThanPresentTime) {
                    if (req.body.userTypeId === 4)
                        return [2 /*return*/, this.dashboardService
                                .getSRDetail(parseInt(serviceId))
                                .then(function (serviceRequest) {
                                if (serviceRequest) {
                                    req.body.totalHour = serviceRequest.ExtraHours + serviceRequest.ServiceHours;
                                    if (serviceRequest.UserId === req.body.userId) {
                                        if (serviceRequest.ServiceProviderId) {
                                            req.body.spId = serviceRequest.ServiceProviderId;
                                            return _this.dashboardService
                                                .getSPDashboard(serviceRequest.ServiceProviderId)
                                                .then(function (serviceRequestArray) { return __awaiter(_this, void 0, void 0, function () {
                                                var _a, srDate, matched, startTime, endTime;
                                                return __generator(this, function (_b) {
                                                    switch (_b.label) {
                                                        case 0:
                                                            if (!serviceRequestArray) return [3 /*break*/, 2];
                                                            return [4 /*yield*/, this.dashboardService.isSPBusy(req.body.date, serviceRequestArray, req.body.totalHour, req.body.time)];
                                                        case 1:
                                                            _a = _b.sent(), srDate = _a.srDate, matched = _a.matched, startTime = _a.startTime, endTime = _a.endTime;
                                                            if (matched)
                                                                return [2 /*return*/, res.status(200).json({
                                                                        message: "Service provider is busy with another service request on " + srDate + " from " + startTime + " to " + endTime +
                                                                            ". Either choose another date or schedule on a different time."
                                                                    })];
                                                            else
                                                                next();
                                                            return [3 /*break*/, 3];
                                                        case 2:
                                                            next();
                                                            _b.label = 3;
                                                        case 3: return [2 /*return*/];
                                                    }
                                                });
                                            }); })
                                                .catch(function (err) {
                                                return res.status(500).json({ error: err });
                                            });
                                        }
                                        else
                                            next();
                                    }
                                    else
                                        return res.status(404).json({ message: "No data found" });
                                }
                                else
                                    return res.status(404).json({ message: "Service request not found" });
                            })
                                .catch(function (err) {
                                console.log(err);
                                return res.status(500).json({ error: err });
                            })];
                    else
                        return [2 /*return*/, res.status(401).json({ message: "Unauthorised User" })];
                }
                else
                    return [2 /*return*/, res.status(400).json({ message: "Entered time is less than or equal to present time." })];
                return [2 /*return*/];
            });
        }); };
        this.rescheduleByCustomer = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var date, spId;
            var _this = this;
            return __generator(this, function (_a) {
                date = req.body.date.split("-").reverse().join("-");
                spId = req.body.spId;
                if (req.params.serviceId)
                    return [2 /*return*/, this.dashboardService
                            .rescheduleSR(new Date(date), req.body.time, parseInt(req.params.serviceId))
                            .then(function (serviceRequestArray) {
                            if (serviceRequestArray.length > 0) {
                                if (spId)
                                    return _this.dashboardService
                                        .getSPById(spId)
                                        .then(function (serviceProvider) {
                                        if (serviceProvider === null || serviceProvider === void 0 ? void 0 : serviceProvider.Email) {
                                            var data = _this.dashboardService.createEmailData(req.body.date, req.body.time, serviceProvider.Email, req.params.serviceId);
                                            mg.messages().send(data, function (err, body) {
                                                if (err)
                                                    return res.json({ error: err.message });
                                            });
                                            return res.status(200).json({ message: "Sevice Request reschedule successful." });
                                        }
                                        else
                                            return res.status(404).json({ message: "No Service Provider found with this email." });
                                    })
                                        .catch(function (err) {
                                        console.log(err);
                                        return res.status(500).json({ error: err });
                                    });
                                return res.status(200).json({ message: "Sevice Request reschedule successful." });
                            }
                            else
                                return res.status(422).json({ message: 'serviceRequestArray is empty' });
                        })
                            .catch(function (err) {
                            console.log(err);
                            return res.status(500).json({ error: err });
                        })];
                else
                    return [2 /*return*/, res.status(404).json({ message: "service request id not found" })];
                return [2 /*return*/];
            });
        }); };
        this.cancelSR = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var srId;
            var _this = this;
            return __generator(this, function (_a) {
                srId = req.params.srId;
                if (srId)
                    return [2 /*return*/, this.dashboardService
                            .getSRDetail(parseInt(srId))
                            .then(function (serviceRequest) {
                            if (serviceRequest) {
                                if (serviceRequest.Status === 4)
                                    return res.status(201).json({ message: "service request already canceled" });
                                else if (serviceRequest.Status === 3)
                                    return res.status(201).json({ message: "completed service request can not canceled" });
                                else {
                                    if (serviceRequest.UserId === req.body.userId)
                                        return _this.dashboardService
                                            .updateSRStatus(parseInt(srId))
                                            .then(function (serviceRequestArray) {
                                            if (serviceRequestArray.length > 0) {
                                                if (serviceRequest.ServiceProviderId)
                                                    return _this.dashboardService
                                                        .getSPById(serviceRequest.ServiceProviderId)
                                                        .then(function (serviceProvider) {
                                                        if (serviceProvider === null || serviceProvider === void 0 ? void 0 : serviceProvider.Email) {
                                                            var data = _this.dashboardService.cancelRequestData(serviceProvider.Email, srId);
                                                            mg.messages().send(data, function (err, body) {
                                                                if (err)
                                                                    return res.json({ error: err.message });
                                                            });
                                                            return res.status(200).json({ message: "Service Request cancelled successfully." });
                                                        }
                                                        else
                                                            return res.status(404).json({ message: "No Service Provider found with this email." });
                                                    })
                                                        .catch(function (err) {
                                                        console.log(err);
                                                        return res.status(500).json({ error: err });
                                                    });
                                                else
                                                    return res.status(201).json({ message: "service request cancelled successfully" });
                                            }
                                            else
                                                return res.status(422).json({ message: "error in canceling service request" });
                                        })
                                            .catch(function (err) {
                                            console.log(err);
                                            return res.status(500).json({ error: err });
                                        });
                                    else
                                        return res.status(401).json({ message: "unauthorised user" });
                                }
                            }
                            else
                                return res.status(404).json({ message: "service request not found" });
                        })
                            .catch(function (err) {
                            console.log(err);
                            return res.status(500).json({ error: err });
                        })];
                else
                    return [2 /*return*/, res.status(404).json({ message: "service request id not found" })];
                return [2 /*return*/];
            });
        }); };
        this.dashboardService = dashboardService;
    }
    return DashboardController;
}());
exports.DashboardController = DashboardController;
