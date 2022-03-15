import mailgun from "mailgun-js";
import { Request, Response, RequestHandler } from "express";

import { FavoriteProsService } from "./favoritepros.service";

import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";

require("dotenv").config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: process.env.MAILGUN_DOMAIN!,
});

export class FavoriteProsController {
  public constructor (private readonly favoriteProsService: FavoriteProsService) {
    this.favoriteProsService = favoriteProsService;
  }

  public getAllSPWorkedWithCustomer: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    if (req.body.userId && req.body.userTypeId === 4) {
      return this.favoriteProsService
        .getAllSRByUserId(req.body.userId)
        .then((serviceRequest: ServiceRequest[]) => {
          const helperId = this.favoriteProsService.getAllPastSPId(serviceRequest);
          if (helperId.length > 0)
            return this.favoriteProsService
              .getAllPastSP(helperId)
              .then((helpers: User[] | null) => {
                if (helpers && helpers.length > 0)
                  return res.status(200).json(helpers);
                else
                  return res.status(404).json({ message: "no past sp found" });
              })
              .catch((err: Error) => {
                console.log(err);
                return res.status(500).json({ error: err });
              });
          else
            return res.status(404).json({ message: "no past sp found" });
        })
        .catch((err: Error) => {
          console.log(err);
          return res.status(500).json({ error: err });
        });
    }
    else
      return res.status(401).json({ message: "unauthorised user" });
  };

  public createFavoriteHelper: RequestHandler = async (req: Request, res: Response, next): Promise<Response | void> => {
    const userId = parseInt(req.body.userId);
    const helperId = parseInt(req.params.helperId);

    if (req.body.userId && req.body.userTypeId === 4) {
      req.body.UserId = userId;
      req.body.TargetUserId = helperId;
      return this.favoriteProsService
        .getAllSRByUserId(req.body.userId)
        .then((serviceRequest: ServiceRequest[]) => {
          const helperIds = this.favoriteProsService.getAllPastSPId(serviceRequest);
          if (helperIds.length > 0) {
            const inHelperArray = helperIds.includes(parseInt(req.params.helperId));
            if (inHelperArray) {
              if (req.body.IsFavorite) {
                return this.favoriteProsService
                  .getFavSP(userId, helperId)
                  .then((favorite: FavoriteAndBlocked | null) => {
                    if (favorite) {
                      if (favorite.IsFavorite)
                        return res.status(409).json({ message: "SP already in favorite list" });
                      else
                        return this.favoriteProsService
                          .updateFavSP(req.body)
                          .then((favorite: [number, FavoriteAndBlocked[]]) => {
                            if (favorite.length > 0)
                              res.status(201).json({ message: "favorite SP updated successfully" });
                            else
                              res.status(502).json({ message: "error setting favorite helper" });
                          })
                          .catch((err: Error) => {
                            console.log(err);
                            return res.status(500).json({ error: err });
                          });
                    }
                    else {
                      req.body.IsBlocked = false;
                      return this.favoriteProsService
                        .createFavSP(req.body)
                        .then((favoriteHelper: FavoriteAndBlocked | null) => {
                          if (favoriteHelper)
                            return res.status(200).json({ message: "favorite sp created successfully" });
                          return res.status(502).json({ message: "error creating favorite sp" });
                        })
                        .catch((err: Error) => {
                          console.log(err);
                          return res.status(500).json({ error: err });
                        });
                    }
                  })
                  .catch((err: Error) => {
                    console.log(err);
                    return res.status(500).json({ error: err });
                  });
              }
              else if (req.body.IsFavorite === false)
                next();
              else
                return res.status(404).json({ message: "content not found" });
            }
            else
              return res.status(404).json({ message: "this service provider has not worked with customer in past" });
          }
          else
            return res.status(404).json({ message: "no service provider found worked with customer in past" });
        })
        .catch((err: Error) => {
          console.log(err);
          return res.status(500).json({ error: err });
        });
    }
    else
      return res.status(401).json({ message: "unauthorised user" });
  };

  public removeFavSP: RequestHandler = async (req: Request, res: Response): Promise<Response|void> => {
    return this.favoriteProsService
      .getFavSP(req.body.UserId, req.body.TargetUserId)
      .then((favorite: FavoriteAndBlocked | null) => {
        if (favorite) {
          if (favorite.IsFavorite)
            return this.favoriteProsService
              .updateFavSP(req.body)
              .then((favoriteStatus: [number, FavoriteAndBlocked[]]) => {
                if (favoriteStatus)
                  res.status(201).json({ message: "favorite sp updated successfully." });
                else
                  res.status(502).json({ message: "error updating favorite sp." });
              })
              .catch((err: Error) => {
                return res.status(500).json({ error: err });
              });
          else if (favorite.IsFavorite === false)
            return res.status(409).json({ message: 'sp already in unfavorite list' });
          else
            return res.status(404).json({ message: "no sp to remove from favorite list" });
        }
        else
          return res.status(404).json({ message: "no sp in you favorite list" });
      })
      .catch((err: Error) => {
        return res.status(500).json({ error: err });
      });
  };

  public blockSP: RequestHandler = async(req: Request, res: Response, next):Promise<Response|void> => {
    if (req.body.userId && req.body.userTypeId === 4) {
      req.body.UserId = req.body.userId;
      req.body.TargetUserId = req.params.helperId;
      return this.favoriteProsService
        .getAllSRByUserId(req.body.userId)
        .then((serviceRequest: ServiceRequest[]) => {
          const helperIds = this.favoriteProsService.getAllPastSPId(serviceRequest);
          if (helperIds.length > 0) {
            const inHelperArray = helperIds.includes(parseInt(req.params.helperId));
            if (inHelperArray) {
              if (req.body.IsBlocked) {
                return this.favoriteProsService
                  .getFavSP(req.body.UserId, req.body.TargetUserId)
                  .then((fAndBHelper: FavoriteAndBlocked | null) => {
                    if (fAndBHelper) {
                      if(fAndBHelper.IsBlocked)
                        return res.status(409).json({message: "sp already blocked list"});
                      else
                        return this.favoriteProsService
                          .updateBlockedSP(req.body)
                          .then((updatedHelper: [number, FavoriteAndBlocked[]]) => {
                            if (updatedHelper.length > 0)
                              res.status(201).json({ message: "sp added to blocked list." });
                            else
                              res.status(502).json({ message: "error adding sp to blocked list." });
                          })
                          .catch((err: Error) => {
                            console.log(err);
                            return res.status(500).json({ error: err });
                          });
                    }
                    else {
                      req.body.IsFavorite = false;
                      return this.favoriteProsService
                        .createFavSP(req.body)
                        .then((blockedHelper: FavoriteAndBlocked | null) => {
                          if (blockedHelper)
                            return res.status(200).json({ message: "blocked sp created successfully." });
                          return res.status(502).json({ message: "error creating blocked helper." });
                        })
                        .catch((err: Error) => {
                          console.log(err);
                          return res.status(500).json({ error: err });
                        });
                    }
                  })
                  .catch((err: Error) => {
                    console.log(err);
                    return res.status(500).json({ error: err });
                  });
              }
              else if (req.body.IsBlocked === false)
                next();
              else
                return res.status(404).json({ message: "content not found" });
            }
            else
              return res.status(404).json({ message: "sp not worked with customer in past." });
          }
          else
            return res.status(404).json({ message: "no service provider found who has worked with customer in past." });
        })
        .catch((err: Error) => {
          console.log(err);
          return res.status(500).json({ error: err });
        });
    }
    else
      return res.status(401).json({ message: "unauthorised user" });
  };

  public removeBlockedHelper: RequestHandler = async(req: Request, res: Response): Promise<Response|void> => {
    return this.favoriteProsService
      .getFavSP(req.body.UserId, req.body.TargetUserId)
      .then((blocked: FavoriteAndBlocked | null) => {
        if (blocked) {
          if (blocked.IsBlocked)
            return this.favoriteProsService
              .updateBlockedSP(req.body)
              .then((blockedStatus: [number, FavoriteAndBlocked[]]) => {
                if (blockedStatus.length>0)
                  res.status(200).json({ message: "helper removed from blocked list." });
                else
                  res.status(502).json({ message: "error in removing helper from blocked list." });
              })
              .catch((err: Error) => {
                return res.status(500).json({ error: err });
              });
          else if (blocked.IsBlocked === false)
            return res.status(401).json({message:'helper already in unblocked list'});
          else
            return res.status(404).json({ message: "no helper to remove from blocked list." });
        }
        else
          return res.status(404).json({ message: "no helper in you favorite list" });
      })
      .catch((err: Error) => {
        return res.status(500).json({ error: err });
      });
  }
}