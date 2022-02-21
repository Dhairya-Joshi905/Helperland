import { User } from "../models/user";
import { UserAddress } from "../models/useraddress";
import { ServiceRequest } from "../models/servicerequest";

import { BookServiceRepository } from "./bookservice.repository";

export class BookService {

  // General Services

  public constructor (private readonly bookServiceRepository: BookServiceRepository) {
    this.bookServiceRepository = bookServiceRepository;
  }

  public async getServiceProvidersByZipCode (ZipCode: string): Promise<User[]> {
    return this.bookServiceRepository.getServiceProvidersByZipcode(ZipCode);
  }

  public async createUserAddress (userAddress: { [key: number|string]: UserAddress }): Promise<UserAddress> {
    return this.bookServiceRepository.createAddress(userAddress);
  }
  
  public async getUserAddress (userId: number): Promise<UserAddress[]> {
    return this.bookServiceRepository.getAllAddress(userId);
  }

  public async getUserById (userId: number[]): Promise<User[]> {
    return this.bookServiceRepository.getUserById(userId);
  }

  public async getAllServiceProviders(): Promise<User[]> {
    return this.bookServiceRepository.getAllServiceProviders();
  }

  public async getUserByEmail (userEmail: string): Promise<User|null> {
    return this.bookServiceRepository.getUserByEmail(userEmail);
  }

  // Service Request Services

  public async createServiceRequest (serviceRequest: { [key: number|string]: ServiceRequest }): Promise<ServiceRequest> {
    return this.bookServiceRepository.createServiceRequest(serviceRequest);
  }

  public getTotal (HourlyRate: number, serviceHour: number): number {
    const subTotal = HourlyRate * serviceHour;
    return subTotal;
  }

  public getTotalCost (ExtraService: number[], SubTotal: number): number {
    // 10 is the rate of extra service
    // Need to do it dynamically
    const TotalCost = ExtraService.length * 10 + SubTotal;
    return TotalCost;
  }
}
