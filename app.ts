import multer from "multer";
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import {sequelize} from "./models";

import contactUs from "./routes/ContactUs";
import login from "./routes/LoginSignUp";
import bookservice from "./routes/bookService";
import customer from "./routes/customerPages";
import sp from "./routes/SPPages";

require('dotenv').config();

const app = express();
const swaggerOption={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Helperland API',
            version: '1.0.0',
            description:'Helperland',
            contact:{
                name:'Dhairya Joshi',
                email:'dhairyajoshi.905@gmail.com'
            },
            servers:[{url: "http://localhost:3000"}]
        }
    },
    apis: [
        './routes/ContactUs.ts',
        './routes/LoginSignUp.ts',
        './routes/bookService.ts',
        './routes/customerPages.ts',
        './routes/SPPages.ts'
    ]
}
const swaggerDocs = swaggerJSDoc(swaggerOption);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer({ dest: 'UploadedFiles' }).single('file'));

app.use('/Helperland/ContactUs', contactUs);
app.use('/Helperland/SignUp&Login', login);
app.use('/Helperland/BookService', bookservice);
app.use('/Helperland/CustomerPages', customer);
app.use('/Helperland/SPPages', sp);

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
        console.log(e.message)
    })
})
