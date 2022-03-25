import { db } from "../../models/index";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";

export class BlockCustomerRepository {

  public async getUDByUId (userId: number): Promise<User | null> {
    return db.User.findOne({ where: { UserId: userId } });
  };

  public async getPastCustomersOfSP (SPId: number): Promise<ServiceRequest[] | null> {
    return db.ServiceRequest.findAll({ where: { ServiceProviderId: SPId, Status: 3 } });
  }

  public async getBlockedCustomer (SPId: number, customerId: number): Promise<FavoriteAndBlocked | null> {
    return db.FavoriteAndBlocked.findOne({ where: { UserId: SPId, TargetUserId: customerId } });
  }

  public async updateBlockedCustomer (SPId: number, customerId: number): Promise<[number, FavoriteAndBlocked[]]> {
    return db.FavoriteAndBlocked.update({ IsBlocked: true }, { where: { UserId: SPId, TargetUserId: customerId } });
  }

  public async unblockCustomer (SPId: number, customerId: number): Promise<[number, FavoriteAndBlocked[]]> {
    return db.FavoriteAndBlocked.update({ IsBlocked: false }, { where: { UserId: SPId, TargetUserId: customerId } });
  }

  public async createBlockUnblockCustomer (blockCustomer: { [key: number|string]: FavoriteAndBlocked }): Promise<FavoriteAndBlocked> {
    return db.FavoriteAndBlocked.create(blockCustomer);
  }
}