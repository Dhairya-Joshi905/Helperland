import { updateUserDetail } from "./types";

import { MySettingsRepository } from "./mySettings.repository";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";

export class MySettingsService {
  public constructor (private readonly mySettingsRepository: MySettingsRepository) {
    this.mySettingsRepository = mySettingsRepository;
  };

  public async getUserDetailById (userId: number): Promise<Object|null> {
    let displayDetail: Object = {};
    const detail: User | null = await this.mySettingsRepository.getUDById(userId);
    const address: UserAddress | null = await this.mySettingsRepository.getUAById(userId);
    if (detail) {
      displayDetail = {
        Status: detail.Status,
        BasicDetails: {
          FirstName: detail.FirstName,
          LastName: detail.LastName,
          EmailAddress: detail.Email,
          PhoneNumber: detail.Mobile,
          DateOfBirth: detail.DateOfBirth,
          Nationality: detail.NationalityId,
          Gender: detail.Gender,
          ProfilePicture: detail.UserProfilePicture,
        },
        Address: {
          StreetName: address?.Addressline1,
          HouseNumber: address?.Addressline2,
          PostalCode: address?.PostalCode,
          City: address?.City
        }
      }
    }
    return displayDetail;
  }

  public async updateUDbyId (userId: string, user: updateUserDetail): Promise<[number,User[]]> {
    if (user.Gender === "Male")           user.GenderId = 1;
    else if (user.Gender === "Female")    user.GenderId = 2;
    else                                  user.GenderId = 3;
    return this.mySettingsRepository.updateUDById(parseInt(userId), user);
  }

  public async getSPAddressById (SPId: number): Promise<UserAddress| null> {
    return this.mySettingsRepository.getSPAById(SPId);
  }

  public async updateAddress (AId: number, user: updateUserDetail) {
    return this.mySettingsRepository.updateUA(AId, user);
  }

  public async createAddress (AId: number, user: updateUserDetail) {
    return this.mySettingsRepository.createAddress(AId, user);
  }

  public async getUserById (userId: string): Promise<User | null> {
    return this.mySettingsRepository.getUserById(parseInt(userId));
  }

  public async changePassword (userId: string, password: string): Promise<[number,User[]]> {
    return this.mySettingsRepository.changePassword(parseInt(userId), password);
  }

  // local services

  public convertStringToDate (dateStr: any) {
    const dateString = dateStr.toString().split('-').reverse().join('-');
    const date: Date = new Date(dateString);
    return date;
  }
}