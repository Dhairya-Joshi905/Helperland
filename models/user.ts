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

import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class User extends Model {
  
  UserId!:number;
  
  FirstName?: string;
  
  LastName?: string;
  
  Email?: string;
  
  Password?: string;
  
  Mobile?: bigint;
  
  RoleId?: number;

  Gender?: number;
  
  DateOfBirth?: Date;
  
  Website?: string;
  
  UserProfilePicture?: string;
  
  IsRegisteredUser?: boolean;
  
  PaymentGatewayUserRef?: string;
  
  ZipCode?: string;
  
  WorksWithPets?: boolean;
  
  LanguageId?: number;
  
  NationalityId?: number;
  
  ResetKey?: string;
  
  ModifiedBy?: number;
  
  IsApproved?: boolean;
  
  IsActive?: boolean;
  
  IsDeleted?: boolean;
  
  Status?: number;
  
  IsOnline?: boolean;
  
  BankTokenId?: string;
  
  TaxNo?: string;
};

export const UserModelAttributes: ModelAttributes = {
  UserId: {
    autoIncrement: true,
    type: DataTypes.BIGINT,
    primaryKey: true
  },
  
  FirstName: {
    type: DataTypes.STRING,
  },
  
  LastName: {
    type: DataTypes.STRING,
  },
  
  Email: {
    type: DataTypes.STRING,
    unique: true
  },
  
  Password: {
    type: DataTypes.STRING,
  },
  
  Mobile: {
    type: DataTypes.BIGINT,
    unique: true
  },
  
  RoleId: {
    type: DataTypes.INTEGER,
  },
  
  Gender: {
    type: DataTypes.INTEGER,
  },
  
  DateOfBirth: {
    type: DataTypes.DATE,
  },
  
  Website: {
    type: DataTypes.STRING,
  },
  
  UserProfilePicture: {
    type: DataTypes.STRING,
  },
  
  IsRegisteredUser: {
    type: DataTypes.BOOLEAN,
  },
  
  PayGatewayUserRef: {
    type: DataTypes.STRING,
    unique: true
  },
  
  ZipCode: {
    type: DataTypes.STRING,
  },
  
  WorksWithPets: {
    type: DataTypes.BOOLEAN,
  },
  
  LanguageId: {
    type: DataTypes.INTEGER,
  },
  
  NationalityId: {
    type: DataTypes.INTEGER,
  },
  
  ResetKey: {
    type: DataTypes.STRING,
  },
  
  ModifiedBy: {
    type: DataTypes.INTEGER,
  },
  
  IsApproved: {
    type: DataTypes.BOOLEAN,
  },
  
  IsActive: {
    type: DataTypes.BOOLEAN,
  },
  
  IsDeleted: {
    type: DataTypes.BOOLEAN,
  },
  
  Status: {
    type: DataTypes.INTEGER,
  },
  
  IsOnline: {
    type: DataTypes.BOOLEAN,
  },

  BankTokenId: {
    type: DataTypes.STRING,
    unique: true
  },

  TaxNo: {
    type: DataTypes.STRING,
    unique: true
  },
  
  createdAt: {
    type: DataTypes.DATE,
  },
  
  updatedAt: {
    type: DataTypes.DATE,
  }
}