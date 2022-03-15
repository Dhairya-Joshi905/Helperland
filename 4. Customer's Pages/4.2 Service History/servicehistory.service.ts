// import jwt from "jsonwebtoken";
import moment from "moment";

import { ServiceHistoryRepository } from "./servicehistory.repository";

// import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { Rating } from "../../models/rating";
import { ServiceRequest } from "../../models/servicerequest";
// import { UserAddress } from "../../models/useraddress";
// import { User } from "../../models/user";

export class ServiceHistoryService {
  public constructor (private readonly serviceHistoryRepository: ServiceHistoryRepository) {
    this.serviceHistoryRepository = serviceHistoryRepository;
  };

  public async getSRHistory (userId: number): Promise<ServiceRequest[] | null> {
    return this.serviceHistoryRepository.getSRHistory(userId);
  };

  public async getSRDetail (srId: number): Promise<ServiceRequest | null> {
    return this.serviceHistoryRepository.getSRDetail(srId);
  };

  public async giveRating (ratings: { [key: number|string]: Rating }): Promise<Rating> {
    return this.serviceHistoryRepository.giveRating(ratings);
  };

  public async getRatingBySRId (srId: number): Promise<Rating | null> {
    return this.serviceHistoryRepository.getRatingBySRId(srId);
  };

  // local services

  public compareWithCurrentDate(requestHistory:ServiceRequest[]) {
    const srHistory: ServiceRequest[] = [];
    const formatedDate2 = new Date(moment(new Date()).format("YYYY-MM-DD"));
    // console.log(formatedDate2);
    for(let sr in requestHistory) {
      const date = requestHistory[sr].ServiceStartDate;
      const formatedDate1 = new Date(moment(date).format("YYYY-MM-DD"));
      // console.log(formatedDate1);
      if (formatedDate1 < formatedDate2)
        srHistory.push(requestHistory[sr]);
      // console.log(srHistory);
    }
    return srHistory;  
  };

  public getRatings (body: any) {
    const Ratings = (body.OnTimeArrival + body.Friendly + body.QualityOfService) / 3;
    return Ratings;
  }
}
