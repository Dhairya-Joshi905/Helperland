import mailgun from "mailgun-js";
import { Request, Response, RequestHandler } from "express";

import { SRService } from "./newSR.service";

import { User } from "../../models/user";
import { ServiceRequest } from "../../models/servicerequest";

require("dotenv").config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: process.env.MAILGUN_DOMAIN!,
});

export class SRController {
  
  public constructor (private readonly serviceRequestService: SRService) {
    this.serviceRequestService = serviceRequestService;
  }

  public getAllNewSR: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    if (req.body.userTypeId === 3) {
      if (req.body.userId)
        return this.serviceRequestService
          .getSPDetailbyId(req.body.userId)
          .then((SP: User | null) => {
            if (SP) {
              if (SP.ZipCode === null)
                return res.status(404).json({ message: "you have not provided zipcode in your detail please update your detail to get requests available in your entered zipcode area" });
              else
                return this.serviceRequestService
                  .getAllPendingSRByZipcode(SP.ZipCode!, req.body.userId)
                  .then(async (SRArray: ServiceRequest[] | null) => {
                    if (SRArray && SRArray.length > 0) {
                      const sRequests = await this.serviceRequestService.petFilter(req.body.PetsAtHome, SRArray);
                      if (sRequests && sRequests.length>0) {
                        const requestDetail = await this.serviceRequestService.getSRDetail(sRequests);
                        return res.status(200).json(requestDetail);
                      } 
                      else return res.status(404).json({ message: "service requests not found" });
                    }
                    else return res.status(404).json({ message: "service requests not found" });
                  })
                  .catch((error: Error) => { return res.status(500).json({ error: error }) });
            }
            else return res.status(404).json({ message: "helper not found" });
          })
          .catch((error: Error) => { return res.status(500).json({ error: error }) });
      else return res.status(422).json({ message: "helperId not found in request body" });
    }
    else return res.status(401).json({ message: "unauthorised user" });
  };

  public getSRDetailById: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    if (req.body.userTypeId === 3)
      return this.serviceRequestService
        .getSRDetailById(req.params.SRId)
        .then((SRDetail: ServiceRequest | null) => {
          if (SRDetail)
            return res.status(200).json(SRDetail);
          else return res.status(404).json({ message: "request detail not available" });
        })
        .catch((error: Error) => { return res.status(500).json({ error: error }) });
    else return res.status(401).json({ message: "Unauthorised User" });
  };

  public isSRAccepted: RequestHandler = async (req: Request, res: Response, next): Promise<Response | void> => {
    if (req.params.SRId)
      return this.serviceRequestService
        .getSRDetailById(req.params.SRId)
        .then((serviceRequest: ServiceRequest | null) => {
          if (serviceRequest) {
            req.body.ZipCode = serviceRequest.ZipCode;
            return this.serviceRequestService
              .getAllSROfSP(req.body.userId)
              .then(async (serviceRequests: ServiceRequest[] | null) => {
                req.body.totalHour = serviceRequest.ExtraHours + serviceRequest.ServiceHours;
                if (serviceRequests) {
                  const { srId, matched } = await this.serviceRequestService.checkSPAvailability(serviceRequest.ServiceStartDate, serviceRequests, req.body.totalHour, serviceRequest.ServiceStartTime);
                  if (matched)
                    return res.status(422).json({ message: "Another service request " + srId + " has already been assigned which has time overlap with this service request. You can’t pick this one!" });
                  else next();
                } 
                else next();
              })
              .catch((error: Error) => { return res.status(500).json({ error: error }) });
          }
          else return res.status(422).json({ message: "This service request is no more available. It has been assigned to another provider" });
        })
        .catch((error: Error) => { return res.status(500).json({ error: error }) });
    else return res.status(400).json({ message: "proper input not found in request" });
  };

  public acceptNewSR: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    return this.serviceRequestService
      .acceptNewSR(req.params.SRId, req.body.userId)
      .then((updatedServiceRequest: [number, ServiceRequest[]]) => {
        if (updatedServiceRequest[0] === 1)
          return this.serviceRequestService
            .getSPByZipCode(req.body.ZipCode)
            .then((helpers: User[] | null) => {
              if (helpers)
                for (let hp in helpers) {
                  if (helpers[hp].Email === req.body.email)
                    continue;
                  const data = this.serviceRequestService.createEmailData(helpers[hp].Email!, req.params.SRId!);
                  // console.log(data);
                  mg.messages().send(data, (error, body) => {
                    if (error)
                      return res.json({ error: error.message });
                  });
                }
              return res.status(200).json({ message: "service request accepted successfully" });
            })
            .catch((error: Error) => { return res.status(500).json({ error: error }) });
        else
          return res.status(404).json({ message: "error in accepting service request" });
      })
      .catch((error: Error) => { return res.status(500).json({ error: error }) });
  };
}