"use strict";
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ContactUs extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ContactUs.init({
//     FirstName: DataTypes.STRING,
//     LastName: DataTypes.STRING,
//     Email: DataTypes.STRING,
//     SubjectType: DataTypes.STRING,
//     Subject: DataTypes.STRING,
//     PhoneNumber: DataTypes.STRING,
//     Message: DataTypes.STRING,
//     UploadFileName: DataTypes.STRING,
//     Status: DataTypes.BIGINT,
//     Priority: DataTypes.BIGINT,
//     AssignedToUser: DataTypes.BIGINT
//   }, {
//     sequelize,
//     modelName: 'ContactUs',
//   });
//   return ContactUs;
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsModelAttributes = exports.ContactUs = void 0;
const sequelize_1 = require("sequelize");
class ContactUs extends sequelize_1.Model {
}
exports.ContactUs = ContactUs;
;
exports.ContactUsModelAttributes = {
    id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    FirstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    LastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    SubjectType: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    Subject: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    PhoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    Message: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    UploadFileName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    Status: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true
    },
    Priority: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true
    },
    AssignedToUser: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true
    }
};
