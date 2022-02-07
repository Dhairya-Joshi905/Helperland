import { Request, Response } from 'express';
import { User } from "../models/user";
import { CustomerSignUpService } from "./CustomerSignUp.service";

export class CustomerSignUpController {
  public constructor(private readonly CustomerSignUpService: CustomerSignUpService) {
    this.CustomerSignUpService = CustomerSignUpService;
  }

  public createCustomerSignUp = async (req: Request, res: Response): Promise<Response> => {
    return this.CustomerSignUpService
      .createCustomerSignUp(req.body)
      .then((CustomerSignUp: User) => {
        return res.status(200).json({ CustomerSignUp });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };

  public getCustomerSignUpById = async (req: Request, res: Response): Promise<Response> => {
    return this.CustomerSignUpService
      .getCustomerSignUpById(+req.params.id)
      .then((CustomerSignUp) => {
        if (CustomerSignUp) {
          return res.status(200).json({ CustomerSignUp });
        }
        return res.status(404).json({ error: 'NotFound' });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };

  public getAllCustomerSignUp = async (req: Request, res: Response): Promise<Response> => {
    return this.CustomerSignUpService
      .getAllCustomerSignUp()
      .then((CustomerSignUp: User[]) => {
        return res.status(200).json({ CustomerSignUp });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
    });
  };

  public updateCustomerSignUp = async (req: Request, res: Response): Promise<Response> => {
    return this.CustomerSignUpService
      .updateCustomerSignUp(req.body,+req.params.id)
      .then((CustomerSignUp) => {
          return res.status(200).json({ CustomerSignUp });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };

  public deleteCustomerSignUp = async (req: Request, res: Response): Promise<Response> => {
    return this.CustomerSignUpService
      .deleteCustomerSignUp(+req.params.id)
      .then((CustomerSignUp) => {
        if (CustomerSignUp > 0) {
          return res.status(200).json({ CustomerSignUp });
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
