// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ContactUsAttachment extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ContactUsAttachment.init({
//     Name: DataTypes.STRING,
//     FileName: DataTypes.BLOB
//   }, {
//     sequelize,
//     modelName: 'ContactUsAttachment',
//   });
//   return ContactUsAttachment;
// };

import {Model, DataTypes, ModelAttributes} from 'sequelize';

export class ContactUsAttachment extends Model {
  id!: number;
  Name!: string;
  FileName!: Blob;
  createdAt!: Date;
  updatedAt!: Date;
};

export const ContactUsAttachmentModelAttributes: ModelAttributes = {
  
  id: {
    autoIncrement: true,
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'ContactUs',
      key: 'id'
    }
  },
  
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  FileName: {
    type: DataTypes.BLOB,
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