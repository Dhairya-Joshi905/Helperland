import { db } from "../../models/index";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { ServiceRequest } from "../../models/servicerequest";
import { SRAddress } from "../../models/servicerequestaddress";
import { User } from "../../models/user";

export class SRRepository {
  public async getSPDetailById (SPId: number): Promise<User | null> {
    return db.User.findOne({ where: { UserId: SPId, UserTypeId: 3 } });
  }

  public async getUserDetailById (SPId: number): Promise<User | null> {
    return db.User.findOne({ where: { UserId: SPId, UserTypeId: 4 } });
  }

  public async getSRAddress (SRId: number): Promise<SRAddress | null> {
    return db.SRAddress.findOne({ where: { ServiceRequestId: SRId } });
  }

  public async getSRDetailById (SRId: number): Promise<ServiceRequest | null> {
    return db.ServiceRequest.findOne({ where: { ServiceRequestId: SRId, Status: 1 } });
  }

  public async getAllSROfSP (SPId: number): Promise<ServiceRequest[] | null> {
    return db.ServiceRequest.findAll({ where: { ServiceProviderId: SPId, Status: 2 } });
  }

  public async getAllPendingSRByZipcode (zipCode: string): Promise<ServiceRequest[] | null> {
    return db.ServiceRequest.findAll({ where: { ZipCode: zipCode, Status: 1 } });
  }

  public async getSPByZipCode (zipCode: string): Promise<User[]|null> {
    return db.User.findAll({ where: { ZipCode: zipCode, UserTypeId: 3 } });
  }

  public async getBlockedCustomerOfSP (SPId: number): Promise<FavoriteAndBlocked[] | null> {
    return db.FavoriteAndBlocked.findAll({ where: { UserId: SPId, IsBlocked: true } });
  }

  public async acceptNewSR (SRId: number, SPId: number): Promise<[number, ServiceRequest[]]> {
    return db.ServiceRequest
      .update({ 
        ServiceProviderId: SPId, 
        Status: 2,
        ModifiedBy: SPId,
        SPAcceptedDate: new Date()
      }, {
        where: { ServiceRequestId: SRId }
      });
  }
}