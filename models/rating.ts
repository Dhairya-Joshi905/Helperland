// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Rating extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Rating.init({
//     ServiceRequestId: DataTypes.INTEGER,
//     RatingFrom: DataTypes.INTEGER,
//     RatingTo: DataTypes.INTEGER,
//     Ratings: DataTypes.FLOAT,
//     Comments: DataTypes.STRING,
//     IsApproved: DataTypes.BOOLEAN,
//     VisibleOnHomeScreen: DataTypes.BOOLEAN,
//     OnTimeArrival: DataTypes.FLOAT,
//     Friendly: DataTypes.FLOAT,
//     QualityOfService: DataTypes.FLOAT
//   }, {
//     sequelize,
//     modelName: 'Rating',
//   });
//   return Rating;
// };

import {Model, DataTypes, ModelAttributes} from 'sequelize';

export class Rating extends Model {
  id!: number;  
  ServiceRequestId!: number;
  RatingFrom!: number;
  RatingTo!: number;
  Ratings!: number;
  Comments?: string;
  IsApproved?: boolean;
  VisibleOnHomeScreen!: boolean;
  OnTimeArrival!: number;
  Friendly!: number;
  QualityOfService!: number;
  createdAt!: Date;
  updatedAt!: Date;
};

export const RatingModelAttributes: ModelAttributes = {
  
  id: {
    autoIncrement: true,
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true
  },
  
  ServiceRequestId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'ServiceRequest',
      key: 'id'
    }
  },

  RatingFrom: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  
  RatingTo: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },

  Ratings: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  Comments: {
    type: DataTypes.STRING,
    allowNull: true
  },

  IsApproved: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },

  VisibleOnHomeScreen: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },

  OnTimeArrival: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  Friendly: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  QualityOfService: {
    type: DataTypes.FLOAT,
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