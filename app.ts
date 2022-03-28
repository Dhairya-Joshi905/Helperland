import multer from "multer";
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import {sequelize} from "./models";

import contactUs from "./routes/1. Contact Us";
import loginSignUp from "./routes/2. Signup Login";
import bookService from "./routes/3. Book Service";
import customerPages from "./routes/4. Customer Pages";
import spPages from "./routes/5. SP Pages";
import adminPages from "./routes/6. Admin Screens";

require('dotenv').config();

const app = express();
const swaggerOption = {
    definition: {
        openapi:'3.0.0',
        info: {
            title:'Helperland API',
            version: '1.0.0',
            description:'Helperland',
            contact:{
                name:'Dhairya Joshi',
                email:'dhairyajoshi.905@gmail.com'
            },
            servers: [{ url: "http://localhost:3000" }]
        }
    },
    apis: [
        './routes/1. Contact Us.ts',
        './routes/2. Signup Login.ts',
        './routes/3. Book Service.ts',
        './routes/4. Customer Pages.ts',
        './routes/5. SP Pages.ts',
        './routes/6. Admin Screens.ts'
    ]
}
const swaggerDocs: object = swaggerJSDoc(swaggerOption);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer({ dest: 'UploadedFiles' }).single('file'));

app.use('/Helperland/ContactUs', contactUs);
app.use('/Helperland/SignUp&Login', loginSignUp);
app.use('/Helperland/BookService', bookService);
app.use('/Helperland/CustomerPages', customerPages);
app.use('/Helperland/SPPages', spPages);
app.use('/Helperland/AdminPages', adminPages);

app.listen(process.env.PORT, () => {
    console.log(`Server rocking at ${process.env.PORT}`)
    sequelize.authenticate()
    .then(async() => {
        console.log('database connected');
        try {
            await sequelize.sync(/*{force: true}*/);
        }
        catch (err) {
            console.log(err);
        }
    })
    .catch((e: Error) => {
        console.log(e.message);
    })
})
