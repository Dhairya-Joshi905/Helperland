import mailgun from "mailgun-js";
import { Request, Response, RequestHandler, NextFunction } from "express";

import { BlockCustomerService } from "./blockUser.service";

import { FavoriteAndBlocked } from "../../models/favoriteandblocked";

require("dotenv").config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: process.env.MAILGUN_DOMAIN!,
});

export class BlockCustomerController {

  public constructor (private readonly blockCustomerService: BlockCustomerService) {
    this.blockCustomerService = blockCustomerService;
  }

  public PastCustomersOfSP: RequestHandler = async(req: Request, res: Response): Promise<Response> => {
    if (req.body.userTypeId === 3 && req.body.userId) {
      const customers = await this.blockCustomerService.getPastCustomersOfSP(req.body.userId)!;
      if (customers) {
        if (customers.length > 0)
          return res.status(200).json(customers);
        else return res.status(401).json({ message: "customers not found" });
      }
      else return res.status(404).json({ message: "customers not found" });
    }
    else return res.status(401).json({ message: "Unauthorised User" });
  };

  public BlockCustomer: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
    if (req.body.userTypeId === 3 && req.body.userId) {
      req.body.TargetUserId = req.params.UserId;
      if (req.body.IsBlocked) {
        const inCustomerList: boolean = await this.blockCustomerService.hasSPWorkedForCustomer(req.body.userId, req.params.UserId);
        if (inCustomerList)
          return this.blockCustomerService
            .getBlockedCustomer(req.body.userId,req.params.UserId)
            .then((blockedCustomer: FavoriteAndBlocked | null) => {
              if (blockedCustomer && blockedCustomer.IsBlocked)
                return res.status(201).json({message:'customer is already blocked.'})
              else if (blockedCustomer && blockedCustomer.IsBlocked === false)
                return this.blockCustomerService
                  .updateBlockedCustomer(req.body.userId, req.params.UserId)
                  .then((updatedCustomer: [number, FavoriteAndBlocked[]]) => {
                    if (updatedCustomer[0] === 1)
                      return res.status(200).json({message:'customer unblocked'});
                    else return res.status(422).json({message:'error in adding blocked list'});
                  })
                  .catch((err: Error) => {
                    console.log(err);
                    return res.status(500).json({error: err});
                  })
              else {
                req.body.UserId = req.body.userId;
                req.body.IsFavorite = false;
                return this.blockCustomerService
                  .createBlockUnblockCustomer(req.body)
                  .then((createdBlockedCustomer: FavoriteAndBlocked) => {
                    if (createdBlockedCustomer)
                      return res.status(200).json(createdBlockedCustomer);
                    else return res.status(404).json({message:'error in creating data'});
                  })
                  .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({error: error});
                  });
              }
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json({error: error});
            });
        else return res.status(400).json({message: 'SP has not worked for this customer'});
      }
      else next();
    }
    else return res.status(401).json({ message: "Unauthorised User" });
  };

  public UnblockCustomer: RequestHandler = async (req: Request, res: Response):Promise<Response> => {
      if (req.body.IsBlocked === false) {
        return this.blockCustomerService
          .getBlockedCustomer(req.body.userId, req.params.UserId)
          .then((blockedCustomer: FavoriteAndBlocked | null) => {
            if (blockedCustomer && blockedCustomer.IsBlocked)
              return this.blockCustomerService
                .unblockCustomer(req.body.userId, req.params.UserId)
                .then((updatedCustomer: [number, FavoriteAndBlocked[]]) => {
                  if (updatedCustomer[0] === 1)
                    return res.status(200).json({message:'customer successfull added in unblock list'});
                  else return res.status(422).json({message:'error in adding unblocke list'});
                })
                .catch((error: Error) => {
                  console.log(error);
                  return res.status(500).json({error: error});
                })
            else if (blockedCustomer && blockedCustomer.IsBlocked === false)
              return res.status(201).json({message:'customer is already unblocked'})
            else return res.status(404).json({message:'no customer in blocklist to unblock'});
          })
          .catch((err: Error) => {
            console.log(err);
            return res.status(500).json({error: err});
          });
      }
      else return res.status(400).json({message:'proper input not found in request body'});
  };
}
