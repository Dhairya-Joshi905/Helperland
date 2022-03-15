import { FavoriteProsRepository } from "./favoritepros.repository";

import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";

export class FavoriteProsService {
  public constructor (private readonly favoriteProsRepository: FavoriteProsRepository) {
    this.favoriteProsRepository = favoriteProsRepository;
  };

  public async getAllSRByUserId (userId: number): Promise<ServiceRequest[]> {
    return this.favoriteProsRepository.getAllSRByUserId(userId);
  }

  public async getAllPastSP (userId: number[]): Promise<User[] | null> {
    return this.favoriteProsRepository.getAllPastSP(userId);
  }

  public async getFavSP (userId: number, helperId: number): Promise<FavoriteAndBlocked | null> {
    return this.favoriteProsRepository.getFavSP(userId, helperId);
  }

  public async createFavSP (favorite: { [key: number|string]: FavoriteAndBlocked }): Promise<FavoriteAndBlocked | null> {
    return this.favoriteProsRepository.createFavSP(favorite);
  }

  public async updateFavSP (favorite: FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]]> {
    return this.favoriteProsRepository.updateFavSP(favorite);
  }

  public async updateBlockedSP (blocked: FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]]> {
    return this.favoriteProsRepository.updateBlockedSP(blocked);
  }

  // Local services
  public getAllPastSPId (sRequest: ServiceRequest[]) {
    const helperId: number[] = [];
    for (let sr in sRequest) 
      if (sRequest[sr].Status === 3 && sRequest[sr].ServiceProviderId != null)
        helperId.push(sRequest[sr].ServiceProviderId);
    return helperId;
  } 
}