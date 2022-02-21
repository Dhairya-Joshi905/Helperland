// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class ServiceRequest extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   ServiceRequest.init({
//     UserId: DataTypes.INTEGER,
//     ServiceId: DataTypes.INTEGER,
//     ServiceStartDate: DataTypes.DATE,
//     ZipCode: DataTypes.STRING,
//     ServiceFrequency: DataTypes.SMALLINT,
//     ServiceHourlyRate: DataTypes.FLOAT,
//     ServiceHours: DataTypes.FLOAT,
//     ExtraHours: DataTypes.FLOAT,
//     SubTotal: DataTypes.FLOAT,
//     Discount: DataTypes.FLOAT,
//     TotalCost: DataTypes.FLOAT,
//     Comments: DataTypes.STRING,
//     PaymentTransactionRefNo: DataTypes.STRING,
//     PaymentDue: DataTypes.BOOLEAN,
//     JobStatus: DataTypes.SMALLINT,
//     ServiceProviderId: DataTypes.INTEGER,
//     SPAcceptedDate: DataTypes.DATE,
//     HasPets: DataTypes.BOOLEAN,
//     Status: DataTypes.INTEGER,
//     ModifiedBy: DataTypes.INTEGER,
//     RefundedAmount: DataTypes.FLOAT,
//     Distance: DataTypes.FLOAT,
//     HasIssue: DataTypes.BOOLEAN,
//     PaymentDone: DataTypes.BOOLEAN,
//     RecordVersion: DataTypes.UUID
//   }, {
//     sequelize,
//     modelName: 'ServiceRequest',
//   });
//   return ServiceRequest;
// };

import {UUIDVersion} from 'express-validator/src/options';
import {Model, DataTypes, ModelAttributes} from 'sequelize';

export class ServiceRequest extends Model {
  id!: number;
  UserId!: number;
  ServiceId!: number;
  ServiceStartDate!: Date;
  ZipCode!: string;
  ServiceFrequency?: number;
  ServiceHourlyRate?: number;
  ServiceHours!: number;
  ExtraHours?: number;
  SubTotal!: number;
  Discount?: number;
  TotalCost!: number;
  Comments?: string;
  PaymentTransactionRefNo?: string;
  PaymentDue!: boolean;
  JobStatus?: number;
  ServiceProviderId?: number;
  SPAcceptedDate?: Date;
  HasPets!: boolean;
  Status?: number;
  ModifiedBy?: number;
  RefundedAmount?: number;
  Distance!: number;
  HasIssue?: boolean;
  PaymentDone?: boolean;
  RecordVersion?: UUIDVersion;
  createdAt!: Date;
  updatedAt!: Date;
};

export const ServiceRequestModelAttributes: ModelAttributes = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    unique: true,
    allowNull: false
  },

  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
  ServiceId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
  ServiceStartDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  
  ZipCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  ServiceFrequency: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  
  ServiceHourlyRate: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  
  ServiceHours: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  
  ExtraHours: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  
  SubTotal: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  
  Discount: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  
  TotalCost: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  
  Comments: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  PaymentTransactionRefNo: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  
  PaymentDue: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  
  JobStatus: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  
  ServiceProviderId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  
  SPAcceptedDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  
  HasPets: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  
  Status: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  
  ModifiedBy: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  
  RefundedAmount: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  
  Distance: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  
  HasIssue: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  
  PaymentDone: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },

  RecordVersion: {
    type: DataTypes.UUID,
    allowNull: true
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