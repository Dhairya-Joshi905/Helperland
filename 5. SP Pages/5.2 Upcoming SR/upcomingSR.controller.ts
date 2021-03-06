import mailgun from "mailgun-js";
import { Request, Response, RequestHandler } from "express";

import { UpcomingService } from "./upcomingSR.service";
import { ServiceRequest } from "../../models/servicerequest";

require("dotenv").config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: process.env.MAILGUN_DOMAIN!,
});

export class UpcomingServiceController {
  
  public constructor (private readonly upcomingService: UpcomingService) {
    this.upcomingService = upcomingService;
  }

  public getUpcomingServices: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    if (req.body.userId && req.body.userTypeId === 3)
      return this.upcomingService
        .getAllUpcomingServicerequests(req.body.userId)
        .then((serviceRequests) => {
          if (serviceRequests) {
            if (serviceRequests.length > 0)
              return res.status(200).json(serviceRequests);
            else return res.status(404).json({ message: "no upcoming service requests found" });
          }
          else return res.status(404).json({ message: "no upcoming service requests found" });
        })
        .catch((err: Error) => res.status(500).json({error: err}) );
    else return res.status(401).json({ message: "unauthorised user" });
  };

  public cancelService: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    if (req.body.userId && req.body.userTypeId === 3) {
      if (req.params.SRId)
        return this.upcomingService
          .getServiceRequestDetailById(req.params.SRId)
          .then((serviceRequest) => {
            if (serviceRequest) {
              if (serviceRequest.ServiceProviderId === req.body.userId)
                return this.upcomingService
                  .cancelServiceRequest(req.params.SRId, req.body.userId)
                  .then((updatedrequest) => {
                    if (updatedrequest[0] === 1)
                      return res.status(200).json({ message: "service request cancelled successfully" });
                    else return res.status(422).json({ message: "error in cancelling service request" });
                  })
                  .catch((err: Error) => res.status(500).json({ error: err }) );
              else return res.status(401).json({ message: "unauthorised user" });
            } 
            else return res.status(404).json({ message: "service request detail not found" });
          });
      else return res.status(400).json({ message: "service request id not found" });
    }
    else return res.status(401).json({ message: "unauthorised user" });
  };

  public completeServiceRequest: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    if (req.body.userId && req.body.userTypeId === 3) {
      if (req.params.SRId)
        return this.upcomingService
          .getServiceRequestDetailForCompleteRequest(req.params.SRId)
          .then((serviceRequest) => {
            if (serviceRequest) {
              if (serviceRequest.ServiceProviderId === req.body.userId) {
                return this.upcomingService
                  .isRequestTimeLessThanCurrentDateAndTime(serviceRequest)
                  .then((serviceRequest: ServiceRequest | null) => {
                    if (serviceRequest)
                      return this.upcomingService
                        .completeServiceRequest(req.params.SRId,req.body.userId)
                        .then((updatedrequest) => {
                          if (updatedrequest[0] === 1)
                            return res.status(200).json({ message: "service request completed successfully" });
                          else return res.status(422).json({ message: "error in updating service request" });
                        })
                        .catch((err: Error) => res.status(500).json({ error: err }) );
                    else return res.status(400).json({ message: "You can not complete service request before end time" });
                  })
                  .catch((err: Error) => res.status(500).json({ error: err }) );
              }
              else return res.status(401).json({ message: "unauthorised user" });
            }
            else return res.status(404).json({ message: "service request detail not found" });
          });
      else return res.status(400).json({ message: "service request id not found" });
    }
    else return res.status(401).json({ message: "unauthorised user" });
  };

  public getServiceRequestDetailById: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    const Id = parseInt(req.params.SRId);
    if (req.body.userTypeId === 3)
      return this.upcomingService
        .getServiceDetailById(Id)
        .then((serviceRequestDetail) => {
          if (serviceRequestDetail?.ServiceProviderId === req.body.userId)
            return res.status(200).json(serviceRequestDetail);
          else return res.status(404).json({ message: "No service request detail found for this request" });
        })
        .catch((err: Error) => res.status(500).json({error: err}) );
    else return res.status(401).json({ message: "Unauthorised User" });
  };
}