"use strict";
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Subscribe extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Subscribe.init({
//     Email: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Subscribe',
//   });
//   return Subscribe;
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeModelAttributes = exports.Subscribe = void 0;
const sequelize_1 = require("sequelize");
class Subscribe extends sequelize_1.Model {
}
exports.Subscribe = Subscribe;
;
exports.SubscribeModelAttributes = {
    id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    Email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
};
