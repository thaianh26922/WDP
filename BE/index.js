import { connect } from "./Connection/DBConnection.js";
import express from 'express';
import { UserRouter } from "./Routers/UserRouter.js";
import bodyParser from 'body-parser';
import { PostRouter } from "./Routers/PostRouter.js";
import notificationRouter from "./Routers/NotificationRouter.js";
import ReportRouter from './Routers/ReportRouter.js';
import chatRouter from './Routers/ChatRouter.js';
import paymentRouter from './Routers/PaymentRouter.js';
import authenToken from './Middleware/AuthenToken.js'
import {CompanyRouter} from './Routers/CompanyRouter.js'
import hrManagerRouter from "./Routers/HrManagerRouter.js";
import modRouter from "./Routers/ModRouter.js"
import hrRouter from "./Routers/HrRouter.js"
import * as dotenv from 'dotenv';
import cors from 'cors';
import StaffRouter from './Routers/StaffRouter.js'
import JobCategoryRouter from './Routers/JobCategoryRouter.js'
import HrManagerRouter from "./Routers/HrManagerRouter.js";
import { server } from './Service/SocketIO.js';
import { ApplyJobRouter } from "./Routers/ApplyJobController.js";

dotenv.config();
const app = express();
const port = 9999;
const serverPort = 8080;
app.use(cors())

//Setup body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Connect to DB
connect();
//Get router
app.use('/api/user', UserRouter);
app.use('/api/post', PostRouter);
app.use('/api/report', ReportRouter);
app.use('/api/company', CompanyRouter)
app.use('/api/staff', StaffRouter)
app.use('/api/job-category', JobCategoryRouter)
app.use('/api/hr-manager', HrManagerRouter)
//Nhan thong bao
app.use('/api/notifications', notificationRouter);
//Chat HR
app.use('/api/messages', chatRouter);
//Payment VNPAY
app.use('/api/payment', paymentRouter);

app.get('/api/protected', authenToken, (req, res) => {
    res.send("hello world")
})

app.use('/api/apply-job', ApplyJobRouter);

app.use('/api/hr', hrRouter);
app.use('/api/apply-job', ApplyJobRouter);
app.use('/api/mod', modRouter);

//Socket IO - Xử lí tin nhắn
server.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
