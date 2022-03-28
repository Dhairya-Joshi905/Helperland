"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.sequelize = exports.Sequelize = void 0;
var sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
var contactus_1 = require("./contactus");
var favoriteandblocked_1 = require("./favoriteandblocked");
var rating_1 = require("./rating");
var servicerequest_1 = require("./servicerequest");
var servicerequestaddress_1 = require("./servicerequestaddress");
var servicerequestextra_1 = require("./servicerequestextra");
var subscribe_1 = require("./subscribe");
var user_1 = require("./user");
var useraddress_1 = require("./useraddress");
var env = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];
var sequelize = config.url
    ? new sequelize_1.Sequelize(config.url, config)
    : new sequelize_1.Sequelize(config.database, config.username, config.password, config);
exports.sequelize = sequelize;
var ContactUsDefineModel = sequelize.define('ContactUs', __assign({}, contactus_1.ContactUsModelAttributes), { tableName: 'ContactUs' });
var FAndBDefineModel = sequelize.define("FavoriteAndBlocked", __assign({}, favoriteandblocked_1.FAndBModelAttributes), { tableName: "FavoriteAndBlocked" });
var RatingDefineModel = sequelize.define('Rating', __assign({}, rating_1.RatingModelAttributes), { tableName: 'Rating' });
var ServiceRequestDefineModel = sequelize.define("ServiceRequest", __assign({}, servicerequest_1.ServiceRequestModelAttributes), { tableName: "ServiceRequest" });
var SRAddressDefineModel = sequelize.define("SRAddress", __assign({}, servicerequestaddress_1.SRAddressModelAttributes), { tableName: "SRAddress" });
var SRExtraDefineModel = sequelize.define("SRExtra", __assign({}, servicerequestextra_1.SRExtraModelAttributes), { tableName: "SRExtra" });
var SubscribeDefineModel = sequelize.define('Subscribe', __assign({}, subscribe_1.SubscribeModelAttributes), { tableName: 'Subscribe' });
var UserAddressDefineModel = sequelize.define("UserAddress", __assign({}, useraddress_1.UserAddressModelAttributes), { tableName: "UserAddress" });
var UserDefineModel = sequelize.define("User", __assign({}, user_1.UserModelAttributes), { tableName: "User" });
exports.db = {
    sequelize: sequelize,
    ContactUs: ContactUsDefineModel,
    FavoriteAndBlocked: FAndBDefineModel,
    Rating: RatingDefineModel,
    ServiceRequest: ServiceRequestDefineModel,
    SRAddress: SRAddressDefineModel,
    SRExtra: SRExtraDefineModel,
    Subscribe: SubscribeDefineModel,
    UserAddress: UserAddressDefineModel,
    User: UserDefineModel
};
exports.db.User.hasMany(exports.db.UserAddress, {
    foreignKey: {
        name: "UserId",
        allowNull: false
    },
    constraints: true,
    onDelete: "CASCADE"
});
exports.db.UserAddress.belongsTo(exports.db.User, {
    foreignKey: {
        name: "UserId",
        allowNull: false
    },
    constraints: true,
    onDelete: "CASCADE"
});
exports.db.ServiceRequest.hasOne(exports.db.SRAddress, {
    foreignKey: {
        name: "ServiceRequestId",
        allowNull: false
    },
    as: 'ServiceRequestAddress',
    constraints: true,
    onDelete: "CASCADE"
});
exports.db.SRAddress.belongsTo(exports.db.ServiceRequest, {
    foreignKey: {
        name: "ServiceRequestId",
        allowNull: false
    },
    constraints: true,
    onDelete: "CASCADE"
});
exports.db.User.hasMany(exports.db.ServiceRequest, {
    foreignKey: {
        name: "UserId",
        allowNull: false
    },
    as: 'UserRequest',
    constraints: true,
    onDelete: "CASCADE"
});
exports.db.ServiceRequest.belongsTo(exports.db.User, {
    foreignKey: {
        name: "UserId",
        allowNull: false
    },
    as: 'UserRequest',
    constraints: true,
    onDelete: "CASCADE"
});
exports.db.User.hasMany(exports.db.ServiceRequest, {
    foreignKey: {
        name: "ServiceProviderId",
        allowNull: true
    },
    as: 'HelperRequest',
    constraints: true,
    onDelete: "CASCADE"
});
exports.db.ServiceRequest.belongsTo(exports.db.User, {
    foreignKey: {
        name: "ServiceProviderId",
        allowNull: true
    },
    as: 'HelperRequest',
    constraints: true,
    onDelete: "CASCADE"
});
exports.db.ServiceRequest.hasMany(exports.db.SRExtra, {
    foreignKey: {
        name: "ServiceRequestId",
        allowNull: true
    },
    as: 'ExtraService',
    constraints: true,
    onDelete: "CASCADE"
});
exports.db.User.hasMany(exports.db.FavoriteAndBlocked, {
    foreignKey: {
        name: "UserId",
        allowNull: false
    },
    as: 'FavoriteAndBlocked',
    constraints: true,
    onDelete: "CASCADE"
});
// Rating
exports.db.ServiceRequest.hasOne(exports.db.Rating, {
    foreignKey: {
        name: "ServiceRequestId",
        allowNull: false,
    },
    as: 'ServiceRequestRating',
    constraints: true,
    onDelete: "CASCADE"
});
exports.db.Rating.belongsTo(exports.db.ServiceRequest, {
    foreignKey: {
        name: "ServiceRequestId",
        allowNull: false,
    },
    as: 'RatingServiceRequest',
    constraints: true,
    onDelete: "CASCADE"
});
exports.db.User.hasMany(exports.db.Rating, {
    foreignKey: {
        name: "RatingFrom",
        allowNull: false,
    },
    as: 'RatingFrom',
    constraints: true,
    onDelete: "CASCADE"
});
exports.db.User.hasMany(exports.db.Rating, {
    foreignKey: {
        name: "RatingTo",
        allowNull: false,
    },
    as: 'RatingTo',
    constraints: true,
    onDelete: "CASCADE"
});
exports.default = exports.db;
// Do we need to export these things?
// export {ContactUsDefineModel};
// export {SubscribeDefineModel};
// export {UserDefineModel}
// export {ContactUsAttachmentDefineModel};
