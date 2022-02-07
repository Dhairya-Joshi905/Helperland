import { Request, Response } from 'express';
import { User } from "../models/user";
import { SPSignUpService } from "./SPSignUp.service";

export class SPSignUpController {
  public constructor(private readonly SPSignUpService: SPSignUpService) {
    this.SPSignUpService = SPSignUpService;
  }

  public createSPSignUp = async (req: Request, res: Response): Promise<Response> => {
    return this.SPSignUpService
      .createSPSignUp(req.body)
      .then((SPSignUp: User) => {
        return res.status(200).json({ SPSignUp });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };

  public getSPSignUpById = async (req: Request, res: Response): Promise<Response> => {
    return this.SPSignUpService
      .getSPSignUpById(+req.params.id)
      .then((SPSignUp) => {
        if (SPSignUp) {
          return res.status(200).json({ SPSignUp });
        }
        return res.status(404).json({ error: 'NotFound' });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };

  public getAllSPSignUp = async (req: Request, res: Response): Promise<Response> => {
    return this.SPSignUpService
      .getAllSPSignUp()
      .then((SPSignUp: User[]) => {
        return res.status(200).json({ SPSignUp });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
    });
  };

  public updateSPSignUp = async (req: Request, res: Response): Promise<Response> => {
    return this.SPSignUpService
      .updateSPSignUp(req.body,+req.params.id)
      .then((SPSignUp) => {
          return res.status(200).json({ SPSignUp });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };

  public deleteSPSignUp = async (req: Request, res: Response): Promise<Response> => {
    return this.SPSignUpService
      .deleteSPSignUp(+req.params.id)
      .then((SPSignUp) => {
        if (SPSignUp > 0) {
          return res.status(200).json({ SPSignUp });
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
