import express from "express";
import { celebrate } from 'celebrate';
import { ContactUsRepository } from "./ContactUsAPI/ContactUs.repository";
import { ContactUsSchema } from "./ContactUsAPI/ContactUs.model";
import { ContactUsService } from "./ContactUsAPI/ContactUs.service";
import { ContactUsController } from "./ContactUsAPI/ContactUs.controller";
import { SubscribeRepository } from "./SubscribeAPI/Subscribe.repository";
import { SubscribeSchema } from "./SubscribeAPI/Subscribe.model";
import { SubscribeService } from "./SubscribeAPI/Subscribe.service";
import { SubscribeController } from "./SubscribeAPI/Subscribe.controller";

const { cuupdate, cuget, cuadd } = ContactUsSchema;
const { subget, subadd } = SubscribeSchema;
const router: express.Router = express.Router();

const contactusrepo: ContactUsRepository = new ContactUsRepository();
const contactusservice: ContactUsService = new ContactUsService(contactusrepo);
const contactuscontroller: ContactUsController = new ContactUsController(contactusservice);

const subscriberepo: SubscribeRepository = new SubscribeRepository();
const subscribeservice: SubscribeService = new SubscribeService(subscriberepo);
const subscribecontroller: SubscribeController = new SubscribeController(subscribeservice);

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
 *     example: 'inquary'
 *    Subject:
 *     type: string
 *     description: subject
 *    PhoneNumber:
 *     type: integer
 *     description: phone number
 *     example: '1234567810'
 *    Message:
 *     type: string
 *     description: designation of the employee
 *     example: 'about helperland'
 *    UploadFileName:
 *     type: string
 *     description: Uploaded File Name
 *    Status:
 *     type: integer
 *     description: status
 *    Priority:
 *     type: integer
 *     description: priority
 *    AssignedToUser:
 *     type: integer
 *     description: 1|0
 *    IsDeleted:
 *     type: integer
 *     description: deleted 
 *     example: 1
 */

 /**
 * @swagger
 * /contactus:
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
router.post('/ContactUs', celebrate(cuadd), contactuscontroller.createContactUs);

/**
 * @swagger
 *  /contactus/{id}:
 *   get:
 *    summary: get user by id
 *    description: get user by id
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: id of the user
 *       example: 2
 *    responses:
 *     200:
 *      description: success
 *     500:
 *      description: error
 */
router.get('/ContactUs/:id', celebrate(cuget), contactuscontroller.getContactUsById);

/**
 * @swagger
 * /contactus:
 *  get:
 *   summary: get all users
 *   description: get all users
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */
router.get('/ContactUs', contactuscontroller.getAllContactUs);

/**
 * @swagger
 *  /contactus/{id}:
 *   put:
 *    summary: update user by id
 *    description: update user by id
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: id of the user
 *       example: 2
 *    responses:
 *     200:
 *      description: success
 *     500:
 *      description: error
 */
router.put('/ContactUs/:id', celebrate(cuupdate), contactuscontroller.updateContactUs);

/**
 * @swagger
 *  /contactus/{id}:
 *   delete:
 *    summary: delete user by id
 *    description: delete user by id
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: integer
 *       required: true
 *       description: id of the user
 *       example: 2
 *    responses:
 *     200:
 *      description: success
 *     500:
 *      description: error
 */
router.delete('/ContactUs/:id', celebrate(cuget), contactuscontroller.deleteContactUs);

router.post('/Subscribe', celebrate(subadd), subscribecontroller.saveSubscriber);
//router.post('/Subscribe', celebrate(subadd), subscribecontroller.sendEmail);
//router.post('/Subscribe', celebrate(subadd), subscribecontroller.sendEmailToAll);
router.get('/Subscribe/:id', celebrate(subget), subscribecontroller.getSubscriberById);
router.get('/Subscribe', subscribecontroller.getAllSubscribers);

export = router;