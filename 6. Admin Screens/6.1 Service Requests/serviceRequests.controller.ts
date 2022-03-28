import mailgun from "mailgun-js";
import { Request, Response, RequestHandler, NextFunction } from "express";

import { ServiceRequest } from "../../models/servicerequest";
import { SRAddress } from "../../models/servicerequestaddress";

import { ServiceRequestService } from "./serviceRequests.service";

import { displaySRData, filters } from "./datatypesExport";

require("dotenv").config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: process.env.MAILGUN_DOMAIN!,
});

export class ServiceRequestController {

  public constructor (private readonly srService: ServiceRequestService) {
    this.srService = srService;
  }

  public getAllSR: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    if (req.body.userTypeId === 2 && req.body.userId)
      return this.srService
        .getAllSR()
        .then((srArray: displaySRData[] | null) => {
          if (srArray && srArray.length > 0)
            return res.status(200).json(srArray);
          else return res.status(404).json({ message: "service requests not found" });
        })
        .catch((err: Error) => {
          console.log(err);
          return res.status(500).json({ error: err });
        });
    else return res.status(401).json({ message: "unauthorised user" });
  };

  public filteredSR: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    const filters: filters = req.body;
    if (req.body.userTypeId === 2)
      return this.srService
        .getAllSR()
        .then(async (srArray: displaySRData[] | null) => {
          if (srArray && srArray.length > 0) {
            const filteredArray: any[] | undefined = await this.srService.filterData(srArray, filters);
            return res.status(200).json(filteredArray);
          }
          else return res.status(404).json({ message: "service requests not found" });
        })
        .catch((err: Error) => {
          console.log(err);
          return res.status(500).json({ error: err });
        });
    else return res.status(401).json({ message: "Unauthorised User" });
  };

  public cancelSR: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    if (req.body.userTypeId === 2) {
      if (req.params.requestId)
        return this.srService
          .getSRById(req.params.requestId)
          .then(async (serviceRequest: ServiceRequest | null) => {
            if (serviceRequest) {
              if (serviceRequest.Status === 3)
                return res.status(401).json({ message: "completed service request can not cancel." });
              else if (serviceRequest.Status === 4)
                return res.status(401).json({ message: "service request already cancelled." });
              else if (serviceRequest.Status === 5)
                return res.status(401).json({ message: "service request already refunded." });
              else
                return this.srService
                  .updateSR(req.params.requestId, req.body.userId)
                  .then(async (updatedSRArray: [number, ServiceRequest[]]) => {
                    if (updatedSRArray[0] === 1) {
                      const emailArray: string[] = await this.srService.getCustAndSPEmail(serviceRequest);
                      // console.log(email);
                      for (let e in emailArray) {
                        const email = this.srService.createEmailForCancelSR(emailArray[e], serviceRequest.ServiceRequestId);
                        mg.messages().send(email, (err: mailgun.Error) => {
                          if (err) return res.json({ error: err.message });
                        });
                      }
                      return res.status(200).json({ message: "service request cancelled successfully." });
                    }
                    else return res.status(422).json({ message: "errr in cancelling request." });
                  })
                  .catch((err: Error) => {
                    console.log(err);
                    return res.status(500).json({ error: err });
                  });
            } 
            else return res.status(200).json({ message: "service request not found" });
          })
          .catch((err: Error) => {
            console.log(err);
            return res.status(500).json({ error: err });
          });
      else return res.status(422).json({ message: "ServiceRequestId not found in request" });
    } 
    else return res.status(401).json({ message: "Unauthorised User" });
  };

  public editSR: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
    if (req.body.userTypeId === 2) {
      if (req.body.ServiceRequestId)
        return this.srService
          .getSRById(req.body.ServiceRequestId)
          .then(async (serviceRequest: ServiceRequest | null) => {
            if (serviceRequest) {
              req.body.serviceRequest = serviceRequest;
              if (serviceRequest.Status === 1 || serviceRequest.Status === 2) {
                return this.srService
                  .updateSRAddress(req.body)
                  .then(async (updatedRequest: [number, SRAddress[]] | null) => {
                    if (updatedRequest) {
                      if (updatedRequest[0] === 1) {
                        req.body.updatedAddress = true;
                        next();
                      }
                      else return res.status(422).json({ message: "error in updating address" });
                    } else {
                      req.body.updatedAddress = false;
                      next();
                    }
                  })
                  .catch((err: Error) => {
                    console.log(err);
                    return res.status(500).json({ error: err });
                  });
              }
              else return res.status(401).json({ message: "completed or cancelled service request can not edit or reschedule." });
            }
            else return res.status(200).json({ message: "service request not found" });
          })
          .catch((err: Error) => {
            console.log(err);
            return res.status(500).json({ error: err });
          });
      else return res.status(422).json({ message: "ServiceRequestId not found" });
    }
    else return res.status(401).json({ message: "Unauthorised User" });
  };

  public rescheduleSR: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    const isSame: boolean = await this.srService.checkIfRescheduledDateIsSame(req.body);
    if (isSame === false) {
      const isGreater: boolean = this.srService.compareDateWithCurrentDate(req.body.ServiceStartDate);
      if (isGreater)
        return this.srService
          .rescheduleSR(req.body, req.body.userId)
          .then(async (rescheduledServiceRequest: [number, ServiceRequest[]]) => {
            if (rescheduledServiceRequest[0] === 1) {
              const emailArray: string[] = await this.srService.getCustAndSPEmail(req.body.serviceRequest);
              if (req.body.updatedAddress)
                  for (let e in emailArray) {
                    const email = this.srService.createEmailForUpdatedSR(emailArray[e], req.body);
                    mg.messages().send(email, (err: mailgun.Error) => {
                      if (err) return res.json({ error: err.message });
                    });
                  }
              else
                for (let e in emailArray) {
                  const email = this.srService.createEmailForRescheduleSR(emailArray[e], req.body);
                  mg.messages().send(email, (err: mailgun.Error) => {
                    if (err) return res.json({ error: err.message });
                  });
                }
              return res.status(200).json({message:'service request updated successfully.'});
            }
            else return res.status(422).json({ message: "error in rescheduling service request"});
          })
          .catch((err: Error) => {
            console.log(err);
            return res.status(500).json({ error: err });
          })
      else return res.status(400).json({ message: "Enter future date for reschedule service request" });
    }
    else {
      if (req.body.updatedAddress) {
        const emailArray: string[] = await this.srService.getCustAndSPEmail(req.body.serviceRequest);
        for (let e in emailArray) {
          const email = this.srService.createEmailForUpdatedAddress(emailArray[e], req.body);
          mg.messages().send(email, (err: mailgun.Error) => {
            if (err) return res.json({ error: err.message });
          });
        }
        return res.status(200).json({ message: 'service request address updated successfully.' })
      }
      else return res.status(201).json({ message: 'no change in service request.' });
    }  
  }
}