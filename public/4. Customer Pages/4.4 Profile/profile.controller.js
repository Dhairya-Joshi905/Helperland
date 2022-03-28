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
exports.ProfileController = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv").config();
// const mg: mailgun.Mailgun = mailgun({
//   apiKey: process.env.MAILGUN_API!,
//   domain: process.env.MAILGUN_DOMAIN!,
// });
var ProfileController = /** @class */ (function () {
    function ProfileController(profileService) {
        var _this = this;
        this.profileService = profileService;
        this.getUDById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var UserId;
            return __generator(this, function (_a) {
                UserId = parseInt(req.body.userId);
                if (UserId && req.body.userTypeId === 4)
                    return [2 /*return*/, this.profileService
                            .getUDById(UserId)
                            .then(function (userDetail) {
                            if (userDetail)
                                return res.status(200).json(userDetail);
                            else
                                return res.status(404).json({ message: 'User not found' });
                        })
                            .catch(function (error) { return res.status(500).json({ error: error }); })];
                else
                    return [2 /*return*/, res.status(400).json({ message: 'Maybe user id is not 4.' })];
                return [2 /*return*/];
            });
        }); };
        this.updateUDById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var UserId;
            return __generator(this, function (_a) {
                if (req.body.userId && req.body.userTypeId === 4) {
                    UserId = parseInt(req.body.userId);
                    req.body.DateOfBirth = this.profileService.convertStringToDate(req.body.DateOfBirth);
                    return [2 /*return*/, this.profileService
                            .updateUDbyId(UserId, req.body)
                            .then(function (updatedUser) {
                            if (updatedUser)
                                // Not returning User[]
                                return res.status(200).json(updatedUser);
                            else
                                return res.status(500).json({ message: 'error updating user details' });
                        })
                            .catch(function (err) { return res.status(500).json({ error: err }); })];
                }
                else
                    return [2 /*return*/, res.status(400).json({ message: 'Maybe user id is not 4.' })];
                return [2 /*return*/];
            });
        }); };
        this.getUAsByUId = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var UserId;
            return __generator(this, function (_a) {
                UserId = parseInt(req.body.userId);
                if (UserId && req.body.userTypeId === 4) {
                    return [2 /*return*/, this.profileService
                            .getUAsById(UserId)
                            .then(function (userAddresses) {
                            if (userAddresses)
                                return res.status(200).json(userAddresses);
                            else
                                return res.status(404).json({ message: 'address not found for this user.' });
                        })
                            .catch(function (err) { return res.status(500).json({ error: err }); })];
                }
                else
                    return [2 /*return*/, res.status(400).json({ message: 'proper input not found in request.' })];
                return [2 /*return*/];
            });
        }); };
        this.getUAByAId = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var AId;
            return __generator(this, function (_a) {
                AId = parseInt(req.params.AId);
                if (AId && req.body.userTypeId === 4) {
                    return [2 /*return*/, this.profileService
                            .getUAByAId(AId, req.body.userId)
                            .then(function (userAddress) {
                            if (userAddress)
                                return res.status(200).json(userAddress);
                            else
                                return res.status(404).json({ message: 'address not found' });
                        })
                            .catch(function (err) { return res.status(500).json({ error: err }); })];
                }
                else
                    return [2 /*return*/, res.status(400).json({ message: 'proper input not found in request.' })];
                return [2 /*return*/];
            });
        }); };
        this.updateUAByAId = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (req.params.AId && req.body.userTypeId === 4) {
                    req.body.Addressline1 = req.body.StreetName;
                    req.body.Addressline2 = req.body.HouseNumber;
                    return [2 /*return*/, this.profileService
                            .updateUAByAId(req.params.AId, req.body.userId, req.body)
                            .then(function (updatedAddress) {
                            if (updatedAddress) {
                                console.log(updatedAddress[0]);
                                if (updatedAddress[0] === 1)
                                    return res.status(201).json({ message: 'address updated successfully' });
                                else
                                    return res.status(422).json({ message: 'error in updating information' });
                            }
                            else
                                return res.status(422).json({ message: 'error in updating information' });
                        })
                            .catch(function (err) {
                            console.log(err);
                            return res.status(500).json({ error: err });
                        })];
                }
                else
                    return [2 /*return*/, res.status(400).json({ message: 'proper input not found in request.' })];
                return [2 /*return*/];
            });
        }); };
        this.createUA = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                req.body.IsDeleted = false;
                req.body.IsDefault = false;
                if (req.body.userId && req.body.userTypeId === 4) {
                    req.body.Email = req.body.email;
                    req.body.UserId = req.body.userId;
                    req.body.Addressline1 = req.body.StreetName;
                    req.body.Addressline2 = req.body.HouseNumber;
                    return [2 /*return*/, this.profileService
                            .createUA(req.body)
                            .then(function (createdAddress) {
                            if (createdAddress)
                                return res.status(200).json({ message: 'address created successfully.' });
                            else
                                return res.status(422).json({ message: 'error in creating address.' });
                        })
                            .catch(function (err) { return res.status(500).json({ error: err }); })];
                }
                else
                    return [2 /*return*/, res.status(400).json({ message: 'proper input not found in request.' })];
                return [2 /*return*/];
            });
        }); };
        this.deleteUAByAId = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (req.params.AId && req.body.userTypeId === 4) {
                    return [2 /*return*/, this.profileService
                            .deleteUA(req.params.AId, req.body.userId)
                            .then(function (deletedAddress) {
                            if (deletedAddress) {
                                if (deletedAddress[0] === 1)
                                    return res.status(200).json({ message: 'address deleted successfully' });
                                else
                                    return res.status(404).json({ message: 'Error Deleting Address!!' });
                            }
                            else
                                return res.status(404).json({ message: 'Error Deleting Address!!' });
                        })
                            .catch(function (err) { return res.status(500).json({ error: err }); })];
                }
                else
                    return [2 /*return*/, res.status(400).json({ message: 'proper input not found in request' })];
                return [2 /*return*/];
            });
        }); };
        this.changePassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.userId && req.body.userTypeId === 4) {
                    return [2 /*return*/, this.profileService
                            .getUserById(req.body.userId)
                            .then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var match, hashedPassword;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!user) return [3 /*break*/, 7];
                                        return [4 /*yield*/, bcrypt_1.default.compare(req.body.OldPassword, user.Password)];
                                    case 1:
                                        match = _a.sent();
                                        if (!match) return [3 /*break*/, 5];
                                        if (!(req.body.NewPassword === req.body.ConfirmPassword)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, bcrypt_1.default.hash(req.body.NewPassword, 10)];
                                    case 2:
                                        hashedPassword = _a.sent();
                                        return [2 /*return*/, this.profileService.changePassword(req.body.userId, hashedPassword)
                                                .then(function (changedPassword) {
                                                if (changedPassword) {
                                                    if (changedPassword[0] === 1)
                                                        return res.status(200).json({ message: 'password changed successfully' });
                                                    else
                                                        return res.status(404).json({ message: 'error in changing password' });
                                                }
                                                else
                                                    return res.status(404).json({ message: 'error in changing password' });
                                            })
                                                .catch(function (err) { return res.status(500).json({ error: err }); })];
                                    case 3: return [2 /*return*/, res.status(400).json({ message: 'New Password and Confirm Password must be same.' })];
                                    case 4: return [3 /*break*/, 6];
                                    case 5: return [2 /*return*/, res.status(400).json({ message: 'Old password incorrect.' })];
                                    case 6: return [3 /*break*/, 8];
                                    case 7: return [2 /*return*/, res.status(404).json({ message: 'user not found' })];
                                    case 8: return [2 /*return*/];
                                }
                            });
                        }); })
                            .catch(function (err) { return res.status(500).json({ error: err }); })];
                }
                else
                    return [2 /*return*/, res.status(400).json({ message: 'proper input not found in request' })];
                return [2 /*return*/];
            });
        }); };
        this.profileService = profileService;
    }
    return ProfileController;
}());
exports.ProfileController = ProfileController;
