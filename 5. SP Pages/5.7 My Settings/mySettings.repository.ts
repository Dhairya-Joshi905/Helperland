import { updateUserDetail } from "./types";

import { db } from "../../models/index";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";

export class MySettingsRepository {

  public async getUDById (userId: number): Promise<User | null> {
    return db.User.findOne({ attributes: { exclude: ['Password'] }, where: { UserId: userId, UserTypeId: 3 }, include: db.UserAddress });
  }

  public async updateUDById (userId: number, user: updateUserDetail): Promise<[number, User[]]> {
    return db.User.update({
      FirstName: user.FirstName,
      LastName: user.LastName,
      Mobile: user.Mobile,
      DateOfBirth: user.DateOfBirth,
      NationalityId: user.NationalityId,
      Gender: user.GenderId,
      UserProfilePicture: user.ProfilePicture,
      ModifiedBy: userId,
      ZipCode: user.Address.PostalCode
    }, { 
      where: { UserId: userId } 
    });
  }

  public async getUAById (userId: number): Promise<UserAddress| null> {
    return db.UserAddress.findOne({ where: { UserId: userId, IsDeleted: false } });
  }

  public async getSPAById (SPId: number): Promise<UserAddress| null> {
    return db.UserAddress.findOne({ where: { UserId: SPId } });
  }

  public async updateUA (AId: number, user: updateUserDetail) {
    return db.UserAddress.update({
      Addressline1: user.Address.StreetName,
      Addressline2: user.Address.HouseNumber,
      PostalCode: user.Address.PostalCode,
      City: user.Address.City
    }, { 
      where: { AddressId: AId }
    });
  }

  public async createAddress (userId: number, user: updateUserDetail) {
    return db.UserAddress.create({
      Addressline1: user.Address.StreetName,
      Addressline2: user.Address.HouseNumber,
      PostalCode: user.Address.PostalCode,
      City: user.Address.City,
      IsDefault: true,
      IsDeleted: false,
      UserId: userId
    });
  }

  public async getUserById (userId: number): Promise<User | null> {
    return db.User.findOne({ where: { UserId: userId } });
  }

  public async changePassword (userId: number, password: string): Promise<[number,User[]]> {
    return db.User.update({ Password: password, ModifiedBy: userId }, { where: { UserId: userId } });
  }
}