import bcrypt from "bcrypt";
import { Request, Response, RequestHandler } from "express";

import { MySettingsService } from "./mySettings.service";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";

require("dotenv").config();

export class MySettingsController {
  
  public constructor (private readonly mySettingsService: MySettingsService) {
    this.mySettingsService = mySettingsService;
  }

  public getUDById: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    const UserId: number = parseInt(req.body.userId);
    if (UserId && req.body.userTypeId === 3) {
      return this.mySettingsService
        .getUserDetailById(UserId)
        .then((userDetail: Object | null) => {
          if (userDetail)
            return res.status(200).json(userDetail);
          else return res.status(404).json({ message: 'detail not found' });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ error: error });
        });
    }
    else return res.status(400).json({ message: 'proper input not found in request' });
  };

  public updateUDById: RequestHandler = async(req: Request, res: Response, next):Promise<Response|void> => {
    if (req.body.userId && req.body.userTypeId === 3) {
      req.body.DateOfBirth = this.mySettingsService.convertStringToDate(req.body.DateOfBirth);
      return this.mySettingsService
        .updateUDbyId(req.body.userId, req.body)
        .then((updatedUser: [number, User[]]) => {
          if (updatedUser)
            next();
          else return res.status(422).json({ message: 'error in updating user detail' });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ error: error });
        });
    }
    else return res.status(400).json({ message: 'proper input not found in request' });
  };

  public CreateUpdateAddress: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    const UserId = parseInt(req.body.userId); 
    if (UserId && req.body.userTypeId === 3) {
      return this.mySettingsService
        .getSPAddressById(UserId)
        .then((userAddress: UserAddress | null) => {
          if (userAddress)
            return this.mySettingsService
              .updateAddress(userAddress.AddressId, req.body)
              .then((updatedAddress: [number, UserAddress[]]) => {
                if (updatedAddress)
                  return res.status(200).json({message:'details updated successfully'});
                else return res.status(422).json({ message: 'error in updating address' });
              })
              .catch((error) => {
                console.log(error);
                return res.status(500).json({ error: error });
              });
          else
            return this.mySettingsService
              .createAddress(UserId, req.body)
              .then((address: UserAddress) => {
                if (address)  return res.status(200).json(address);
                else          return res.status(500).json({message:'error in creating address'});
              })
              .catch((error) => {
                console.log(error);
                return res.status(500).json({ error: error });
              });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ error: error });
        })
    }
    else return res.status(400).json({ message: 'input problem in request' });
  };

  public changePassword: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    if (req.body.userId && req.body.userTypeId === 3)
      return this.mySettingsService
        .getUserById(req.body.userId)
        .then(async (user: User | null) => {
          if (user) {
            const match = await bcrypt.compare(req.body.OldPassword, user.Password!);
            if (match) {
              if (req.body.NewPassword === req.body.ConfirmPassword){
                const hashedPassword = await bcrypt.hash(req.body.NewPassword, 10);
                return this.mySettingsService
                  .changePassword(req.body.userId, hashedPassword)
                  .then((changedPassword: [number, User[]]) => {
                    if (changedPassword) {
                      if (changedPassword[0] ===1)
                        return res.status(200).json({message:'password changed successfully'}); 
                      else return res.status(404).json({message:'error in changing password'});
                    }
                    else return res.status(404).json({message:'error in changing password'});
                  })
                  .catch((error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                  })
              }
              else return res.status(400).json({ message: 'New Password and Confirm Password must be same' });
            }
            else return res.status(400).json({ message: 'Incorrect old password' });
          }
          else return res.status(404).json({ message: 'user not found' });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ error: error });
        })
    else return res.status(400).json({ message: 'input problem in request' });
  };
}