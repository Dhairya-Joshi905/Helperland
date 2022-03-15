import mailgun from "mailgun-js";
import {Request, Response, RequestHandler} from "express";

import { DashboardService } from "./dashboard.service";

import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";

require("dotenv").config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: process.env.MAILGUN_DOMAIN!,
});

export class DashboardController {

  public constructor (private readonly dashboardService: DashboardService) {
    this.dashboardService = dashboardService;
  }

  public getDashboard: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    // console.log(req.body);
    // let request: ServiceRequest[] = [];
    if (req.body.userTypeId === 4)
      return this.dashboardService
        .getDashboard(req.body.userId)
        .then((serviceRequestArray: ServiceRequest[] | null) => {
          if (serviceRequestArray) {
            if (serviceRequestArray.length > 0)
              return res.status(200).json(serviceRequestArray);
            else
              return res.status(404).json({ message: "No pending service request found" });
          }
          else
            return res.status(404).json({ message: "No service request found for this user" });
        })
        .catch((err: Error) => {
          console.log(err);
          return res.status(500).json({ error: err });
        });
    else
      return res.status(401).json({ message: "Unauthorised User" });
  };

  public getSRDetail: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    // converts its first argument to a string, parses that string, then returns an integer or NaN
    const Id = parseInt(req.params.id);
    if (req.body.userTypeId === 4)
      return this.dashboardService
        .getSRDetail(Id)
        .then((serviceRequestDetail: ServiceRequest | null) => {
          if (serviceRequestDetail?.UserId === req.body.userId)
            return res.status(200).json(serviceRequestDetail);
          else
            return res.status(404).json({ message: "No service request detail found for this request" });
        })
        .catch((err: Error) => {
          console.log(err);
          return res.status(500).json({ error: err });
        });
    else
      return res.status(401).json({ message: "Unauthorised User" });
  };

  public rescheduleSR: RequestHandler = async (req: Request, res: Response, next): Promise<Response | undefined> => {
    const serviceId = req.params.serviceId;
    const greaterThanPresentTime = this.dashboardService.compareWithCurrentDate(req.body.date);
    if (greaterThanPresentTime) {
      if (req.body.userTypeId === 4)
        return this.dashboardService
          .getSRDetail(parseInt(serviceId))
          .then((serviceRequest: ServiceRequest | null) => {
            if (serviceRequest) {
              req.body.totalHour = serviceRequest.ExtraHours + serviceRequest.ServiceHours;
              if (serviceRequest.UserId === req.body.userId) {
                if (serviceRequest.ServiceProviderId) {
                  req.body.spId = serviceRequest.ServiceProviderId;
                  return this.dashboardService
                    .getSPDashboard(serviceRequest.ServiceProviderId)
                    .then(async (serviceRequestArray: ServiceRequest[] | null) => {
                      if (serviceRequestArray) {
                        const {srDate, matched, startTime, endTime} = await this.dashboardService.isSPBusy(req.body.date, serviceRequestArray, req.body.totalHour, req.body.time);
                        if (matched)
                          return res.status(200).json({
                              message: "Service provider is busy with another service request on " + srDate +" from " + startTime + " to " + endTime +
                              ". Either choose another date or schedule on a different time."});
                        else
                          next();
                      }
                      else
                        next();
                    })
                    .catch((err: Error) => {
                      return res.status(500).json({ error: err });
                    });
                }
                else
                  next();
              }
              else
                return res.status(404).json({ message: "No data found" });
            }
            else
              return res.status(404).json({ message: "Service request not found" });
          })
          .catch((err: Error) => {
            console.log(err);
            return res.status(500).json({ error: err });
          });
      else
        return res.status(401).json({ message: "Unauthorised User" });
    }
    else
      return res.status(400).json({ message: "Entered time is less than or equal to present time." });
  };

  public rescheduleByCustomer: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    const date: string = req.body.date.split("-").reverse().join("-");
    const { spId } = req.body;
    if (req.params.serviceId)
      return this.dashboardService
        .rescheduleSR(new Date(date), req.body.time, parseInt(req.params.serviceId))
        .then((serviceRequestArray: [number, ServiceRequest[]]) => {
          if (serviceRequestArray.length > 0) {
            if (spId)
              return this.dashboardService
                .getSPById(spId)
                .then((serviceProvider: User | null) => {
                  if (serviceProvider?.Email) {
                    const data = this.dashboardService.createEmailData(req.body.date, req.body.time, serviceProvider.Email, req.params.serviceId);
                    mg.messages().send(data, function (err: mailgun.Error, body) {
                      if (err)
                        return res.json({ error: err.message });
                    });
                    return res.status(200).json({ message: "Sevice Request reschedule successful." });
                  }
                  else
                    return res.status(404).json({ message: "No Service Provider found with this email." });
                })
                .catch((err: Error) => {
                  console.log(err);
                  return res.status(500).json({ error: err });
                });
            return res.status(200).json({ message: "Sevice Request reschedule successful." });
          }
          else
            return res.status(422).json({ message: 'serviceRequestArray is empty' });
        })
        .catch((err: Error) => {
          console.log(err);
          return res.status(500).json({ error: err });
        });
    else
      return res.status(404).json({ message: "service request id not found" });
  };

  public cancelSR: RequestHandler = async (req: Request, res: Response): Promise<Response | void> => {
    const {srId} = req.params;
    if (srId)
      return this.dashboardService
        .getSRDetail(parseInt(srId))
        .then((serviceRequest: ServiceRequest | null) => {
          if (serviceRequest) {
            if (serviceRequest.Status === 4)
              return res.status(201).json({ message: "service request already canceled" });
            else if (serviceRequest.Status === 3)
              return res.status(201).json({ message: "completed service request can not canceled" });
            else {
              if (serviceRequest.UserId === req.body.userId)
                return this.dashboardService
                  .updateSRStatus(parseInt(srId))
                  .then((serviceRequestArray: [number, ServiceRequest[]]) => {
                    if (serviceRequestArray.length > 0) {
                      if (serviceRequest.ServiceProviderId)
                        return this.dashboardService
                          .getSPById(serviceRequest.ServiceProviderId)
                          .then((serviceProvider: User | null) => {
                            if (serviceProvider?.Email) {
                              const data = this.dashboardService.cancelRequestData(serviceProvider.Email, srId);
                              mg.messages().send(data, function (err, body) {
                                if (err)
                                  return res.json({ error: err.message });
                              });
                              return res.status(200).json({ message: "Service Request cancelled successfully." });
                            }
                            else
                              return res.status(404).json({ message: "No Service Provider found with this email." });
                          })
                          .catch((err: Error) => {
                            console.log(err);
                            return res.status(500).json({ error: err });
                          });
                      else
                        return res.status(201).json({ message: "service request cancelled successfully" });
                    }
                    else
                      return res.status(422).json({ message: "error in canceling service request" });
                  })
                  .catch((err: Error) => {
                    console.log(err);
                    return res.status(500).json({ error: err });
                  });
              else
                return res.status(401).json({ message: "unauthorised user" });
            }
          }
          else
            return res.status(404).json({ message: "service request not found" });
        })
        .catch((err: Error) => {
          console.log(err);
          return res.status(500).json({ error: err });
        });
    else
      return res.status(404).json({ message: "service request id not found" });
  };
}
