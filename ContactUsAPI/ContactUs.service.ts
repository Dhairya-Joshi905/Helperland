import { ContactUs } from "../models/contactus";
import { ContactUsRepository } from "./ContactUs.repository";

export class ContactUsService {
    public constructor(private readonly ContactUsRepository: ContactUsRepository) {
        this.ContactUsRepository = ContactUsRepository;
    }

    public async createContactUs(ContactUs: ContactUs): Promise<ContactUs> {
        return this.ContactUsRepository.createContactUs(ContactUs);
    }

    public async getContactUsById(ContactUsId: number): Promise<ContactUs | null> {
        return this.ContactUsRepository.getContactUsById(ContactUsId);
    }

    public async getAllContactUs(): Promise<ContactUs[]> {
        return this.ContactUsRepository.getAllContactUs();
    }

    public async updateContactUs(ContactUs: ContactUs, ContactUsId: number): Promise<[number, ContactUs[]]> {
        return this.ContactUsRepository.updateContactUs(ContactUs, ContactUsId);
    }

    public async deleteContactUs(ContactUsId: number): Promise<number> {
        return this.ContactUsRepository.deleteContactUs(ContactUsId);
    }
}