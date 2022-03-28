import { updateSRBody } from "./datatypesExport";

import { db } from "../../models/index";
import { Rating } from "../../models/rating";
import { ServiceRequest } from "../../models/servicerequest";
import { SRAddress } from "../../models/servicerequestaddress";
import { User } from "../../models/user";

export class ServiceRequestRepository {

  public async getAllSR(): Promise<ServiceRequest[] | null> {
    return db.ServiceRequest.findAll();
  }

  public async getSRById (requestId: number): Promise<ServiceRequest | null> {
    return db.ServiceRequest.findOne({ where: { ServiceRequestId: requestId } });
  }

  public async updateSR (requestId: number, userId: number): Promise<[number, ServiceRequest[]]> {
    return db.ServiceRequest.update({ Status: 4, ModifiedBy: userId }, { where: { ServiceRequestId: requestId } });
  }

  public async updateSRAddress (body: updateSRBody): Promise<[number, SRAddress[]]> {
    return db.SRAddress.update({
      Addressline1: body.Addressline1,
      Addressline2: body.Addressline2,
      City: body.City,
      PostalCode: body.PostalCode
    }, {
      where: { ServiceRequestId: body.ServiceRequestId }
    });
  }

  public async rescheduleSR (date: Date, body: updateSRBody, userId: number): Promise<[number, ServiceRequest[]]> {
    return db.ServiceRequest.update(
      { ServiceStartDate: date, ServiceStartTime: body.ServiceTime, ModifiedBy:userId },
      { where: { ServiceRequestId: body.ServiceRequestId } }
    );
  }

  public async getUserByEmail (email: string): Promise<User| null> {
    return db.User.findOne({ where: { Email: email } });
  }

  public async getUDById (userId: number): Promise<User | null> {
    return db.User.findOne({ where: { UserId: userId } });
  }

  public async getSRAddress (requestId: number): Promise<SRAddress | null> {
    return db.SRAddress.findOne({ where: { ServiceRequestId: requestId } });
  }

  public async getRatings (userId: number, serviceProviderId: number, requestId: number): Promise<Rating | null> {
    return db.Rating.findOne({ 
      where: {
        RatingFrom: userId,
        RatingTo: serviceProviderId,
        ServiceRequestId: requestId
      }
    });
  }
}