import bcrypt from "bcrypt";
import mailgun from "mailgun-js";
import { Request, Response, RequestHandler } from "express";

import { ProfileService } from "./profile.service";

import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";

require("dotenv").config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: process.env.MAILGUN_DOMAIN!,
});

export class ProfileController {
  
  public constructor (private readonly mySettingsService: ProfileService) {
    this.mySettingsService = mySettingsService;
  }

  public getUserDetailById: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    const UserId = parseInt(req.body.userId);
    if (UserId && req.body.userTypeId === 4)
      return this.mySettingsService
        .getUserDetailById(UserId)
        .then((userDetail: User | null) => {
          if(userDetail)
            return res.status(200).json(userDetail);
          else
            return res.status(404).json({message:'User not found'});
        })
        .catch((error) => {
          // console.log(error);
          return res.status(500).json({ error: error });
        });
    else
      return res.status(400).json({ message: 'Maybe user id is not 4.' });
  };

  public updateUserDetailById: RequestHandler = async(req: Request, res: Response): Promise<Response> => {
    if(req.body.userId && req.body.userTypeId === 4) {
      const UserId = parseInt(req.body.userId);
      req.body.DateOfBirth = this.mySettingsService.convertStringToDate(req.body.DateOfBirth);
      return this.mySettingsService
        .updateUserDetailbyId(UserId, req.body)
        .then((updatedUser: [number, User[]]) => {
          if(updatedUser)
            return res.status(200).json(updatedUser);
          else
            return res.status(500).json({ message:'error updating user details' });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err });
        });
    }
    else
      return res.status(400).json({message: 'Maybe user id is not 4.'});
  };

  public getUserAddressesByUserId: RequestHandler = async(req: Request, res: Response): Promise<Response> => {
    const UserId = parseInt(req.body.userId); 
    if (UserId && req.body.userTypeId === 4){
      return this.mySettingsService
        .getUserAddressesById(UserId)
        .then((userAddresses: UserAddress[] | null) => {
          if(userAddresses)
            return res.status(200).json(userAddresses);
          else
            return res.status(404).json({ message:'address not found for this user.' });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err });
        })
    }
    else
      return res.status(400).json({message:'proper input not found in request.' });
  };

  public getUserAddressByAddressId: RequestHandler = async(req: Request, res: Response): Promise<Response> => {
    const addressId = parseInt(req.params.addressId);
    if (addressId && req.body.userTypeId === 4) {
      return this.mySettingsService
        .getUserAddressByAddressId(addressId,req.body.userId)
        .then((userAddress: UserAddress | null) => {
          if (userAddress)
            return res.status(200).json(userAddress);
          else
            return res.status(404).json({ message: 'address not found' });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err });
        })
    }
    else
      return res.status(400).json({ message: 'proper input not found in request.' });
  };

  public updateUserAddressByAddressId: RequestHandler = async(req: Request, res: Response): Promise<Response> => {
    if (req.params.addressId && req.body.userTypeId === 4){
      req.body.Addressline1 = req.body.StreetName;
      req.body.Addressline2 = req.body.HouseNumber;
      return this.mySettingsService
        .updateUserAddressByAddressId(req.params.addressId,req.body.userId, req.body)
        .then((updatedAddress: [number, UserAddress[]]) => {
          if (updatedAddress) {
            // console.log(updatedAddress[0]);
            if(updatedAddress[0] === 1)
              return res.status(201).json({message:'address updated successfully'});
            else
              return res.status(422).json({message:'error in updating information'});
          }
          else
            return res.status(422).json({message:'error in updating information'});
        })
        .catch((err) => {
          // console.log(err);
          return res.status(500).json({ error: err });
        })
    }
    else
      return res.status(400).json({ message: 'proper input not found in request.' });
  };

  public createUserAddress: RequestHandler = async(req: Request, res: Response): Promise<Response> => {
    req.body.IsDeleted = false;
    req.body.IsDefault = false;
    if (req.body.userId && req.body.userTypeId === 4) {
      req.body.Email = req.body.email;
      req.body.UserId = req.body.userId;
      req.body.Addressline1 = req.body.StreetName;
      req.body.Addressline2 = req.body.HouseNumber;
      return this.mySettingsService
        .createUserAddress(req.body)
        .then((createdAddress: UserAddress) => {
          if(createdAddress)
              return res.status(200).json({ message: 'address created successfully.' });
          else
            return res.status(422).json({ message: 'error in creating address.' });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err });
        })
    }
    else
      return res.status(400).json({ message: 'proper input not found in request.' });
  };

  public deleteUserAddressByAddressId: RequestHandler = async(req: Request, res: Response): Promise<Response> => {
    if (req.params.addressId && req.body.userTypeId === 4 ){
      return this.mySettingsService
        .deleteUserAddress(req.params.addressId, req.body.userId)
        .then((deletedAddress: [number, UserAddress[]]) => {
          if (deletedAddress) {
            if (deletedAddress[0] === 1)
              return res.status(200).json({ message: 'address deleted successfully'});
            else
              return res.status(404).json({ message: 'error in deleting address' });
          }
          else
            return res.status(404).json({ message: 'error in deleting address' });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err });
        });
    }
    else
      return res.status(400).json({message:'proper input not found in request'});
  };

  public changeUserPassword: RequestHandler = async(req: Request, res: Response): Promise<Response> => {
    if (req.body.userId && req.body.userTypeId === 4) {
      return this.mySettingsService
        .getUserById(req.body.userId)
        .then(async (user: User | null) => {
          if (user) {
            const match = await bcrypt.compare(req.body.OldPassword, user.Password!);
            if (match) {
              if (req.body.NewPassword === req.body.ConfirmPassword) {
                const hashedPassword = await bcrypt.hash(req.body.NewPassword, 10);
                return this.mySettingsService.changePassword(req.body.userId, hashedPassword)
                .then((changedPassword: [number, User[]]) => {
                  if (changedPassword) {
                    if (changedPassword[0] ===1)
                      return res.status(200).json({ message: 'password changed successfully' }); 
                    else
                      return res.status(404).json({ message: 'error in changing password' });
                  }
                  else
                    return res.status(404).json({ message: 'error in changing password' });
                })
                .catch((err) => {
                  console.log(err);
                  return res.status(500).json({ error: err });
                })
              }
              else
                return res.status(400).json({ message: 'New Password and Confirm Password must be same.' });
            }
            else
              return res.status(400).json({ message: 'Incorrect old password' });
          }
          else
            return res.status(404).json({ message: 'user not found' });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err });
        })
    }
    else
      return res.status(400).json({ message: 'proper input not found in request' });
  };
}