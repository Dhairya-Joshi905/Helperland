"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeController = void 0;
const index_1 = require("../models/index");
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_sendgrid_transport_1 = __importDefault(require("nodemailer-sendgrid-transport"));
class SubscribeController {
    constructor(SubscribeService) {
        this.SubscribeService = SubscribeService;
        this.saveSubscriber = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.SubscribeService
                .saveSubscriber(req.body)
                .then((Subscribe) => {
                return res.status(200).json({ Subscribe });
            }, then((Subscribe) => {
                const Email = req.body.Email;
                index_1.db.Subscribe.findOne({ where: { Email: Email } })
                    .then((Subscribe) => {
                    if (Subscribe)
                        return res.status(409).json({ msg: 'Already subscribed' });
                    const transporter = nodemailer_1.default.createTransport((0, nodemailer_sendgrid_transport_1.default)({
                        auth: {
                            api_key: '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'
                        }
                    }));
                    transporter.sendMail({
                        to: Email,
                        from: 'dhairyajoshi.905@gmail.com',
                        subject: 'Congratulations! You are subscribed to our mailing list',
                        html: `<h3>Application for newsletter subscription
              Thank you, we have received your registration for the newsletter.
              To confirm that you would like to receive the newsletter by email,
              please click on the following button:
              </h3>`
                    })
                        .then(() => {
                        return res.status(200).json({ msg: 'User has been subscribed to our mailing email.' });
                    })
                        .catch((error) => {
                        return res.status(422).json({ msg: error.message, route: '/subscribeToNewsletter' });
                    });
                })
                    .catch((error) => {
                    return res.status(500).json({
                        error: error
                    });
                });
            }));
        });
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
        this.getSubscriberById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.SubscribeService
                .getSubscriberById(+req.params.id)
                .then((Subscribe) => {
                if (Subscribe) {
                    return res.status(200).json({ Subscribe });
                }
                return res.status(404).json({ error: 'NotFound' });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.getAllSubscribers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.SubscribeService
                .getAllSubscribers()
                .then((Subscribe) => {
                return res.status(200).json({ Subscribe });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.SubscribeService = SubscribeService;
    }
}
exports.SubscribeController = SubscribeController;
