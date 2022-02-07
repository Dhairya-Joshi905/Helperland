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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const routes_1 = __importDefault(require("./routes"));
//import multer from "multer";
// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUI from "swagger-ui-express";
// import swaggerUi from "swagger-ui-express";
// const internalDoc = require('./swagger/swagger.json');
require('dotenv').config();
const app = (0, express_1.default)();
// const swaggerOptions={
//     definition:{
//         openapi:'3.0.0',
//         info:{
//             title:'Contact_Us API',
//             version: '1.0.0',
//             description:'',
//             contact:{
//                 name:'Dhairya Joshi',
//                 email:'dhairyajoshi.905@gmail.com'
//             },
//             servers:[
//                 {url: "http://localhost:3000"}
//             ]
//         }
//     },
//     apis:["routes.ts"]
// }
// const swaggerDocs = swaggerJSDoc(swaggerOptions);
// app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//app.use(multer({dest:'uploadFiles'}).single('file'));
app.use('/', routes_1.default);
//app.use('/swagger', swaggerUi.serve, swaggerUi.setup(internalDoc));
app.listen(process.env.PORT, () => {
    console.log(`Server rocking at ${process.env.PORT}`);
    models_1.sequelize.authenticate().then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("database connected");
        try {
            yield models_1.sequelize.sync();
        }
        catch (error) {
            console.log(error);
        }
    }))
        .catch((e) => {
        console.log(e.message);
    });
});
// export { app };
