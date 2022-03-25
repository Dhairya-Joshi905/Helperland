import { User } from "../../models/user";
import { BlockCustomerRepository } from "./blockUser.repository";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { ServiceRequest } from "../../models/servicerequest";

type Customer = {
  UserId: number,
  Name: string
}

export class BlockCustomerService {
  public constructor (private readonly blockCustomerRepository: BlockCustomerRepository) {
    this.blockCustomerRepository = blockCustomerRepository;
  }

  public async getUDByUId (userId: number): Promise<User | null> {
    return this.blockCustomerRepository.getUDByUId(userId);
  }

  public async getBlockedCustomer (SPId: string, customerId: string): Promise<FavoriteAndBlocked | null> {
    return this.blockCustomerRepository.getBlockedCustomer(parseInt(SPId), parseInt(customerId));
  }

  public async getPastCustomersOfSP (helperId: number): Promise<Customer[]> {
    let customer: Customer[] = [];
    const serviceRequest: ServiceRequest[] | null = await this.blockCustomerRepository.getPastCustomersOfSP(helperId);
    if (serviceRequest)
      if (serviceRequest.length > 0)
        for (let sr in serviceRequest) {
          const user: User | null = await this.blockCustomerRepository.getUDByUId(serviceRequest[sr].UserId);
          if (user)
            customer.push({
              Name: user.FirstName! + " " + user.LastName!,
              UserId: user.UserId
            })
        }
    const userIds: number[] = customer.map(Customer => Customer.UserId);
    const filterArray: Customer[] = customer.filter( ({ UserId }, index) => !userIds.includes(UserId, index + 1) );
    return filterArray;
  };

  public async updateBlockedCustomer (SPId: string, customerId: string): Promise<[number, FavoriteAndBlocked[]]> {
    return this.blockCustomerRepository.updateBlockedCustomer(parseInt(SPId), parseInt(customerId));
  }

  public async unblockCustomer (SPId: string, customerId: string): Promise<[number,FavoriteAndBlocked[]]> {
    return this.blockCustomerRepository.unblockCustomer(parseInt(SPId), parseInt(customerId));
  }

  public async createBlockUnblockCustomer (blockCustomer: { [key: number|string]: FavoriteAndBlocked }): Promise<FavoriteAndBlocked> {
    return this.blockCustomerRepository.createBlockUnblockCustomer(blockCustomer);
  }

  public async hasSPWorkedForCustomer (SPId: string, customerId: string): Promise<boolean> {
    let matched: boolean  = false;
    const customerIntId: number = parseInt(customerId);
    let customers: Customer[] = await this.getPastCustomersOfSP(parseInt(SPId));
    if (customers)
      for (let cs in customers) {
        if (customers[cs].UserId === customerIntId) {
          matched = true;
          break;
        }
        else matched = false;
      }
    else matched =  false;
    return matched;
  }
}