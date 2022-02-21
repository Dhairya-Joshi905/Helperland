import {City, CityModelAttributes} from "./city";
import {ContactUs, ContactUsModelAttributes} from "./contactus";
import {ContactUsAttachment, ContactUsAttachmentModelAttributes} from "./contactusattachment";
import {FavoriteAndBlocked, FavoriteAndBlockedModelAttributes} from "./favoriteandblocked";
import {Rating, RatingModelAttributes} from "./rating";
import {ServiceRequest, ServiceRequestModelAttributes} from "./servicerequest";
import {ServiceRequestAddress, ServiceRequestAddressModelAttributes} from "./servicerequestaddress";
import {ServiceRequestExtra, ServiceRequestExtraModelAttributes} from "./servicerequestextra";
import {ServiceSetting, ServiceSettingModelAttributes} from "./servicesetting";
import {State, StateModelAttributes} from "./state";
import {SysDiagrams, SysDiagramsModelAttributes} from "./sysdiagrams";
import {User, UserModelAttributes} from "./user";
import {UserAddress, UserAddressModelAttributes} from "./useraddress";
import {ZipCode, ZipCodeModelAttributes} from "./zipcode";

import {BuildOptions, Model, Sequelize} from 'sequelize';

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];

const  sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export {Sequelize, sequelize};

type CityModelStatic = typeof Model & {new (values?: object, options?: BuildOptions): City};
type ContactUsModelStatic = typeof Model & {new (values?: object, options?: BuildOptions): ContactUs};
type ContactUsAttachmentModelStatic = typeof Model & {new (values?: object, options?: BuildOptions): ContactUsAttachment};
type FavoriteAndBlockedModelStatic = typeof Model & {new (values?: object, options?: BuildOptions): FavoriteAndBlocked};
type RatingModelStatic = typeof Model & {new (values?: object, options?: BuildOptions): Rating};
type ServiceRequestModelStatic = typeof Model & {new (values?: object, options?: BuildOptions): ServiceRequest};
type ServiceRequestAddressModelStatic = typeof Model & {new (values?: object, options?: BuildOptions): ServiceRequestAddress};
type ServiceRequestExtraModelStatic = typeof Model & {new (values?: object, options?: BuildOptions): ServiceRequestExtra};
type ServiceSettingModelStatic = typeof Model & {new (values?: object, options?: BuildOptions): ServiceSetting};
type StateModelStatic = typeof Model & {new (values?: object, options?: BuildOptions): State};
type SysDiagramsModelStatic = typeof Model & {new (values?: object, options?: BuildOptions): SysDiagrams};
type UserModelStatic = typeof Model & {new (values?: object, options?: BuildOptions): User};
type UserAddressModelStatic = typeof Model & {new (values?: object, options?: BuildOptions): UserAddress};
type ZipCodeModelStatic = typeof Model & {new (values?: object, options?: BuildOptions): ZipCode};

const CityModel = sequelize.define('City', {...CityModelAttributes}, {tableName: 'City'}) as CityModelStatic;
const ContactUsModel = sequelize.define('ContactUs', {...ContactUsModelAttributes}, {tableName: 'ContactUs'}) as ContactUsModelStatic;
const ContactUsAttachmentModel = sequelize.define('ContactUsAttachment', {...ContactUsAttachmentModelAttributes}, {tableName: 'ContactUsAttachment'}) as ContactUsAttachmentModelStatic;
const FavoriteAndBlockedModel = sequelize.define('FavoriteAndBlocked', {...FavoriteAndBlockedModelAttributes}, {tableName: 'FavoriteAndBlocked'}) as FavoriteAndBlockedModelStatic;
const RatingModel = sequelize.define('Rating', {...RatingModelAttributes}, {tableName: 'Rating'}) as RatingModelStatic;
const ServiceRequestModel = sequelize.define('ServiceRequest', {...ServiceRequestModelAttributes}, {tableName: 'ServiceRequest'}) as ServiceRequestModelStatic;
const ServiceRequestAddressModel = sequelize.define('ServiceRequestAddress', {...ServiceRequestAddressModelAttributes}, {tableName: 'ServiceRequestAddress'}) as ServiceRequestAddressModelStatic;
const ServiceRequestExtraModel = sequelize.define('ServiceRequestExtra', {...ServiceRequestExtraModelAttributes}, {tableName: 'ServiceRequestExtra'}) as ServiceRequestExtraModelStatic;
const ServiceSettingModel = sequelize.define('ServiceSetting', {...ServiceSettingModelAttributes}, {tableName: 'ServiceSetting'}) as ServiceSettingModelStatic;
const StateModel = sequelize.define('State', {...StateModelAttributes}, {tableName: 'State'}) as StateModelStatic;
const SysDiagramsModel = sequelize.define('SysDiagrams', {...SysDiagramsModelAttributes}, {tableName: 'SysDiagrams'}) as SysDiagramsModelStatic;
const UserModel = sequelize.define('User', {...UserModelAttributes}, {tableName: 'User'}) as UserModelStatic;
const UserAddressModel = sequelize.define('UserAddress', {...UserAddressModelAttributes}, {tableName: 'UserAddress'}) as UserAddressModelStatic;
const ZipCodeModel = sequelize.define('ZipCode', {...ZipCodeModelAttributes}, {tableName: 'ZipCode'}) as ZipCodeModelStatic;

// A.hasOne(B);
// A.belongsTo(B);
// A.hasMany(B);
// A.belongsToMany(B);

ContactUsModel.hasOne(ContactUsAttachmentModel);
ServiceRequestModel.hasOne(RatingModel);
ServiceRequestModel.hasOne(ServiceRequestAddressModel);
ServiceRequestModel.hasMany(ServiceRequestExtraModel);
ServiceRequestModel.hasOne(ServiceSettingModel);
StateModel.hasMany(CityModel);
UserModel.hasMany(FavoriteAndBlockedModel);
UserModel.hasMany(RatingModel);
UserModel.hasMany(ServiceRequestModel);
UserModel.hasMany(ServiceRequestAddressModel);
UserModel.hasMany(ServiceRequestExtraModel);
UserModel.hasMany(ServiceSettingModel);
UserModel.hasMany(UserAddressModel);
UserModel.hasMany(ZipCodeModel);

export interface DbContext {
  sequelize: Sequelize;
  City: CityModelStatic;
  ContactUs: ContactUsModelStatic;
  ContactUsAttachment: ContactUsAttachmentModelStatic;
  FavoriteAndBlocked: FavoriteAndBlockedModelStatic;
  Rating: RatingModelStatic;
  ServiceRequest: ServiceRequestModelStatic;
  ServiceRequestAddress: ServiceRequestAddressModelStatic;
  ServiceRequestExtra: ServiceRequestExtraModelStatic;
  ServiceSetting: ServiceSettingModelStatic;
  State: StateModelStatic;
  SysDiagrams: SysDiagramsModelStatic;
  User: UserModelStatic;
  UserAddress: UserAddressModelStatic;
  ZipCode: ZipCodeModelStatic;
}

export const db: DbContext = {
  sequelize: sequelize,
  City: CityModel,
  ContactUs: ContactUsModel,
  ContactUsAttachment: ContactUsAttachmentModel,
  FavoriteAndBlocked: FavoriteAndBlockedModel,
  Rating: RatingModel,
  ServiceRequest: ServiceRequestModel,
  ServiceRequestAddress: ServiceRequestAddressModel,
  ServiceRequestExtra: ServiceRequestExtraModel,
  ServiceSetting: ServiceSettingModel,
  State: StateModel,
  SysDiagrams: SysDiagramsModel,
  User: UserModel,
  UserAddress: UserAddressModel,
  ZipCode: ZipCodeModel
}

export {CityModel};
export {ContactUsModel};
export {ContactUsAttachmentModel};
export {FavoriteAndBlockedModel};
export {RatingModel};
export {ServiceRequestModel};
export {ServiceRequestAddressModel};
export {ServiceRequestExtraModel};
export {ServiceSettingModel};
export {StateModel};
export {SysDiagramsModel};
export {UserModel};
export {UserAddressModel};
export {ZipCodeModel};