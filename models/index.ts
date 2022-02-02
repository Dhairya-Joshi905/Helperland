// 'use strict';

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

import { BuildOptions, Model, Sequelize } from 'sequelize';
import { ContactUs, ContactUsModelAttributes } from "./contactus";
import { Subscribe, SubscribeModelAttributes } from "./subscribe";

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];

const  sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };

type ContactUsModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ContactUs;
};

type SubscribeModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Subscribe;
};

const ContactUsDefineModel = sequelize.define(
  'ContactUs',{
    ...ContactUsModelAttributes
  },
  {
    tableName: 'ContactUs'
  }
) as ContactUsModelStatic;

const SubscribeDefineModel = sequelize.define(
  'Subscribe',{
    ...SubscribeModelAttributes
  },
  {
    tableName: 'Subscribe'
  }
) as SubscribeModelStatic;

export interface DbContext {
  sequelize: Sequelize;
  ContactUs: ContactUsModelStatic;  
  Subscribe: SubscribeModelStatic;  
}

export const db: DbContext = {
  sequelize: sequelize,
  ContactUs: ContactUsDefineModel,
  Subscribe: SubscribeDefineModel
}

export {ContactUsDefineModel};
export {SubscribeDefineModel};
