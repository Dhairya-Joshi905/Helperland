import { displayUser } from "./datatypesExport";

import { UserManagementRepository } from "./usersManagement.repository";

import { User } from "../../models/user";

export class UserManagementService {

  public constructor (private readonly userManRepo: UserManagementRepository) { 
      this.userManRepo = userManRepo; 
  }

  public async getAllUsers(): Promise<displayUser[] | null> {
    let allUsers: displayUser[] = [];
    const users: User[] | null = await this.userManRepo.getAllUsers();
    if (users && users.length > 0) {
      for (let us in users) {
        const userType: string | null = await this.getUserType(users[us].UserTypeId);
        allUsers.push({
          UserId: users[us].UserId,
          Name: users[us].FirstName + " " + users[us].LastName,
          DateOfRegistration: users[us].createdAt.toLocaleDateString(),
          UserType: userType!,
          Phone: users[us].Mobile!,
          PostalCode : users[us].ZipCode!,
          Status: users[us].IsActive
        })
      }
      const sortedSRArray: displayUser[] = allUsers.sort((a: displayUser, b: displayUser) => a.UserId - b.UserId );
      return sortedSRArray;
    }
    else  return null;
  }

  public async getUserType (typeId: number): Promise<string | null> {
    let status: (string | null);
    if (typeId === null)     status = null;
    else if (typeId === 1)   status = 'Super User';
    else if (typeId === 2)   status = 'Admin';
    else if (typeId === 3)   status = 'Service Provider';
    else if (typeId === 4)   status = 'Customer';
    else                     status = 'Invalid Status';
    return status;
  }

  public async activeUser (userId: string): Promise<[number, User[]] | null> {
    const user: User | null = await this.userManRepo.getUDById(parseInt(userId));
    if (user) {
      if (user.IsActive) return null;
      else {
        const activatedUser: [number, User[]] = await this.userManRepo.activeUser(parseInt(userId));
        return activatedUser;
      }
    }
    else  return null;
  }

  public async inActiveUser (userId: string): Promise<[number, User[]] | null> {
    const user: User | null = await this.userManRepo.getUDById(parseInt(userId));
    if (user) {
      if (user.IsActive) {
        const inActivatedUser: [number, User[]] = await this.userManRepo.inActiveUser(parseInt(userId));
        return inActivatedUser;
      }
      else  return null;
    }
    else return null;
  }
}