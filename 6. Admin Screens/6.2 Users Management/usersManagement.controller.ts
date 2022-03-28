import { Request, Response, RequestHandler } from "express";
import { User } from "../../models/user";

import { displayUser } from "./datatypesExport";

import { UserManagementService } from "./usersManagement.service";

require("dotenv").config();

export class UserManagementController {
  
  public constructor (private readonly userManagementService: UserManagementService) {
    this.userManagementService = userManagementService;
  }

  public getAllUsers: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    if (req.body.userTypeId === 2 && req.body.userId)
      return this.userManagementService
        .getAllUsers()
        .then((users: displayUser[] | null) => {
          if (users && users.length > 0)  return res.status(200).json(users);
          else                            return res.status(404).json({ message: "users not found" });
        })
        .catch((err: Error) => {
          console.log(err);
          return res.status(500).json({ error: err });
        });
    else return res.status(401).json({ message: "unauthorised user" });
  };


  public activeInactiveUser: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    if (req.body.userTypeId === 2) {
      if (req.body.Active)
        return this.userManagementService
          .activeUser(req.params.userId)
          .then((activeUser: [number, User[]] | null) => {
            if (activeUser !== null) {
              if (activeUser[0] === 1) return res.status(200).json({ message: "user activated successfully" });
              else                     return res.status(422).json({ message: "error in  activating user" });
            }
            else return res.status(404).json({ message: "user account already active or user not found" });
          })
          .catch((err: Error) => {
            console.log(err);
            return res.status(500).json({ error: err });
          });
      else
        return this.userManagementService
          .inActiveUser(req.params.userId)
          .then((inActiveUser: [number, User[]] | null) => {
            if (inActiveUser !== null) {
              if (inActiveUser[0] === 1)  return res.status(200).json({ message: "user inActive successfully" });
              else                        return res.status(422).json({ message: "error in  inActivating user" });
            }
            else return res.status(404).json({ message: "user account already inActive or user not found" });
          })
          .catch((err: Error) => {
            console.log(err);
            return res.status(500).json({ error: err });
          });
    } 
    else return res.status(401).json({ message: "Unauthorised User" });
  };
}