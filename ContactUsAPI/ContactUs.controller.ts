import { Request, Response } from 'express';
import { ContactUs } from "../models/contactus";
import { ContactUsService } from "./ContactUs.service";

export class ContactUsController {
  public constructor(private readonly ContactUsService: ContactUsService) {
    this.ContactUsService = ContactUsService;
  }

  public createContactUs = async (req: Request, res: Response): Promise<Response> => {
    return this.ContactUsService
      .createContactUs(req.body)
      .then((ContactUs: ContactUs) => {
        return res.status(200).json({ ContactUs });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };

  public getContactUsById = async (req: Request, res: Response): Promise<Response> => {
    return this.ContactUsService
      .getContactUsById(+req.params.id)
      .then((ContactUs) => {
        if (ContactUs) {
          return res.status(200).json({ ContactUs });
        }
        return res.status(404).json({ error: 'NotFound' });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };

  public getAllContactUs = async (req: Request, res: Response): Promise<Response> => {
    return this.ContactUsService
      .getAllContactUs()
      .then((ContactUs: ContactUs[]) => {
        return res.status(200).json({ ContactUs });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
    });
  };

  public updateContactUs = async (req: Request, res: Response): Promise<Response> => {
    return this.ContactUsService
      .updateContactUs(req.body,+req.params.id)
      .then((ContactUs) => {
          return res.status(200).json({ ContactUs });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };

  public deleteContactUs = async (req: Request, res: Response): Promise<Response> => {
    return this.ContactUsService
      .deleteContactUs(+req.params.id)
      .then((ContactUs) => {
        if (ContactUs > 0) {
          return res.status(200).json({ ContactUs });
        }
        return res.status(404).json({ error: 'NotFound' });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };
}
