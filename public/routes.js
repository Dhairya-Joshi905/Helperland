"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const ContactUs_repository_1 = require("./ContactUsAPI/ContactUs.repository");
const ContactUs_model_1 = require("./ContactUsAPI/ContactUs.model");
const ContactUs_service_1 = require("./ContactUsAPI/ContactUs.service");
const ContactUs_controller_1 = require("./ContactUsAPI/ContactUs.controller");
const Subscribe_repository_1 = require("./SubscribeAPI/Subscribe.repository");
const Subscribe_model_1 = require("./SubscribeAPI/Subscribe.model");
const Subscribe_service_1 = require("./SubscribeAPI/Subscribe.service");
const Subscribe_controller_1 = require("./SubscribeAPI/Subscribe.controller");
const { cuupdate, cuget, cuadd } = ContactUs_model_1.ContactUsSchema;
const { subget, subadd } = Subscribe_model_1.SubscribeSchema;
const router = express_1.default.Router();
const contactusrepo = new ContactUs_repository_1.ContactUsRepository();
const contactusservice = new ContactUs_service_1.ContactUsService(contactusrepo);
const contactuscontroller = new ContactUs_controller_1.ContactUsController(contactusservice);
const subscriberepo = new Subscribe_repository_1.SubscribeRepository();
const subscribeservice = new Subscribe_service_1.SubscribeService(subscriberepo);
const subscribecontroller = new Subscribe_controller_1.SubscribeController(subscribeservice);
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
router.post('/ContactUs', (0, celebrate_1.celebrate)(cuadd), contactuscontroller.createContactUs);
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
router.get('/ContactUs/:id', (0, celebrate_1.celebrate)(cuget), contactuscontroller.getContactUsById);
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
router.put('/ContactUs/:id', (0, celebrate_1.celebrate)(cuupdate), contactuscontroller.updateContactUs);
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
router.delete('/ContactUs/:id', (0, celebrate_1.celebrate)(cuget), contactuscontroller.deleteContactUs);
router.post('/Subscribe', (0, celebrate_1.celebrate)(subadd), subscribecontroller.saveSubscriber);
//router.post('/Subscribe', celebrate(subadd), subscribecontroller.sendEmail);
//router.post('/Subscribe', celebrate(subadd), subscribecontroller.sendEmailToAll);
router.get('/Subscribe/:id', (0, celebrate_1.celebrate)(subget), subscribecontroller.getSubscriberById);
router.get('/Subscribe', subscribecontroller.getAllSubscribers);
module.exports = router;
