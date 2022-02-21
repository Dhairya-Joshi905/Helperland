import {db} from "../models/index";
import {ServiceRequest} from "../models/servicerequest";
import {User} from "../models/user";
import {UserAddress} from "../models/useraddress";

export class BookServiceRepository{

    public async getServiceProvidersByZipcode (zipCode:string): Promise<User[]> {
        return db.User.findAll({ where: {UserTypeId: 2, ZipCode: zipCode} });
    }
    
    public async createAddress (userAddress: { [key: number|string]: UserAddress }): Promise<UserAddress> {
        return db.UserAddress.create(userAddress);
    }

    public async getAllAddress (userId: number): Promise<UserAddress[]> {
        return db.UserAddress.findAll({ where: {UserId: userId} });
    }

    public async getUserById (userId: number[]): Promise<User[]> {
        return db.User.findAll({ where: {UserId: userId} });
    }

    public async getUserByEmail (Email: string): Promise<User|null> {
        return db.User.findOne({ where: {Email: Email} }); 
    }

    public async getAllServiceProviders(): Promise<User[]> {
        return db.User.findAll({ where: {UserTypeId: 3} });
    }

    //Service Method

    public async createServiceRequest (ServiceRequest: { [key: number|string]: ServiceRequest }): Promise<ServiceRequest> {
        return db.ServiceRequest.create(ServiceRequest);
    }
}