import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";
import {Request, Response, RequestHandler} from "express";

import { ServiceHistoryService } from "./servicehistory.service";

// import { db } from "../../models";
import { ServiceRequest } from "../../models/servicerequest";
import { Rating } from "../../models/rating";

let email: string[] = [];
require("dotenv").config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: process.env.MAILGUN_DOMAIN!,
});

export class ServiceHistoryController {
  public constructor (private readonly serviceHistoryService: ServiceHistoryService) {
    this.serviceHistoryService = serviceHistoryService;
  }

  public getSRHistory: RequestHandler = async(req: Request, res: Response): Promise<Response> => {
    return this.serviceHistoryService
      .getSRHistory(parseInt(req.body.userId))
      .then((requestHistory: ServiceRequest[] | null) => {
        if(requestHistory) {
          if(requestHistory.length>0) {
            const pastDateHistory = this.serviceHistoryService.compareWithCurrentDate(requestHistory);
            if(requestHistory.length>0)
              return res.status(200).json(pastDateHistory);
            else
              return res.status(404).json({ message:'Service request history not found in past' });
          }
          else
            return res.status(404).json({ message:'Service request history not found' });
        }
        else
          return res.status(404).json({ message:'Service request history not found' });
      })
      .catch((err: Error) => {
        console.log(err);
        return res.status(500).json({error: err});
      });
  };


  public getSRDetail: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    // console.log(req.body);
    const Id = parseInt(req.params.id);
    if (req.body.userTypeId === 4)
      return this.serviceHistoryService
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


  public rateSP: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    const serviceId = parseInt(req.params.serviceId);
    req.body.RatingDate = new Date();
    return this.serviceHistoryService
      .getRatingBySRId(serviceId)
      // Cannot find name 'Rating'.ts(2304)
      .then((ratings: Rating | null) => {
        if (ratings)
          return res.status(201).json({ message: 'ratings already set for this service request' });
        else {
          if (req.params.serviceId)
            return this.serviceHistoryService
              .getSRDetail(serviceId)
              .then((serviceRequest: ServiceRequest | null) => {
                if (serviceRequest) {
                  req.body.ServiceRequestId = serviceRequest.ServiceRequestId;
                  if (req.body.userTypeId === 4 && req.body.userId === serviceRequest.UserId) {
                    req.body.RatingFrom = serviceRequest.UserId;
                    if (serviceRequest.Status === 3 && serviceRequest.ServiceProviderId) {
                      req.body.RatingTo = serviceRequest.ServiceProviderId;
                      req.body.Ratings = this.serviceHistoryService.getRatings(req.body);
                      // console.log(req.body);
                      return this.serviceHistoryService
                        .giveRating(req.body)
                        .then((rating: Rating) => {
                          return res.status(200).json(rating);
                        })
                        .catch((err: Error) => {
                          console.log(err);
                          return res.status(500).json({ error: err });
                        });
                    }
                    else
                      return res.status(400).json({ message: 'service request not completed or service provider not found' });
                  }
                  else
                    return res.status(401).json({ message: 'unauthorised user' });
                }
                else
                  return res.status(404).json({ message: 'srvice request not found' });
              })
              .catch((err: Error) => {
                console.log(err);
                return res.status(500).json({ error: err });
              })
          else
            return res.status(404).json({ message: 'srvice request id not found' });
        }
      })
      .catch((err: Error) => {
        console.log(err);
        return res.status(500).json({ error: err });
      });   
  };
}