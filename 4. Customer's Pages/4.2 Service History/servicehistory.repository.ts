import { Op } from "sequelize";

import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { Rating } from "../../models/rating";

export class ServiceHistoryRepository {

    public async getSRHistory (userId: number): Promise<ServiceRequest[] | null> {
        return db.ServiceRequest.findAll({ where: { UserId: userId, Status: { [Op.or]: [3, 4] }}});
    }

    public async getSRDetail (srId: number): Promise<ServiceRequest | null> {
        return db.ServiceRequest.findOne({ where: { ServiceRequestId: srId }, include: ["ServiceRequestAddress", "ExtraService"] });
    }

    public async giveRating (ratings: { [key: number|string]: Rating }): Promise<Rating> {
        return db.Rating.create(ratings);
    }

    public async getRatingBySRId (serviceRequestId: number): Promise<Rating | null> {
        return db.Rating.findOne({ where: { ServiceRequestId: serviceRequestId } });
    }
}