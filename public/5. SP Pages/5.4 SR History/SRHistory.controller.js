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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SRHistoryController = void 0;
require("dotenv").config();
var SRHistoryController = /** @class */ (function () {
    function SRHistoryController(serviceHistoryService) {
        var _this = this;
        this.serviceHistoryService = serviceHistoryService;
        this.getSRHistory = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceHistoryService
                        .getSPSRHistory(parseInt(req.body.userId))
                        .then(function (SRHistory) { return __awaiter(_this, void 0, void 0, function () {
                        var pastDateHistory, historyData;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!SRHistory) return [3 /*break*/, 6];
                                    if (!(SRHistory.length > 0)) return [3 /*break*/, 4];
                                    pastDateHistory = this.serviceHistoryService.compareWithCurrentDate(SRHistory);
                                    if (!(SRHistory.length > 0)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.serviceHistoryService.gethistoryForDisplay(pastDateHistory)];
                                case 1:
                                    historyData = _a.sent();
                                    if (historyData.length > 0)
                                        return [2 /*return*/, res.status(200).json(historyData)];
                                    else
                                        return [2 /*return*/, res.status(404).json({ message: 'Service request history not found in past' })];
                                    return [3 /*break*/, 3];
                                case 2: return [2 /*return*/, res.status(404).json({ message: 'Service request history not found in past' })];
                                case 3: return [3 /*break*/, 5];
                                case 4: return [2 /*return*/, res.status(404).json({ message: 'Service request history empty' })];
                                case 5: return [3 /*break*/, 7];
                                case 6: return [2 /*return*/, res.status(404).json({ message: 'Service request not found' })];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })
                        .catch(function (err) { return res.status(500).json({ error: err }); })];
            });
        }); };
        this.getSRDetailById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var Id;
            return __generator(this, function (_a) {
                Id = parseInt(req.params.SRId);
                if (req.body.userTypeId === 3)
                    return [2 /*return*/, this.serviceHistoryService
                            .getServiceRequestDetailById(Id)
                            .then(function (SRDetail) {
                            // Why this question mark?
                            if ((SRDetail === null || SRDetail === void 0 ? void 0 : SRDetail.ServiceProviderId) === req.body.userId)
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
        // public exportDataInExcelFormat: RequestHandler = async (req: Request, res: Response): Promise<Response|void> => {
        //   let exportHistory: Object[] = [];
        //   return this.serviceHistoryService
        //     .getSPSRHistory(parseInt(req.body.userId))
        //     .then(async requestHistory => {
        //       if (requestHistory) {
        //         if (requestHistory.length>0){
        //           const pastDateHistory = this.serviceHistoryService.compareWithCurrentDate(requestHistory);
        //           if (requestHistory.length>0){
        //             exportHistory = await this.serviceHistoryService.getDatForExport(pastDateHistory);
        //             let workbook = new exceljs.Workbook();
        //             let worksheet = workbook.addWorksheet("history");
        //             worksheet.columns = [
        //               { header: "ServiceId" ,   key: "ServiceId", width: 25 },
        //               { header: "StartDate" ,   key: "StartDate", width: 25 },
        //               { header: "Customer"  ,   key: "Customer" , width: 25 },
        //               { header: "Payment"   ,   key: "Payment"  , width: 10 },
        //             ];
        //             worksheet.addRows(exportHistory);
        //             res.setHeader(
        //               "Content-Type",
        //               "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        //             );
        //             res.setHeader(
        //               "Content-Disposition",
        //               "attachment; filename=" + "history.xlsx"
        //             );
        //             return workbook.xlsx.write(res).then((err) => res.status(200).end());
        //           }
        //           else return res.status(404).json({ message: 'No data to export' });
        //         }
        //         else return res.status(404).json({ message: 'No data to export' });
        //       }
        //       else return res.status(404).json({ message: 'No data to export' });
        //     })
        //     .catch((err: Error) => res.status(500).json({error: err}));
        // };
        this.getSPRating = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.userTypeId === 3 && req.body.userId)
                    return [2 /*return*/, this.serviceHistoryService
                            .getRatingsOfHelper(req.body.userId)
                            .then(function (ratings) { return __awaiter(_this, void 0, void 0, function () {
                            var displaydate;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!ratings) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.serviceHistoryService.getRatingsForDisplay(ratings)];
                                    case 1:
                                        displaydate = _a.sent();
                                        if (displaydate.length > 0)
                                            return [2 /*return*/, res.status(200).json(displaydate)];
                                        else
                                            return [2 /*return*/, res.status(404).json({ message: "No ratings yet." })];
                                        return [3 /*break*/, 3];
                                    case 2: return [2 /*return*/, res.status(404).json({ message: "ratings not found" })];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })
                            .catch(function (err) {
                            // console.log(err);
                            return res.status(500).json({ error: err });
                        })];
                else
                    return [2 /*return*/, res.status(401).json({ message: "Unauthorised User" })];
                return [2 /*return*/];
            });
        }); };
        this.serviceHistoryService = serviceHistoryService;
    }
    return SRHistoryController;
}());
exports.SRHistoryController = SRHistoryController;
