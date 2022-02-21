import { Response, RequestHandler } from "express";
import mailgun from "mailgun-js";

import { UserAddress } from "../models/useraddress";

import { BookService } from "./bookservice.service";

let email: string[] = [];

require("dotenv").config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_APIKEY!,
  domain: process.env.MAILGUN_DOMAIN!
});

export class BookServiceController {
  
  public constructor (private readonly bookService: BookService) {
    this.bookService = bookService;
  }

  public checkZipCode: RequestHandler = async(req, res): Promise<Response> => {
    if (!req.body.postalcode)
      return res.status(400).json({message: "Empty entry"});
    else 
      return this.bookService
        .getAllServiceProviders()
        .then((ServiceProviders) => {
          let Available;

          // Checking if there are any service providers at all.
          if (ServiceProviders) {
            for (let zipcode in ServiceProviders) 
              if (ServiceProviders[zipcode].ZipCode === req.body.postalcode)
                Available = true;
            if (Available)
              return res.status(200);
            else 
              return res.status(404).json({message: "We are not providing service in this area. We will notify you if any service provider would start working near your area."});
          }
          else
            return res.status(301).json({ message: "No service providers are registered with us." });
        })
        .catch((err: Error) => {
          console.log(err);
          return res.status(500).json({error: err});
        });
  };

  public getUserAddress: RequestHandler = async (req: Request, res: Response): Promise<Response|undefined> => {
    let address: UserAddress[] = [];
      return this.bookService
        .getUserByEmail(user.userEmail)
        .then((userByEmail) => {
          if (userByEmail) {
            return this.bookService
              .getUserAddress(userByEmail.UserId)
              .then((users) => {
                if (users.length > 0) {
                  for (let us in users) 
                    if (users[us].PostalCode === user.postalCode) 
                      address.push(users[us]);
                  if (address.length > 0) 
                    return res.status(200).json(address);
                  else
                    return res.status(401).json({ message: "Addresses not found" });
                }
                else
                  return res.status(401).json({ message: "User Addresses not found" });
              })
              .catch((err: Error) => {
                console.log(err);
                return res.status(500).json({error: err});
              });
          }
          else 
            return res.status(301).json("user not fund");
        })
        .catch((err: Error) => {
          console.log(err);
          return res.status(500).json({error: err});
        });
  };

  public createAddress: RequestHandler = async (req: Request, res: Response) => {
    return this.bookService
      .getUserByEmail(user.userEmail)
      .then((user) => {
        if (user) {
          req.body.UserId = user.UserId;
          return this.bookService
            .createUserAddress(req.body)
            .then((address) => {
              return res.status(200).json({message: "User Address created"});
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json({error: err});
            });
        }
        else
          return res.status(404).json({message: "user not found"});
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({error: err});
      });
  };

  public CreateServiceRequest: RequestHandler = async (req, res, next) => {
    req.body.Status = 1;
    req.body.HourlyRate = 20;
    req.body.ExtraHours = req.body.ExtraService.length * 0.5;
    req.body.SubTotal = this.bookService.getSubTotal(
      req.body.ServiceHourlyRate,
      req.body.ServiceHours
    );
    req.body.TotalCost = this.bookService.getTotalCost(
      req.body.ExtraService,
      req.body.SubTotal
    );
    req.body.ServiceRequestAddress.Email = req.body.Email;
    return this.bookService
      .getUserByEmail(req.body.Email)
      .then((user) => {
        if (user) {
          if (user.UserTypeId === 4) {
            req.body.UserId = user.UserId;
            req.body.ModifiedBy = user.UserId;
          }
          else
            return res.status(401).json({message: "unauthorised user"});
        } else {
          return res.status(404).json("User not found");
        }
        return this.bookService
          .createServiceRequest(req.body)
          .then((request) => {
            if (request) {
              return this.bookService
                .getServiceProvidersByZipCode(request.ZipCode)
                .then(async (user) => {
                  if (user.length > 0) {
                      // Await to send email
                      await mg.messages().send(data, function (err, body) {
                        if (err) 
                          return res.json({error: err.message});
                      });
                    }
                    return res.status(200).json({message: "Service booked!"});
                  }
                  // No users found
                  else
                    return res.status(404).json({message: "No users found!"});
                })
                .catch((err: Error) => {
                  console.log(err);
                  return res.status(500).json({error: err});
                });
            }
            else
              return res.status(500).json({message: "Internal Server Error"});
          })
          .catch((err: Error) => {
            console.log(err);
            return res.status(500).json({error: err});
          });
      })
      .catch((err: Error) => {
        console.log(err);
        return res.status(500).json({error: err});
      });
  };
}
