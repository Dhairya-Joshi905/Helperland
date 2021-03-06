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
var multer_1 = __importDefault(require("multer"));
var express_1 = __importDefault(require("express"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var models_1 = require("./models");
var _1__Contact_Us_1 = __importDefault(require("./routes/1. Contact Us"));
var _2__Signup_Login_1 = __importDefault(require("./routes/2. Signup Login"));
var _3__Book_Service_1 = __importDefault(require("./routes/3. Book Service"));
var _4__Customer_Pages_1 = __importDefault(require("./routes/4. Customer Pages"));
var _5__SP_Pages_1 = __importDefault(require("./routes/5. SP Pages"));
var _6__Admin_Screens_1 = __importDefault(require("./routes/6. Admin Screens"));
require('dotenv').config();
var app = (0, express_1.default)();
var swaggerOption = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Helperland API',
            version: '1.0.0',
            description: 'Helperland',
            contact: {
                name: 'Dhairya Joshi',
                email: 'dhairyajoshi.905@gmail.com'
            },
            servers: [{ url: "http://localhost:3000" }]
        }
    },
    apis: [
        './routes/1. Contact Us.ts',
        './routes/2. Signup Login.ts',
        './routes/3. Book Service.ts',
        './routes/4. Customer Pages.ts',
        './routes/5. SP Pages.ts',
        './routes/6. Admin Screens.ts'
    ]
};
var swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOption);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, multer_1.default)({ dest: 'UploadedFiles' }).single('file'));
app.use('/Helperland/ContactUs', _1__Contact_Us_1.default);
app.use('/Helperland/SignUp&Login', _2__Signup_Login_1.default);
app.use('/Helperland/BookService', _3__Book_Service_1.default);
app.use('/Helperland/CustomerPages', _4__Customer_Pages_1.default);
app.use('/Helperland/SPPages', _5__SP_Pages_1.default);
app.use('/Helperland/AdminPages', _6__Admin_Screens_1.default);
app.listen(process.env.PORT, function () {
    console.log("Server rocking at ".concat(process.env.PORT));
    models_1.sequelize.authenticate()
        .then(function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('database connected');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, models_1.sequelize.sync( /*{force: true}*/)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); })
        .catch(function (e) {
        console.log(e.message);
    });
});
