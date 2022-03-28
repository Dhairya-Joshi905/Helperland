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
exports.SRHistoryController = void 0;
// import jwt from "jsonwebtoken";
var mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
var mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: process.env.MAILGUN_DOMAIN,
});
var SRHistoryController = /** @class */ (function () {
    function SRHistoryController(SRHistoryService) {
        var _this = this;
        this.SRHistoryService = SRHistoryService;
        this.getSRHistory = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.SRHistoryService
                        .getSRHistory(parseInt(req.body.userId))
                        .then(function (SRHistoryArray) {
                        if (SRHistoryArray) {
                            if (SRHistoryArray.length > 0) {
                                var pastDateHistory = _this.SRHistoryService.compareWithCurrentDate(SRHistoryArray);
                                if (SRHistoryArray.length > 0)
                                    return res.status(200).json(pastDateHistory);
                                else
                                    return res.status(404).json({ message: 'No SR history found.' });
                            }
                            else
                                return res.status(404).json({ message: 'No SR history found.' });
                        }
                        else
                            return res.status(404).json({ message: 'No SR history found.' });
                    })
                        .catch(function (err) {
                        console.log(err);
                        return res.status(500).json({ error: err });
                    })];
            });
        }); };
        this.getSRDetail = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var SRId;
            return __generator(this, function (_a) {
                SRId = parseInt(req.params.SRId);
                if (req.body.userTypeId === 4)
                    return [2 /*return*/, this.SRHistoryService
                            .getSRDetail(SRId)
                            .then(function (SRDetail) {
                            if ((SRDetail === null || SRDetail === void 0 ? void 0 : SRDetail.UserId) === req.body.userId)
                                return res.status(200).json(SRDetail);
                            else
                                return res.status(404).json({ message: "No service request detail found for this request" });
                        })
                            .catch(function (err) { return res.status(500).json({ error: err }); })];
                else
                    return [2 /*return*/, res.status(401).json({ message: "Unauthorised User" })];
                return [2 /*return*/];
            });
        }); };
        this.rateSP = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var SRId;
            var _this = this;
            return __generator(this, function (_a) {
                SRId = parseInt(req.params.SRId);
                req.body.RatingDate = new Date();
                return [2 /*return*/, this.SRHistoryService
                        .getRatingBySRId(SRId)
                        // Cannot find name 'Rating'.ts(2304)
                        .then(function (ratings) {
                        if (ratings)
                            return res.status(201).json({ message: 'ratings already set for this service request' });
                        else {
                            if (req.params.SRId)
                                return _this.SRHistoryService
                                    .getSRDetail(SRId)
                                    .then(function (SR) {
                                    if (SR) {
                                        req.body.ServiceRequestId = SR.ServiceRequestId;
                                        if (req.body.userTypeId === 4 && req.body.userId === SR.UserId) {
                                            req.body.RatingFrom = SR.UserId;
                                            if (SR.Status === 3 && SR.ServiceProviderId) {
                                                req.body.RatingTo = SR.ServiceProviderId;
                                                req.body.Ratings = _this.SRHistoryService.getRating(req.body);
                                                return _this.SRHistoryService
                                                    .giveRating(req.body)
                                                    .then(function (rating) {
                                                    return res.status(200).json(rating);
                                                })
                                                    .catch(function (err) { return res.status(500).json({ error: err }); });
                                            }
                                            else
                                                return res.status(400).json({ message: 'SP not found or SR status is not 3.' });
                                        }
                                        else
                                            return res.status(401).json({ message: 'unauthorised user' });
                                    }
                                    else
                                        return res.status(404).json({ message: 'No SR found' });
                                })
                                    .catch(function (err) { return res.status(500).json({ error: err }); });
                            else
                                return res.status(404).json({ message: 'No SR Id found' });
                        }
                    })
                        .catch(function (err) { return res.status(500).json({ error: err }); })];
            });
        }); };
        this.SRHistoryService = SRHistoryService;
    }
    return SRHistoryController;
}());
exports.SRHistoryController = SRHistoryController;
