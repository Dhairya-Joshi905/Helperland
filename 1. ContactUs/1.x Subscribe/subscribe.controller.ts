import mailgun from "mailgun-js";
import jwt from 'jsonwebtoken';
import { Request, Response, RequestHandler } from 'express';

import { Subscribe } from "../../models/subscribe";
import { SubscribeService } from './subscribe.service';

require("dotenv").config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: process.env.MAILGUN_DOMAIN!,
});

export class SubscribeController {
    
  public constructor (private readonly subUserService: SubscribeService) {
        this.subUserService = subUserService;
  }

  public saveSubscriber: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    const Email: string = req.body.Email;
    req.body.IsVerifiedSub = false;
    if (Email)
      return this.subUserService
        .getSubscriberByEmail(Email)
        .then((user: Subscribe|null) => {
          if (!user)
            return this.subUserService
              .saveSubscriber(req.body)
              .then((user: Subscribe) => {
                const token  = this.subUserService.createToken(user.Email);
                const data = this.subUserService.createEmailData(user.Email, token);
                mg.messages().send(data, function (err, body) {
                  if (err)
                    return res.json({ error: err.message });
                });
                return res.status(200).json({ message: "Confirmation link has been sent to you email address." });
              })
              .catch((err: Error) => {
                console.log(err);
                return res.status(500).json({ error: err });
              });
          else
            return res.status(400).json({ mesage:'You have already subscribed us.' });
        })
        .catch((err: Error) => {
          return res.status(500).json({ error: err });
        });
    else
      return res.status(401).json({ mesage: 'something went wrong' });
  };

  public confirmSubscriber: RequestHandler = async (req: Request , res: Response): Promise<Response | undefined> => {
    const {token} = req.params;
    if (token)
      jwt.verify(token, process.env.JWT_ACC_ACTIVATE!, (error: jwt.VerifyErrors | null, decodedToken: any) => {
        if (error)
          return res.status(400).json({ error: 'Incorrect or Expired link' });
        else {
          const { Email } = decodedToken;
          if (Email) {
            return this.subUserService
            .getSubscriberByEmail(Email)
            .then((subUser: Subscribe | null) => {
              if (subUser) {
                subUser.IsVerifiedSub = true;
                return this.subUserService
                  .updateSubscriber(subUser.IsVerifiedSub, subUser.Email!)
                  .then((user: [number, Subscribe[]]) => {
                    return res.status(200).json({ message: 'You are now successfully registered', user});
                  })
                  .catch((err: Error) => {
                    console.log(err);
                    return res.status(500).json(err);
                  });
              }
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json(error);
            });
          }
          else
            return res.status(401).json({ message: 'Email not found' });
        }
      })
    else
      return res.status(401).json({ message: 'token not found' });
  };

  public sendEmailToAll = async (req: Request, res: Response): Promise<Response> => {
    return this.subUserService
      .getAllSubscribers()
      .then(async (Subscribers: Subscribe[]) => {
        if (Subscribers.length == 0)
          return res.status(200).json({ message: 'No subscribers' });
        else {
          const user = {...{ ...Subscribers }};
          const emailArray: string[] = [];
          for (const subUser in user)
            if (user[subUser].IsVerifiedSub === true)
              emailArray.push((user[subUser].Email));
          console.log(emailArray);
          for (let subscriber in emailArray) {
            const data = this.subUserService.createEmailDataForAll(emailArray[subscriber]);
            await mg.messages().send(data, function (err) {
              if (err)
                return res.json({ error: err.message });
            });
          }
          return res.status(200).json({ message: 'Email sent to all subscribers.' });
        }
      })
      .catch((err: Error) => {
        return res.status(500).json({error: err});
    });
  };

  public getSubUserById: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    return this.subUserService
      .getSubscriberById(+req.params.id)
      .then((subUser: Subscribe | null) => {
        if (subUser)
          return res.status(200).json(subUser);
        else
          return res.status(404).json({ error: 'NotFound' });
      })
      .catch((err: Error) => {
        return res.status(500).json({ error: err });
      });
  };

  public getAllSubscribers: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    return this.subUserService
      .getAllSubscribers()
      .then((SubUser: Subscribe[]) => {
        return res.status(200).json({ SubUser });
      })
      .catch((err: Error) => {
        return res.status(500).json({ error: err });
      });
  };
}