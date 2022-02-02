import  {db} from "../models/index";
import { ContactUs } from "../models/contactus";

export class ContactUsRepository {
    public async createContactUs(ContactUs: ContactUs): Promise<ContactUs> {
        return db.ContactUs.create(ContactUs);
    }
    
    public async getContactUsById(ContactUsId: number): Promise<ContactUs | null> {
        return db.ContactUs.findOne({ where: {id: ContactUsId}});
    }

    public async getAllContactUs(): Promise<ContactUs[]> {
        return db.ContactUs.findAll();
    }

    public async updateContactUs(ContactUs: ContactUs, ContactUsId: number): Promise<[number, ContactUs[]]> {
        return db.ContactUs.update(ContactUs, { where: {id: ContactUsId}});
    }

    public async deleteContactUs(ContactUsId: number): Promise<number> {
        return db.ContactUs.destroy({ where: {id: ContactUsId}});  
    }
    
}
