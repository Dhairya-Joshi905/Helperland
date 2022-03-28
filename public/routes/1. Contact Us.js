"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var subscribe_repository_1 = require("../1. Contact Us/1.x Subscribe/subscribe.repository");
var subscribe_service_1 = require("../1. Contact Us/1.x Subscribe/subscribe.service");
var subscribe_controller_1 = require("../1. Contact Us/1.x Subscribe/subscribe.controller");
var subscribe_model_1 = require("../1. Contact Us/1.x Subscribe/subscribe.model");
var contactus_repository_1 = require("../1. Contact Us/1.3 ContactUs/contactus.repository");
var contactus_model_1 = require("../1. Contact Us/1.3 ContactUs/contactus.model");
var contactus_controller_1 = require("../1. Contact Us/1.3 ContactUs/contactus.controller");
var contactus_service_1 = require("../1. Contact Us/1.3 ContactUs/contactus.service");
var add = contactus_model_1.ContactUsSchema.add;
var addSubscriber = subscribe_model_1.SubscribeSchema.addSubscriber, getSubscriber = subscribe_model_1.SubscribeSchema.getSubscriber;
var router = express_1.default.Router();
var repo = new contactus_repository_1.UsersRepository();
var service = new contactus_service_1.UsersService(repo);
var controller = new contactus_controller_1.UsersController(service);
var subscribeRepo = new subscribe_repository_1.SubscribeRepository();
var subscribeService = new subscribe_service_1.SubscribeService(subscribeRepo);
var subscribeController = new subscribe_controller_1.SubscribeController(subscribeService);
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
router.post('/subscribe', (0, celebrate_1.celebrate)(addSubscriber), subscribeController.saveSubscriber);
// get subscriber by id
router.get('/subscribe/:id', (0, celebrate_1.celebrate)(getSubscriber), subscribeController.getSubUserById);
// get all subscribers
router.get('/subscribers', subscribeController.getAllSubscribers);
// Sends email to all subscribers
router.get('/sendEmailToAll', subscribeController.sendEmailToAll);
// confirm subscriber
router.get('/subscriber/activate/:token', subscribeController.confirmSubscriber);
module.exports = router;
