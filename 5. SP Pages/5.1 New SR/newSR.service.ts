import { SRRepository } from "./newSR.repository";

import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";

export class SRService {
  public constructor(private readonly SRRepository: SRRepository) {
    this.SRRepository = SRRepository;
  }

  public async getSPDetailbyId (SPId: string): Promise<User | null> {
    return this.SRRepository.getSPDetailById(parseInt(SPId));
  }

  public async getSRDetailById (SRId: string): Promise<ServiceRequest | null> {
    return this.SRRepository.getSRDetailById(parseInt(SRId));
  }

  public async getAllSROfSP (SPId: string): Promise<ServiceRequest[] | null> {
    return this.SRRepository.getAllSROfSP(parseInt(SPId));
  }

  public async getSPByZipCode (zipCode: string): Promise<User[]|null> {
    return this.SRRepository.getSPByZipCode(zipCode);
  }

  public async acceptNewSR (serviceId: string, SPId: string): Promise<[number, ServiceRequest[]]> {
    return this.SRRepository.acceptNewSR(parseInt(serviceId), parseInt(SPId));
  };

  public async getAllPendingSRByZipcode (zipCode: string, helperId:string): Promise<ServiceRequest[] | null> {
    let SRArray: ServiceRequest[] = [];
    const serviceRequest = await this.SRRepository.getAllPendingSRByZipcode(zipCode);
    const blockedCustomer = await this.SRRepository.getBlockedCustomerOfSP(parseInt(helperId));
    if (serviceRequest)
      if (blockedCustomer) {
        SRArray = serviceRequest.filter (sr => 
            !blockedCustomer.find (rm => (rm.TargetUserId === sr.UserId))
        );
      }
    return SRArray;
  }

  // Local Services

  public async petFilter (includePets: boolean, serviceRequests: ServiceRequest[]) {
    let sRequests: ServiceRequest[] = [];
    if (includePets === false)
      for (let sr in serviceRequests)
        if (serviceRequests[sr].HasPets === false)
          sRequests.push(serviceRequests[sr]);
    else
      return serviceRequests;
    return sRequests;
  }

  public async getSRDetail (srequest: ServiceRequest[]): Promise<Object[]> {
    let requestDetail:Object[] = [];
    for (let sr in srequest) {
      const user = await this.SRRepository.getUserDetailById(srequest[sr].UserId);
      const requestAddress = await this.SRRepository.getSRAddress(srequest[sr].ServiceRequestId);

      const startTimeArray = srequest[sr].ServiceStartTime.toString().split(":")!;

      const endTimeInt = (
        parseFloat(startTimeArray[0]) + parseFloat(startTimeArray[1]) / 60 +
        srequest[sr].ServiceHours! + srequest[sr].ExtraHours!
      ).toString().split(".");

      if (endTimeInt[1])
        endTimeInt[1] = (parseInt(endTimeInt[1]) * 6).toString();
      else
        endTimeInt[1] = "00";

      if (user)
        if (requestAddress)
          requestDetail.push({
            ServiceId:srequest[sr].ServiceRequestId,
            ServiceDate:srequest[sr].ServiceStartDate.toString().split("-").reverse().join("-"),
            Time:startTimeArray[0]+":"+startTimeArray[1]+"-"+endTimeInt[0]+":"+endTimeInt[1],
            Customer: user.FirstName + " " + user.LastName,
            Address: {
              Street: requestAddress.Addressline1,
              HouseNumber: requestAddress.Addressline2,
              City: requestAddress.City,
              PostalCode: requestAddress.PostalCode,
            },
            Payment: srequest[sr].TotalCost + " €"
          })
    }
    return requestDetail;
  }

  public checkSPAvailability (date: Date, serviceRequest: ServiceRequest[], acceptTotalHour: number, time: number) {
    let srId;
    let matched: boolean = false;
    for (let sr in serviceRequest) {
      if (serviceRequest[sr].ServiceStartDate === date) {
        const acceptTime = time.toString().split(":");
        if (acceptTime[1] === "30")
          acceptTime[1] = "0.5";
        const acceptStartTime = parseFloat(acceptTime[0]) + parseFloat(acceptTime[1]);
        const availableTime = serviceRequest[sr].ServiceStartTime.toString().split(":");
        if (availableTime[1] === "30")
          availableTime[1] = "0.5";
        const availableStartTime = parseFloat(availableTime[0]) + parseFloat(availableTime[1]);
        const availableTotalHour = serviceRequest[sr].ServiceHours + serviceRequest[sr].ExtraHours;
        const totalAcceptTime = acceptStartTime + acceptTotalHour + 1;
        const totalAvailableTime = availableStartTime + availableTotalHour + 1;
        if (availableStartTime >= totalAcceptTime || acceptStartTime >= totalAvailableTime)
          matched = false;
        else {
          srId = serviceRequest[sr].ServiceRequestId;
          matched = true;
          break;
        }
      }
      else
        matched = false;
    }
    return {matched, srId};
  }

  public createEmailData (userEmail: string, srId: string): typeof data {
    const data = {
        from: 'team_helperland@gmail.com',
        to: userEmail,
        subject: 'About assigned service request',
        html: `<h3>A service request ${srId} has already been accepted by someone and is no more available to you.</h3>`
    }
    return data;
  }
}