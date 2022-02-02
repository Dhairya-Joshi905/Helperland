import {db} from "../models/index";
import dotenv from "dotenv";
import { Request, Response } from 'express';
import { Subscribe } from "../models/subscribe";
import { SubscribeService } from "./Subscribe.service";
import nodemailer from "nodemailer";
import sendGridTransport from "nodemailer-sendgrid-transport";

dotenv.config();

export class SubscribeController {
  public constructor(private readonly SubscribeService: SubscribeService) {
    this.SubscribeService = SubscribeService;
  }

  public saveSubscriber = async (req: Request, res: Response): Promise<Response> => {
    return this.SubscribeService
      .saveSubscriber(req.body)
      .then((Subscribe: Subscribe) => {
        return res.status(200).json({ Subscribe });
      })
      .then((Subscribe: Subscribe) => {
        const Email: string = req.body.Email;
        db.Subscribe.findOne({where: {Email: Email}})
          .then((Subscribe) => {
            if(Subscribe)
              return res.status(409).json({msg: 'Already subscribed'});
          })
          .catch((error: Error) => {
              return res.status(500).json({
                error: error
              });
          });

        const transporter = nodemailer.createTransport(sendGridTransport({
          auth: {api_key: process.env.API_KEY}
        }));
            
        transporter.sendMail({
          to: Email,
          from: 'dhairyajoshi.905@gmail.com',
          subject: 'Congratulations! You are subscribed to our mailing list',
          html: `<h1>Thank you for subscribing to our newsletter.</h1>`
        })
        .then(() => {
            return res.status(200).json({msg: 'User has been subscribed to our mailing email.'})
        })
        .catch((error: Error) => {
            return res.status(422).json({msg: error.message, route: '/subscribeToNewsletter'})
        })
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };
  /*public sendEmail = async (req: Request, res: Response): Promise<Response> => {
    return this.SubscribeService
      .sendEmail(+req.params.id)
      .then((Subscribe) => {
        if (Subscribe) {
          return res.status(200).json({ Subscribe });
        }
        return res.status(404).json({ error: 'NotFound' });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };

  public sendEmailToAll = async (req: Request, res: Response): Promise<Response> => {
    return this.SubscribeService
      .sendEmailToAll(+req.params.id)
      .then((Subscribe) => {
        if (Subscribe) {
          return res.status(200).json({ Subscribe });
        }
        return res.status(404).json({ error: 'NotFound' });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };*/

  public getSubscriberById = async (req: Request, res: Response): Promise<Response> => {
    return this.SubscribeService
      .getSubscriberById(+req.params.id)
      .then((Subscribe) => {
        if (Subscribe) {
          return res.status(200).json({ Subscribe });
        }
        return res.status(404).json({ error: 'NotFound' });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };

  public getAllSubscribers = async (req: Request, res: Response): Promise<Response> => {
    return this.SubscribeService
      .getAllSubscribers()
      .then((Subscribe: Subscribe[]) => {
        return res.status(200).json({ Subscribe });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
    });
  };
}
