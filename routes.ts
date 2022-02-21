import express from "express";
import { celebrate } from 'celebrate';

import { ContactUsRepository } from "./2.3 ContactUsAPI/ContactUs.repository";
import { ContactUsSchema } from "./2.3 ContactUsAPI/ContactUs.model";
import { ContactUsService } from "./2.3 ContactUsAPI/ContactUs.service";
import { ContactUsController } from "./2.3 ContactUsAPI/ContactUs.controller";

import { SubscribeRepository } from "./2.x SubscribeAPI/Subscribe.repository";
import { SubscribeSchema } from "./2.x SubscribeAPI/Subscribe.model";
import { SubscribeService } from "./2.x SubscribeAPI/Subscribe.service";
import { SubscribeController } from "./2.x SubscribeAPI/Subscribe.controller";

import { CustomerSignUpRepository } from "./3.2 CustomerSignUpAPI/CustomerSignUp.repository";
import { CustomerSignUpSchema } from "./3.2 CustomerSignUpAPI/CustomerSignUp.model";
import { CustomerSignUpService } from "./3.2 CustomerSignUpAPI/CustomerSignUp.service";
import { CustomerSignUpController } from "./3.2 CustomerSignUpAPI/CustomerSignUp.controller";

import { SPSignUpRepository } from "./3.3 SPSignUpAPI/SPSignUp.repository";
import { SPSignUpSchema } from "./3.3 SPSignUpAPI/SPSignUp.model";
import { SPSignUpService } from "./3.3 SPSignUpAPI/SPSignUp.service";
import { SPSignUpController } from "./3.3 SPSignUpAPI/SPSignUp.controller";

import { LoginRepository } from './3.1 LoginAPI/Login.repository';
import { LoginSchema } from './3.1 LoginAPI/Login.model';
import { LoginService } from './3.1 LoginAPI/Login.service';
import { LoginController} from './3.1 LoginAPI/Login.controller';

import { ForgotPasswordRepository } from './3.4 ForgotPasswordAPI/ForgotPassword.repository';
import { ForgotPasswordSchema } from './3.4 ForgotPasswordAPI/ForgotPassword.model';
import { ForgotPasswordService } from './3.4 ForgotPasswordAPI/ForgotPassword.service';
import { ForgotPasswordController} from './3.4 ForgotPasswordAPI/ForgotPassword.controller';

import { BookServiceController } from "../3. Book Service/bookservice.controller";
import { BookServiceSchema } from "../3. Book Service/bookservice.model";
import { BookServiceRepository } from "../3. Book Service/bookservice.repository";
import { BookService } from "../3. Book Service/bookservice.service";

const {zipcode, userAddress, createService} = BookServiceSchema;
const { contus_add, contus_get, contus_update } = ContactUsSchema;
const { subs_get, subs_add } = SubscribeSchema;
const { csignup_add, csignup_get, csignup_update } = CustomerSignUpSchema;
const { spsignup_add, spsignup_get, spsignup_update } = SPSignUpSchema;
const { login_check } = LoginSchema;
const { reset, newpassword } = ForgotPasswordSchema;

const router: express.Router = express.Router();

const contactusrepo: ContactUsRepository = new ContactUsRepository();
const contactusservice: ContactUsService = new ContactUsService(contactusrepo);
const contactuscontroller: ContactUsController = new ContactUsController(contactusservice);

const subscriberepo: SubscribeRepository = new SubscribeRepository();
const subscribeservice: SubscribeService = new SubscribeService(subscriberepo);
const subscribecontroller: SubscribeController = new SubscribeController(subscribeservice);

const customersignuprepo: CustomerSignUpRepository = new CustomerSignUpRepository();
const customersignupservice: CustomerSignUpService = new CustomerSignUpService(customersignuprepo);
const customersignupcontroller: CustomerSignUpController = new CustomerSignUpController(customersignupservice);

const spsignuprepo: SPSignUpRepository = new SPSignUpRepository();
const spsignupservice: SPSignUpService = new SPSignUpService(spsignuprepo);
const spsignupcontroller: SPSignUpController = new SPSignUpController(spsignupservice);

const loginrepo: LoginRepository = new LoginRepository();
const loginservice: LoginService = new LoginService(loginrepo);
const logincontroller: LoginController = new LoginController(loginservice);

const forgotpasswordrepo: ForgotPasswordRepository = new ForgotPasswordRepository();
const forgotpasswordservice: ForgotPasswordService = new ForgotPasswordService(forgotpasswordrepo);
const forgotpasswordcontroller: ForgotPasswordController = new ForgotPasswordController(forgotpasswordservice);

const bookservicerepo: BookServiceRepository = new BookServiceRepository();
const bookserviceservice: BookServiceService = new BookServiceService(bookservicerepo);
const bookservicecontroller: BookServiceController = new BookServiceController(bookserviceservice);

router.post('/ContactUs', celebrate(contus_add), contactuscontroller.createContactUs);
router.get('/ContactUs/:id', celebrate(contus_get), contactuscontroller.getContactUsById);
router.get('/ContactUs', contactuscontroller.getAllContactUs);
router.put('/ContactUs/:id', celebrate(contus_update), contactuscontroller.updateContactUs);
router.delete('/ContactUs/:id', celebrate(contus_get), contactuscontroller.deleteContactUs);

router.post('/Subscribe', celebrate(subs_add), subscribecontroller.saveSubscriber);
//router.post('/Subscribe', celebrate(subadd), subscribecontroller.sendEmail);
//router.post('/Subscribe', celebrate(subadd), subscribecontroller.sendEmailToAll);
router.get('/Subscribe/:id', celebrate(subs_get), subscribecontroller.getSubscriberById);
router.get('/Subscribe', subscribecontroller.getAllSubscribers);

router.post('/CustomerSignUp', celebrate(csignup_add), customersignupcontroller.createCustomerSignUp);
router.get('/CustomerSignUp/:id', celebrate(csignup_get), customersignupcontroller.getCustomerSignUpById);
router.get('/CustomerSignUp', customersignupcontroller.getAllCustomerSignUp);
router.put('/CustomerSignUp/:id', celebrate(csignup_update), customersignupcontroller.updateCustomerSignUp);
router.delete('/CustomerSignUp/:id', celebrate(csignup_get), customersignupcontroller.deleteCustomerSignUp);

router.post('/SPSignUp', celebrate(spsignup_add), spsignupcontroller.createSPSignUp);
router.get('/SPSignUp/:id', celebrate(spsignup_get), spsignupcontroller.getSPSignUpById);
router.get('/SPSignUp', spsignupcontroller.getAllSPSignUp);
router.put('/SPSignUp/:id', celebrate(spsignup_update), spsignupcontroller.updateSPSignUp);
router.delete('/SPSignUp/:id', celebrate(spsignup_get), spsignupcontroller.deleteSPSignUp);

router.post('/login',celebrate(login_check), logincontroller.Login);

router.post('/ForgotPassword', celebrate(reset), forgotpasswordcontroller.forgotPassword);
router.post('/ResetPassword', celebrate(newpassword), forgotpasswordcontroller.resetPassword);

router.post('/CheckZipCode', celebrate(zipcode), bookservicecontroller.checkZipCode);
router.post('/CreateRequest', celebrate(createService), bookservicecontroller.CreateServiceRequest);
router.post('/CreateAddress', celebrate(userAddress), bookservicecontroller.createAddress);
router.get('/GetAllAddress', bookservicecontroller.getUserAddresses);

export = router;
