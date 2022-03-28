// Used for getting date in specific format
import moment from "moment";

import { Rating } from "../../models/rating";
import { ServiceRequest } from "../../models/servicerequest";
import { SRAddress } from "../../models/servicerequestaddress";
import { User } from "../../models/user";

import { ServiceRequestRepository } from "./serviceRequests.repository";

import { displaySRData, filters, updateSRBody } from "./datatypesExport";

export class ServiceRequestService {

  public constructor (private readonly srRepository: ServiceRequestRepository) { 
      this.srRepository = srRepository; 
  }

  public async getAllSR(): Promise<displaySRData[] | null> {
    let displaySR: displaySRData[] = [];
    let ratings: (Rating | null);
    let sp: (User | null);

    const srArray: ServiceRequest[] | null = await this.srRepository.getAllSR();
    if (srArray && srArray.length > 0) {
      for (let sr in srArray) {
        const customer: User | null = await this.srRepository.getUDById(srArray[sr].UserId);
        const address: SRAddress | null = await this.srRepository.getSRAddress(srArray[sr].ServiceRequestId);

        if (srArray[sr].ServiceProviderId)  sp = await this.srRepository.getUDById(srArray[sr].ServiceProviderId);
        else                                sp = null;

        if (sp) ratings = await this.srRepository.getRatings(customer?.UserId!, sp.UserId, srArray[sr].ServiceRequestId);
        else    ratings = null;

        const time: string = await this.convertTimeToStartEndTime(srArray[sr]);
        const status: string | null = await this.getStatus(srArray[sr].Status);

        displaySR.push({
          ServiceId: srArray[sr].ServiceRequestId,
          ServiceDate: {
            Date: srArray[sr].ServiceStartDate.toString().split('-').reverse().join('/'),
            Time: time
          },
          CustomerDetails: {
            Name: customer?.FirstName + " " + customer?.LastName,
            UserId: customer?.UserId!,
            Address: {
              StreetName: address?.Addressline1,
              HouseNumber: address?.Addressline2,
              PostalCode: address?.PostalCode,
              City: address?.City
            }
          },
          ServiceProvider: {
            Name: sp?.FirstName + " " + sp?.LastName,
            ServiceProviderId: sp?.UserId!,
            ProfilePicture: sp?.UserProfilePicture,
            Ratings: ratings?.Ratings
          },
          GrossAmount: srArray[sr].TotalCost,
          NetAmount: srArray[sr].TotalCost,
          Discount: srArray[sr].Discount,
          Status: status,
          PaymentStatus: srArray[sr].PaymentDone,
          HasIssue: srArray[sr].HasIssue
        })
      }
      const sortedSR: displaySRData[] = displaySR.sort( (a, b) => a.ServiceId - b.ServiceId );
      return sortedSR;
    }
    else return null;
  }

  public async getStatus (status: number): Promise<string | null> {
    let statusString: (string | null);
    if (status === null)    statusString = null;
    else if (status === 1)  statusString = 'New';
    else if (status === 2)  statusString = 'Pending';
    else if (status === 3)  statusString = 'Completed';
    else if (status === 4)  statusString = 'Cancelled';
    else if (status === 5)  statusString = 'Refunded';
    else                    statusString = 'Invalid Status';
    return statusString;
  }

  public async convertTimeToStartEndTime (serviceRequest: ServiceRequest): Promise<string> {
    const startTimeArray: string[] = serviceRequest.ServiceStartTime.toString().split(':');
    const startTime: string = startTimeArray[0]+":"+startTimeArray[1]
    if (startTimeArray[1] === "30") startTimeArray[1] = "0.5"
    else                            startTimeArray[1] = "0"
    const endTimeInt: number = parseFloat(startTimeArray[0]) + parseFloat(startTimeArray[1]) + serviceRequest.ServiceHours + serviceRequest.ExtraHours;
    const endTimeArray: string[] = endTimeInt.toString().split('.');
    if (endTimeArray[1] === '5')  endTimeArray[1] = '30'
    else                          endTimeArray[1] = '00'
    const time: string = startTime + " - " + endTimeArray[0] + ":" + endTimeArray[1];
    return time;
  }

  public async filterData (srArray: displaySRData[], filters: filters) {
    let filteredData;
    if (filters.ServiceRequestId) filteredData = srArray.filter( (element: displaySRData) => element.ServiceId === filters.ServiceRequestId );
    if (filters.Status) {
      if (filteredData) filteredData = filteredData.filter( (element: displaySRData) => element.Status === filters.Status );
      else            filteredData = srArray.filter( (element: displaySRData) => element.Status === filters.Status );
    }

    if (filters.PostalCode) {
      if (filteredData) {
        // console.log(filters.PostalCode);
        filteredData = filteredData.filter( (element: displaySRData) => element.CustomerDetails.Address.PostalCode === filters.PostalCode );
      }
      else filteredData = srArray.filter(  (element: displaySRData) => element.CustomerDetails.Address.PostalCode === filters.PostalCode );
    }

    if (filters.UserId) {
      if (filteredData) filteredData = filteredData.filter( (element: displaySRData) => element.CustomerDetails.UserId === filters.UserId );
      else              filteredData = srArray.filter( (element: displaySRData) => element.CustomerDetails.UserId === filters.UserId );
    }

    if (filters.ServiceProviderId) {
      if (filteredData) filteredData = filteredData.filter( (element: displaySRData) => element.ServiceProvider.ServiceProviderId === filters.ServiceProviderId );
      else            filteredData = srArray.filter( (element: displaySRData) => element.ServiceProvider.ServiceProviderId === filters.ServiceProviderId );
    }

    if (filters.HasIssue !== null) {
      if (filteredData)  filteredData = filteredData.filter( (element: displaySRData) => element.HasIssue === filters.HasIssue );
      else             filteredData = srArray.filter( (element: displaySRData) => element.HasIssue === filters.HasIssue );
    }

    if (filters.FromDate) {
      const fromDate: Date = new Date(filters.FromDate.split('-').reverse().join('-'));
      if (filteredData) {
        // console.log(fromDate);
        filteredData = filteredData.filter( (element: displaySRData) => new Date(element.ServiceDate.Date.split('/').reverse().join('-')) >= fromDate );
      }
      else  filteredData = srArray.filter( (element: displaySRData) => new Date(element.ServiceDate.Date.split('/').reverse().join('-')) >= fromDate );
    }

    if (filters.ToDate) {
      const toDate: Date = new Date(filters.ToDate.split('-').reverse().join('-'));
      if (filteredData) filteredData = filteredData.filter( (element: displaySRData) => new Date(element.ServiceDate.Date.split('/').reverse().join('-')) <= toDate );
      else              filteredData = srArray.filter( (element: displaySRData) => new Date(element.ServiceDate.Date.split('/').reverse().join('-')) <= toDate );
    }

    if (filters.Email) {
      const user: User | null = await this.srRepository.getUserByEmail(filters.Email);
      if (user) {
        if(filteredData) filteredData = filteredData.filter( (element: displaySRData) => element.CustomerDetails.UserId === user.UserId || element.ServiceProvider.ServiceProviderId === user.UserId );
        else             filteredData = srArray.filter( (element: displaySRData) => element.CustomerDetails.UserId === user.UserId || element.ServiceProvider.ServiceProviderId === user.UserId );
      }
      else  filteredData = [];
    }
    return filteredData;
  }

  public async getSRById (requestId: string) {
    return this.srRepository.getSRById(parseInt(requestId));
  }

  public async updateSR (requestId: string, userId: string): Promise<[number, ServiceRequest[]]> {
    return this.srRepository.updateSR(parseInt(requestId), parseInt(userId));
  }

  public async getCustAndSPEmail (serviceRequest: ServiceRequest): Promise<string[]> {
    const email: string[] = [];
    const user: User | null = await this.srRepository.getUDById(serviceRequest.UserId);
    const serviceProvider: User | null = await this.srRepository.getUDById(serviceRequest.ServiceProviderId);
    if (serviceRequest.UserId && user)
      email.push(user.Email!);
    if (serviceRequest.ServiceProviderId && serviceProvider)
      email.push(serviceProvider.Email!);
    return email;
  }

  public createEmailForCancelSR (userEmail: string, srId: number): typeof email {
    const email = {
        from: 'dhairyajoshi.905@gmail.com',
        to: userEmail,
        subject: 'About cancelled service request',
        html: `<h3>Due to some reason service request ${srId} has been cancelled by admin.</h3>`
    }
    return email;
  }

  public createEmailForRescheduleSR (userEmail: string, body: updateSRBody): typeof email {
    const email = {
        from: 'dhairyajoshi.905@gmail.com',
        to: userEmail,
        subject: 'About rescheduled service request',
        html: `
            <h3>service request ${body.ServiceRequestId} has been rescheduled by admin.</h3>
            <h4>new date and time is ${body.ServiceStartDate} and ${body.ServiceTime}</h4>
            `
    }
    return email;
  }

  public createEmailForUpdatedAddress (userEmail: string, address: updateSRBody): typeof email {
    const email = {
        from: 'dhairyajoshi.905@gmail.com',
        to: userEmail,
        subject: 'About updated service request',
        html: `
            <h2>Address of service request ${address.ServiceRequestId} has been changed by admin.</h2>
            </br>
            <h3>New Address is</h3>
            </br>
            <p>Street: ${address.Addressline1}</p>
            </br>
            <p>House Number: ${address.Addressline2}</p>
            </br>
            <p>City: ${address.City}</p>
            </br>
            <p>Postal Code: ${address.PostalCode}</p>
            `
    }
    return email;
  }

  public createEmailForUpdatedSR (userEmail: string, address: updateSRBody): typeof email {
    const email = {
        from: 'dhairyajoshi.905@gmail.com',
        to: userEmail,
        subject: 'About updated and rescheduled service request',
        html: `
            <h2>service request ${address.ServiceRequestId} has been rescheduled and address is updated by admin.</h2>
            </br>
            <h3>New Address, New Date and New Time is</h3>
            </br>
            <p>Street: ${address.Addressline1}</p>
            </br>
            <p>House Number: ${address.Addressline2}</p>
            </br>
            <p>City: ${address.City}</p>
            </br>
            <p>Postal Code: ${address.PostalCode}</p>
            </br>
            <p>Date: ${address.ServiceStartDate}</p>
            </br>
            <p>Time: ${address.ServiceTime}</p>
            `
    }
    return email;
  }

  public async updateSRAddress (body: updateSRBody): Promise<[number, SRAddress[]] | null> {
    const srAddress: SRAddress | null = await this.srRepository.getSRAddress(body.ServiceRequestId);
    let updatedAddress: [number, SRAddress[]] | null;
    if (srAddress) {
      if (srAddress.Addressline1 === body.Addressline1 && srAddress.Addressline2 === body.Addressline2 && srAddress.City === body.City && srAddress.PostalCode === body.PostalCode)
          updatedAddress =  null;
      else  updatedAddress = await this.srRepository.updateSRAddress(body);
    }
    else  updatedAddress =  null;
    return updatedAddress;
  }

  public async checkIfRescheduledDateIsSame (body: updateSRBody): Promise<boolean> {
    let isSame: boolean = false;
    const serviceRequest: ServiceRequest | null = await this.srRepository.getSRById(body.ServiceRequestId);
      if (serviceRequest) {
        const bodyDate: Date = new Date(body.ServiceStartDate.split('/').reverse().join('-'));
        const srDate: Date = new Date(serviceRequest.ServiceStartDate);
        if (bodyDate > srDate || bodyDate<srDate) isSame = false;
        else                                      isSame = true;
      }
      return isSame;
  }

  public compareDateWithCurrentDate (date: string) {
    const formatedDate1: Date = new Date(date.split("/").reverse().join("-"));
    const formatedDate2: Date = new Date(moment(new Date()).format("YYYY-MM-DD"));
    if (formatedDate1 > formatedDate2)  return true;
    else                                return false;
  };

  public async rescheduleSR (body: updateSRBody, userId: string): Promise<[number, ServiceRequest[]]> {
    const date: Date = new Date(body.ServiceStartDate.split('/').reverse().join('-'));
    const rescheduledSR: [number, ServiceRequest[]] = await this.srRepository.rescheduleSR(date, body, parseInt(userId));
    return rescheduledSR
  }
}