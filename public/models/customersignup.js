"use strict";
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     FirstName: DataTypes.STRING,
//     LastName: DataTypes.STRING,
//     Email: DataTypes.STRING,
//     Password: DataTypes.STRING,
//     Mobile: DataTypes.BIGINT,
//     UserTypeId: DataTypes.INTEGER,
//     RoleId: DataTypes.INTEGER,
//     Gender: DataTypes.INTEGER,
//     DateOfBirth: DataTypes.DATE,
//     Website: DataTypes.STRING,
//     UserProfilePicture: DataTypes.STRING,
//     IsRegisteredUser: DataTypes.BOOLEAN,
//     PaymentGatewayUserRef: DataTypes.STRING,
//     ZipCode: DataTypes.STRING,
//     WorksWithPets: DataTypes.BOOLEAN,
//     LanguageId: DataTypes.INTEGER,
//     NationalityId: DataTypes.INTEGER,
//     ResetKey: DataTypes.STRING,
//     ModifiedBy: DataTypes.INTEGER,
//     IsApproved: DataTypes.BOOLEAN,
//     IsActive: DataTypes.BOOLEAN,
//     IsDeleted: DataTypes.BOOLEAN,
//     Status: DataTypes.INTEGER,
//     IsOnline: DataTypes.BOOLEAN,
//     BankTokenId: DataTypes.STRING,
//     TaxNo: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSignUpModelAttributes = exports.CustomerSignUp = void 0;
const sequelize_1 = require("sequelize");
class CustomerSignUp extends sequelize_1.Model {
}
exports.CustomerSignUp = CustomerSignUp;
;
exports.CustomerSignUpModelAttributes = {
    id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true
    },
    FirstName: {
        type: sequelize_1.DataTypes.STRING,
    },
    LastName: {
        type: sequelize_1.DataTypes.STRING,
    },
    Email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    Password: {
        type: sequelize_1.DataTypes.STRING,
    },
    Mobile: {
        type: sequelize_1.DataTypes.BIGINT,
        unique: true
    },
    RoleId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    Gender: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    DateOfBirth: {
        type: sequelize_1.DataTypes.DATE,
    },
    Website: {
        type: sequelize_1.DataTypes.STRING,
    },
    UserProfilePicture: {
        type: sequelize_1.DataTypes.STRING,
    },
    IsRegisteredUser: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    PayGatewayUserRef: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    ZipCode: {
        type: sequelize_1.DataTypes.STRING,
    },
    WorksWithPets: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    LanguageId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    NationalityId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    ResetKey: {
        type: sequelize_1.DataTypes.STRING,
    },
    ModifiedBy: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    IsApproved: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    IsActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    IsDeleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    Status: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    IsOnline: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    BankTokenId: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    TaxNo: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
    }
};
