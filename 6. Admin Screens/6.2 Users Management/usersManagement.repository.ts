import { Op } from "sequelize";

import { db } from "../../models/index";
import { User } from "../../models/user";

export class UserManagementRepository {
  public async getAllUsers(): Promise<User[] | null> {
    return db.User.findAll({ where: { UserTypeId: { [Op.or]: [3, 4] } } });
  }

  public async getUDById (userId: number): Promise<User | null> {
    return db.User.findOne({ where: { UserId: userId, UserTypeId: { [Op.or]: [3, 4] } } });
  }

  public async activeUser (userId: number): Promise<[number, User[]]> {
    return db.User.update({ IsActive: true }, { where: { UserId: userId } });
  }

  public async inActiveUser (userId: number): Promise<[number, User[]]> {
    return db.User.update({ IsActive: false }, { where: { UserId: userId } });
  }
}