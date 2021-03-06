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
exports.BlockCustomerService = void 0;
var BlockCustomerService = /** @class */ (function () {
    function BlockCustomerService(blockCustomerRepository) {
        this.blockCustomerRepository = blockCustomerRepository;
        this.blockCustomerRepository = blockCustomerRepository;
    }
    BlockCustomerService.prototype.getUDByUId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.blockCustomerRepository.getUDByUId(userId)];
            });
        });
    };
    BlockCustomerService.prototype.getBlockedCustomer = function (SPId, customerId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.blockCustomerRepository.getBlockedCustomer(parseInt(SPId), parseInt(customerId))];
            });
        });
    };
    BlockCustomerService.prototype.getPastCustomersOfSP = function (helperId) {
        return __awaiter(this, void 0, void 0, function () {
            var customer, serviceRequest, _a, _b, _i, sr, user, userIds, filterArray;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        customer = [];
                        return [4 /*yield*/, this.blockCustomerRepository.getPastCustomersOfSP(helperId)];
                    case 1:
                        serviceRequest = _c.sent();
                        if (!serviceRequest) return [3 /*break*/, 5];
                        if (!(serviceRequest.length > 0)) return [3 /*break*/, 5];
                        _a = [];
                        for (_b in serviceRequest)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        sr = _a[_i];
                        return [4 /*yield*/, this.blockCustomerRepository.getUDByUId(serviceRequest[sr].UserId)];
                    case 3:
                        user = _c.sent();
                        if (user)
                            customer.push({
                                Name: user.FirstName + " " + user.LastName,
                                UserId: user.UserId
                            });
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        userIds = customer.map(function (Customer) { return Customer.UserId; });
                        filterArray = customer.filter(function (_a, index) {
                            var UserId = _a.UserId;
                            return !userIds.includes(UserId, index + 1);
                        });
                        return [2 /*return*/, filterArray];
                }
            });
        });
    };
    ;
    BlockCustomerService.prototype.updateBlockedCustomer = function (SPId, customerId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.blockCustomerRepository.updateBlockedCustomer(parseInt(SPId), parseInt(customerId))];
            });
        });
    };
    BlockCustomerService.prototype.unblockCustomer = function (SPId, customerId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.blockCustomerRepository.unblockCustomer(parseInt(SPId), parseInt(customerId))];
            });
        });
    };
    BlockCustomerService.prototype.createBlockUnblockCustomer = function (blockCustomer) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.blockCustomerRepository.createBlockUnblockCustomer(blockCustomer)];
            });
        });
    };
    BlockCustomerService.prototype.hasSPWorkedForCustomer = function (SPId, customerId) {
        return __awaiter(this, void 0, void 0, function () {
            var matched, customerIntId, customers, cs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        matched = false;
                        customerIntId = parseInt(customerId);
                        return [4 /*yield*/, this.getPastCustomersOfSP(parseInt(SPId))];
                    case 1:
                        customers = _a.sent();
                        if (customers)
                            for (cs in customers) {
                                if (customers[cs].UserId === customerIntId) {
                                    matched = true;
                                    break;
                                }
                                else
                                    matched = false;
                            }
                        else
                            matched = false;
                        return [2 /*return*/, matched];
                }
            });
        });
    };
    return BlockCustomerService;
}());
exports.BlockCustomerService = BlockCustomerService;
