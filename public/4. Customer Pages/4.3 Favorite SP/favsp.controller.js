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
exports.FavSPController = void 0;
var mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
var mg = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: process.env.MAILGUN_DOMAIN,
});
var FavSPController = /** @class */ (function () {
    function FavSPController(favSPService) {
        var _this = this;
        this.favSPService = favSPService;
        this.getAllPastSP = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.userId && req.body.userTypeId === 4) {
                    return [2 /*return*/, this.favSPService
                            .getAllSRByUserId(req.body.userId)
                            .then(function (SRArray) {
                            var SPId = _this.favSPService.getAllPastSPId(SRArray);
                            if (SPId.length > 0)
                                return _this.favSPService
                                    .getAllPastSP(SPId)
                                    .then(function (SPArray) {
                                    if (SPArray && SPArray.length > 0)
                                        return res.status(200).json(SPArray);
                                    else
                                        return res.status(404).json({ message: "no past sp found" });
                                })
                                    .catch(function (err) {
                                    console.log('Hello1');
                                    console.log(err);
                                    return res.status(500).json({ error: err });
                                });
                            else
                                return res.status(404).json({ message: "no past sp found" });
                        })
                            .catch(function (err) {
                            console.log('Hello2');
                            console.log(err);
                            return res.status(500).json({ error: err });
                        })];
                }
                else
                    return [2 /*return*/, res.status(401).json({ message: "unauthorised user" })];
                return [2 /*return*/];
            });
        }); };
        this.createFavSP = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userId, SPId;
            var _this = this;
            return __generator(this, function (_a) {
                userId = parseInt(req.body.userId);
                SPId = parseInt(req.params.SPId);
                if (req.body.userId && req.body.userTypeId === 4) {
                    req.body.UserId = userId;
                    req.body.TargetUserId = SPId;
                    return [2 /*return*/, this.favSPService
                            .getAllSRByUserId(req.body.userId)
                            .then(function (SRArray) {
                            var PastSP = _this.favSPService.getAllPastSPId(SRArray);
                            if (PastSP.length > 0) {
                                // const inSPArray = PastSP.includes(parseInt(req.params.helperId));
                                var inSPArray = false;
                                for (var x in PastSP) {
                                    //console.log(Provider_Ids[x] === ProviderId)
                                    //console.log(ProviderId);
                                    //console.log(Provider_Ids[x]);
                                    if (PastSP[x] == +req.params.SPId) {
                                        inSPArray = true;
                                        break;
                                    }
                                }
                                // console.log(inSPArray);
                                if (inSPArray) {
                                    if (req.body.IsFavorite) {
                                        return _this.favSPService
                                            .getFavSP(userId, SPId)
                                            .then(function (FavSP) {
                                            if (FavSP) {
                                                if (FavSP.IsFavorite)
                                                    return res.status(409).json({ message: "SP already in favorite list" });
                                                else
                                                    return _this.favSPService
                                                        .updateFavSP(req.body)
                                                        .then(function (favorite) {
                                                        if (favorite.length > 0)
                                                            res.status(201).json({ message: "favorite SP updated successfully" });
                                                        else
                                                            res.status(502).json({ message: "error setting favorite helper" });
                                                    })
                                                        .catch(function (err) { return res.status(500).json({ error: err }); });
                                            }
                                            else {
                                                req.body.IsBlocked = false;
                                                return _this.favSPService
                                                    .createFavSP(req.body)
                                                    .then(function (FavSP) {
                                                    if (FavSP)
                                                        return res.status(200).json({ message: "favorite sp created successfully" });
                                                    return res.status(502).json({ message: "error creating favorite sp" });
                                                })
                                                    .catch(function (err) { return res.status(500).json({ error: err }); });
                                            }
                                        })
                                            .catch(function (err) { return res.status(500).json({ error: err }); });
                                    }
                                    else if (req.body.IsFavorite === false)
                                        next();
                                    else
                                        return res.status(404).json({ message: "content not found" });
                                }
                                else
                                    return res.status(404).json({ message: "this service provider has not worked with customer in past" });
                            }
                            else
                                return res.status(404).json({ message: "no service provider found worked with customer in past" });
                        })
                            .catch(function (err) { return res.status(500).json({ error: err }); })];
                }
                else
                    return [2 /*return*/, res.status(401).json({ message: "unauthorised user" })];
                return [2 /*return*/];
            });
        }); };
        this.removeFavSP = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.favSPService
                        .getFavSP(req.body.UserId, req.body.TargetUserId)
                        .then(function (FavSP) {
                        if (FavSP) {
                            if (FavSP.IsFavorite)
                                return _this.favSPService
                                    .updateFavSP(req.body)
                                    .then(function (favoriteStatus) {
                                    if (favoriteStatus)
                                        res.status(201).json({ message: "favorite sp updated successfully." });
                                    else
                                        res.status(502).json({ message: "error updating favorite sp." });
                                })
                                    .catch(function (err) { return res.status(500).json({ error: err }); });
                            else if (FavSP.IsFavorite === false)
                                return res.status(409).json({ message: 'sp already in unfavorite list' });
                            else
                                return res.status(404).json({ message: "no sp to remove from favorite list" });
                        }
                        else
                            return res.status(404).json({ message: "no sp in you favorite list" });
                    })
                        .catch(function (err) { return res.status(500).json({ error: err }); })];
            });
        }); };
        this.blockSP = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.userId && req.body.userTypeId === 4) {
                    req.body.UserId = req.body.userId;
                    req.body.TargetUserId = req.params.SPId;
                    return [2 /*return*/, this.favSPService
                            .getAllSRByUserId(req.body.userId)
                            .then(function (serviceRequest) {
                            var helperIds = _this.favSPService.getAllPastSPId(serviceRequest);
                            if (helperIds.length > 0) {
                                var inHelperArray = helperIds.includes(parseInt(req.params.SPId));
                                if (inHelperArray) {
                                    if (req.body.IsBlocked)
                                        return _this.favSPService
                                            .getFavSP(req.body.UserId, req.body.TargetUserId)
                                            .then(function (FBSP) {
                                            if (FBSP) {
                                                if (FBSP.IsBlocked)
                                                    return res.status(409).json({ message: "sp already blocked list" });
                                                else
                                                    return _this.favSPService
                                                        .updateBlockedSP(req.body)
                                                        .then(function (updatedHelper) {
                                                        if (updatedHelper.length > 0)
                                                            res.status(201).json({ message: "sp added to blocked list." });
                                                        else
                                                            res.status(502).json({ message: "error adding sp to blocked list." });
                                                    })
                                                        .catch(function (err) { return res.status(500).json({ error: err }); });
                                            }
                                            else {
                                                req.body.IsFavorite = false;
                                                return _this.favSPService
                                                    .createFavSP(req.body)
                                                    .then(function (blockedHelper) {
                                                    if (blockedHelper)
                                                        return res.status(200).json({ message: "blocked sp created successfully." });
                                                    return res.status(502).json({ message: "error creating blocked helper." });
                                                })
                                                    .catch(function (err) { return res.status(500).json({ error: err }); });
                                            }
                                        })
                                            .catch(function (err) { return res.status(500).json({ error: err }); });
                                    else if (req.body.IsBlocked === false)
                                        next();
                                    else
                                        return res.status(404).json({ message: "content not found" });
                                }
                                else
                                    return res.status(404).json({ message: "sp not worked with customer in past." });
                            }
                            else
                                return res.status(404).json({ message: "no service provider found who has worked with customer in past." });
                        })
                            .catch(function (err) { return res.status(500).json({ error: err }); })];
                }
                else
                    return [2 /*return*/, res.status(401).json({ message: "unauthorised user" })];
                return [2 /*return*/];
            });
        }); };
        this.unblockedSP = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.favSPService
                        .getFavSP(req.body.UserId, req.body.TargetUserId)
                        .then(function (blocked) {
                        if (blocked) {
                            if (blocked.IsBlocked)
                                return _this.favSPService
                                    .updateBlockedSP(req.body)
                                    .then(function (blockedStatus) {
                                    if (blockedStatus.length > 0)
                                        res.status(200).json({ message: "helper removed from blocked list." });
                                    else
                                        res.status(502).json({ message: "error in removing helper from blocked list." });
                                })
                                    .catch(function (err) { return res.status(500).json({ error: err }); });
                            else if (blocked.IsBlocked === false)
                                return res.status(401).json({ message: 'helper already in unblocked list' });
                            else
                                return res.status(404).json({ message: "no helper to remove from blocked list." });
                        }
                        else
                            return res.status(404).json({ message: "no helper in you favorite list" });
                    })
                        .catch(function (err) { return res.status(500).json({ error: err }); })];
            });
        }); };
        this.favSPService = favSPService;
    }
    return FavSPController;
}());
exports.FavSPController = FavSPController;
// public block_Provier:RequestHandler = async(req, res, next):Promise<Response|void> => {
//   if (req.body.userId && req.body.userTypeId === 4) {
//     req.body.UserId = req.body.userId;
//     req.body.TargetUserId = req.params.helperId;
//     return this.favoriteProviderService.getAllSRByUserId(req.body.userId)
//       .then((ser_Req) => {
//         const Provider_Ids =this.favoriteProviderService.get_ProviderId_Cust_Relation(ser_Req);
//         if (Provider_Ids.length > 0) {
//           //const Prov_list = Provider_Ids.includes(+req.params.helperId);
//           let Prov_List = false;
//           for(let x in Provider_Ids)
//           {
//             //console.log(Provider_Ids[x]===ProviderId)
//             //console.log(ProviderId);
//             //console.log(Provider_Ids[x]);
//             if(Provider_Ids[x]==+req.params.helperId)
//             {
//               Prov_List=true;
//               break;
//             }
//           }
//           console.log(Prov_List);
//           if (Prov_List) {
//             if (req.body.IsBlocked) {
//               return this.favoriteProviderService.get_Fav_Provider(req.body.UserId, req.body.TargetUserId)
//                 .then((SP_Prov) => {
//                   if (SP_Prov) {
//                     if(SP_Prov.IsBlocked){
//                       return res.status(409).json({message: "SP is already marked as Blocked"});
//                     }else{
//                       return this.favoriteProviderService.update_Block_Provider(req.body)
//                       .then(upd_Pro => {
//                         if (upd_Pro.length > 0) {
//                           res.status(201).json({ message:"SP is blocked now",});
//                         } else {res.status(500).json({ message: "error while blocking SP",});}
//                       })
//                       .catch((error: Error) => {
//                         console.log(error);
//                         return res.status(500).json({ error: error });
//                       });
//                     }
//                   } else {
//                     req.body.IsFavorite = false;
//                     return this.favoriteProviderService.create_Fav_Provider(req.body)
//                       .then((block_Prov) => {
//                         if (block_Prov) {
//                           return res.status(200).json({message: "blocked helper created successfully",});
//                         }
//                         return res.status(502).json({
//                           message: "error in creating blocked helper",
//                         });
//                       })
//                       .catch((error: Error) => {
//                         console.log(error);
//                         return res.status(500).json({ error: error });
//                       });
//                   }
//                 })
//                 .catch((error: Error) => {
//                   console.log(error);
//                   return res.status(500).json({ error: error });
//                 });
//               } else if (req.body.IsBlocked === false) {
//               next();
//             } else {
//               return res.status(404).json({ message: "No Data found" });
//             }
//           } else {
//             return res.status(404).json({message: "this service provider has not worked with customer in past",});
//           }
//         } else {
//           return res.status(404).json({message: "no service provider found worked with customer in past",});
//         }
//       })
//       .catch((error: Error) => {
//         console.log(error);
//         return res.status(500).json({ error: error });
//       });
//   } else {
//     return res.status(401).json({ message: "unauthorised user" });
//   }
// };
