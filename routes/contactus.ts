import express from "express";
import { celebrate } from 'celebrate';

import { SubscribeRepository } from "../1. ContactUs/1.x Subscribe/subscribe.repository";
import { SubscribeService } from "../1. ContactUs/1.x Subscribe/subscribe.service";
import { SubscribeController } from "../1. ContactUs/1.x Subscribe/subscribe.controller";
import { SubscribeSchema } from "../1. ContactUs/1.x Subscribe/subscribe.model";

import { UsersRepository } from "../1. ContactUs/1.3 ContactUs/contactus.repository";
import { ContactUsSchema } from "../1. ContactUs/1.3 ContactUs/contactus.model";
import { UsersController } from "../1. ContactUs/1.3 ContactUs/contactus.controller";
import { UsersService } from "../1. ContactUs/1.3 ContactUs/contactus.service";

const {add} = ContactUsSchema;
const {addSubscriber, getSubscriber} = SubscribeSchema;

const router: express.Router = express.Router();

const repo: UsersRepository = new UsersRepository();
const service: UsersService= new UsersService(repo);
const controller: UsersController = new UsersController(service);

const subscribeRepo: SubscribeRepository = new SubscribeRepository();
const subscribeService: SubscribeService = new SubscribeService(subscribeRepo);
const subscribeController: SubscribeController = new SubscribeController(subscribeService);

/**
 *@swagger
 * definitions:
 *  ContactUs:
 *   type: object
 *   properties:
 *    FirstName:
 *     type: string
 *     description: first name of the user
 *     example: 'Dhairya'
 *    LastName:
 *     type: string
 *     description: last name of the user
 *     example: 'Joshi'
 *    Email:
 *     type: string
 *     description: email of the user
 *     example: 'dhairyajoshi.905@gmail.com'
 *    SubjectType:
 *     type: string
 *     description: type of object
 *     example: 'inquiry'
 *    PhoneNumber:
 *     type: integer
 *     description: phone number
 *     example: '1234567890'
 *    Message:
 *     type: string
 *     description: designation of the employee
 *     example: 'Job Inquiry'
 *    file:
 *     type: file
 *     description: Upload File
 *    IsDeleted:
 *     type: integer
 *     description: IsDeleted field
 *     example: 1
 *  SendEmail:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: email
 *     example: 'dhairyajoshi.905@gmail.com'
 */

// ContactUs routes

/**
 * @swagger
 * /Helperland/ContactUs/createContactUs:
 *  post:
 *   summary: create user
 *   description: create user for contact
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *      schema:
 *       $ref: '#/definitions/ContactUs'
 *   responses:
 *    200:
 *     description: user created succesfully
 *    500:
 *     description: failure in creating user
 */
router.post('/createContactUs', controller.authenticate, controller.createUsers);

/**
 * @swagger
 *  /Helperland/ContactUs/getContactUs/{id}:
 *   get:
 *    summary: get user by id
 *    description: get user by id
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: UserId
 *       example: 2
 *    responses:
 *     200:
 *      description: success
 *     500:
 *      description: error
 */
 router.get('/getContactUs/:id', controller.getUserById);

/**
 * @swagger
 * /Helperland/ContactUs/getAllContactUs:
 *  get:
 *   summary: get all users
 *   description: get all users
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */
router.get('/getAllContactUs', controller.getUsers);

// router.put('/updateContactUs/:id', controller.updateUsers);
// router.delete('/deleteContactUs/:id', controller.deleteUsers);

// NewsLetter Routes

/**
 * @swagger
 * /Helperland/ContactUs/subscribe:
 *  post:
 *   summary: Subscribe to NewsLetter
 *   description: Enter email
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *      schema:
 *       $ref: '#/definitions/SendEmail'
 *   responses:
 *    200:
 *     description: Confirmation link has been sent to you Email ID
 *    400:
 *     description: You can subscribe only one time
 *    500:
 *     description: something went wrong
 */

// Save Subscriber
router.post('/subscribe', celebrate(addSubscriber), subscribeController.saveSubscriber);

// get subscriber by id
router.get('/subscribe/:id', celebrate(getSubscriber), subscribeController.getSubUserById);

// get all subscribers
router.get('/subscribers', subscribeController.getAllSubscribers);

// Sends email to all subscribers
router.get('/sendEmailToAll', subscribeController.sendEmailToAll);

// confirm subscriber
router.get('/subscriber/activate/:token', subscribeController.confirmSubscriber);

export = router;