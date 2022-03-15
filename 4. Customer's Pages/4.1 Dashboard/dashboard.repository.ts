import {db} from "../../models/index";

import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";

export class DashboardRepository {

    public async getSPById (helperId: number): Promise<User | null> {
        return db.User.findOne({ where: { UserId: helperId, UserTypeId: 3 } });
    }

    public async getDashboard (userId: number): Promise<ServiceRequest[] | null> {
        return db.ServiceRequest.findAll({ 
            where: { UserId: userId, Status: 1 },
            include: [
                "HelperRequest",
                "UserRequest",
                "ExtraService",
                "UserRequest",
                "ServiceRequestAddress"
            ]
        });
    }
    
    public async getSRDetail (srId: number): Promise<ServiceRequest | null> {
        return db.ServiceRequest.findOne({
            where: { ServiceRequestId: srId },
            include: ["ServiceRequestAddress", "ExtraService"]
        });
    }

    public async getSPDashboard (spId: number): Promise<ServiceRequest[] | null> {
        return db.ServiceRequest.findAll({ where: { ServiceProviderId: spId } });
    }

    public async rescheduleSR (date: Date, time: string, srviceId: number): Promise<[number, ServiceRequest[]]> {
        return db.ServiceRequest.update(
            { ServiceStartDate: date, ServiceStartTime: time },
            { where: { ServiceRequestId: srviceId } }
        );
    }

    public async updateSRStatus (srviceId: number): Promise<[number, ServiceRequest[]]> {
        return db.ServiceRequest.update({ Status: 4 }, { where: { ServiceRequestId: srviceId } });
    }
}