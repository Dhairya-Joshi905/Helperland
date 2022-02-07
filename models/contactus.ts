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

import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class ContactUs extends Model {
  
  id!: number;
  
  FirstName!: string;
  
  LastName!: string;
  
  Email!: string;
  
  SubjectType!: string;
  
  Subject?: string;
  
  PhoneNumber!: string;
  
  Message!: string;
  
  UploadFileName?: string;
  
  Status?: number;
  
  Priority?: number;
  
  AssignedToUser?: number;
  
  IsDeleted!: boolean;
  
  createdAt!: Date;
  
  updatedAt!: Date;
};

export const ContactUsModelAttributes: ModelAttributes = {
  
  id: {
    autoIncrement: true,
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true
  },
  
  FirstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  LastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  Email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  
  SubjectType: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  
  Subject: {
    type: DataTypes.STRING,
    unique: true
  },
  
  PhoneNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  
  Message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  UploadFileName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  Status: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  
  Priority: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  
  AssignedToUser: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  
  IsDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}