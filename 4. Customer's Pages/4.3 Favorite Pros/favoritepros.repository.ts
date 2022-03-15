import { Op } from "sequelize";

import { db } from "../../models/index";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";

export class FavoriteProsRepository {

  public async getAllSRByUserId (userId: number): Promise<ServiceRequest[]> {
    return db.ServiceRequest.findAll({ where: { UserId: userId } });
  }

  public async getAllPastSP (userId: number[]): Promise<User[] | null> {
    return db.User.findAll({
      where: { UserTypeId: 3,  UserId: { [Op.or]: userId } },
      include:'TargetUserId'
    });
  }

  public async getFavSP (userId: number, helperId: number): Promise<FavoriteAndBlocked | null> {
    return db.FavoriteAndBlocked.findOne({where: {UserId: userId, TargetUserId:helperId } });
  }

  public async createFavSP (favorite:{ [key: number|string]: FavoriteAndBlocked }): Promise<FavoriteAndBlocked | null> {
    return db.FavoriteAndBlocked.create(favorite);
  }

  public async updateFavSP (favorite: FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]]> {
    return db.FavoriteAndBlocked.update(
      { IsFavorite: favorite.IsFavorite },
      { where: { UserId: favorite.UserId, TargetUserId: favorite.TargetUserId } }
    );
  }

  public async updateBlockedSP (blocked: FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]]> {
    return db.FavoriteAndBlocked.update(
      { IsBlocked: blocked.IsBlocked },
      { where: { UserId: blocked.UserId, TargetUserId: blocked.TargetUserId } }
    );
  }
}