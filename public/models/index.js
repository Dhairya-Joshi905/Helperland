"use strict";
// 'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDefineModel = exports.SubscribeDefineModel = exports.ContactUsDefineModel = exports.db = exports.sequelize = exports.Sequelize = void 0;
// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.ts')[env];
// const db:any = {};
// let sequelize: any;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
// fs
//   .readdirSync(__dirname)
//   .filter((file: string) => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
//   })
//   .forEach((file:any) => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
// db.sequelize = sequelize;
// // db.Sequelize = Sequelize;
// // module.exports = db;
//  export {db, sequelize};
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
const contactus_1 = require("./contactus");
const subscribe_1 = require("./subscribe");
const user_1 = require("./user");
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const sequelize = config.url
    ? new sequelize_1.Sequelize(config.url, config)
    : new sequelize_1.Sequelize(config.database, config.username, config.password, config);
exports.sequelize = sequelize;
const ContactUsDefineModel = sequelize.define('ContactUs', Object.assign({}, contactus_1.ContactUsModelAttributes), {
    tableName: 'ContactUs'
});
exports.ContactUsDefineModel = ContactUsDefineModel;
const SubscribeDefineModel = sequelize.define('Subscribe', Object.assign({}, subscribe_1.SubscribeModelAttributes), {
    tableName: 'Subscribe'
});
exports.SubscribeDefineModel = SubscribeDefineModel;
const UserDefineModel = sequelize.define('User', Object.assign({}, user_1.UserModelAttributes), {
    tableName: 'User'
});
exports.UserDefineModel = UserDefineModel;
exports.db = {
    sequelize: sequelize,
    ContactUs: ContactUsDefineModel,
    Subscribe: SubscribeDefineModel,
    User: UserDefineModel
};
