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
import { Server } from "socket.io";
import Conversation from "./Model/Conversations.js";
import { User } from "./Model/User.js";
import Messages from "./Model/Messages.js";
import { Staff } from "./Model/Staff.js";
import { CV } from "./Model/CvApply.js";


dotenv.config();
const app = express();
const port = 9999;
const serverPort = 8080;
app.use(cors())
const io = new Server(8081, {
    cors: {
        origin: "*",
    }
});
//Setup body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let users = [];
io.on('connection', socket => {
    console.log('User connected', socket.id);
    socket.on('addUser', userId => {
        const isUserExist = users.find(user => user.userId === userId);
        if (!isUserExist) {
            const user = { userId, socketId: socket.id };
            users.push(user);
            io.emit('getUsers', users);
        }
    });
    console.log(users);

    socket.on('sendMessage', async ({ senderId, receiverId, message, conversationId }) => {
        let receiver = users.find(user => user.userId === receiverId);
        let sender = users.find(user => user.userId === senderId);
        let user = await User.findById(senderId);
    
        if (!receiver) {
            receiver = await Staff.findOne({ _id: receiverId });
        }
    
        if (!sender) {
            sender = await Staff.findOne({ _id: senderId });
        } 
    
        if (!user) {
            user = await Staff.findOne({ _id: senderId });
        }
    
        console.log('Receiver:', receiver);
        console.log('Sender:', sender);
        console.log('User:', user);
    
        const userInfo = user 
            ? { id: user._id, fullName: user.username, email: user.email }
            : { id: user._id, fullName: user.account, email: 'Unknown' };
        console.log(userInfo);
    
        // Emit to receiver if receiver is found
        if (receiver && receiver.socketId) {
            io.to(receiver.socketId).emit('getMessage', {
                senderId,
                message,
                conversationId,
                receiverId,
                user: userInfo
            });
        }
    
        // Emit to sender if sender is found
        if (sender && sender.socketId) {
            io.to(sender.socketId).emit('getMessage', {
                senderId,
                message,
                conversationId,
                receiverId,
                user: userInfo
            });
        }
    });
    
    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id);
        io.emit('getUsers', users);
    });
    // io.emit('getUsers', socket.userId);
});

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
app.post('/api/tao-cv', async (req, res) => {
    try {
        const cvData = req.body;
        console.log(cvData);
        const newCV = new CV({
            name: cvData.name,
            phone: cvData.phone,
            email: cvData.email,
            address: cvData.address,
            chucvu: cvData.chucvu,
            muctieu: cvData.muctieu,
            experience: cvData.experience.map(exp => ({
                companyName: exp.companyName,
                from: new Date(exp.from),
                to: new Date(exp.to),
                jobName: exp.jobName,
                jobDescription: exp.jobDescription
            })),
            project: cvData.project.map(proj => ({
                projectName: proj.projectName,
                from: new Date(proj.from),
                to: new Date(proj.to),
                customer: proj.customer,
                projectScope: proj.projectScope,
                projectDescription: proj.projectDescription
            })),
            education: {
                from: new Date(cvData.education.from),
                to: new Date(cvData.education.to),
                chuyennganh: cvData.education.chuyennganh,
                school: cvData.education.school,
                description: cvData.education.description
            },
            skill: {
                skill: cvData.skill.skill,
                description: cvData.skill.description
            },
            awards: cvData.awards.map(award => ({
                from: new Date(award.from),
                to: new Date(award.to),
                awardName: award.awardName,
                awardDescription: award.awardDescription
            })),
            certificate: cvData.certificate.map(cert => ({
                from: new Date(cert.from),
                to: new Date(cert.to),
                certificateDes: cert.certificateDes
            })),
            idUser: cvData.idUser // Lấy giá trị idUser từ request body

            
        });
        console.log(newCV);
        const savedCV = await newCV.save();
        res.status(201).json(savedCV);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})
app.get('/api/cv/:userId/chucvu', async (req, res) => {
    const idUser = req.params.userId;
  
    try {
      const cv = await CV.findOne({ idUser }).select('chucvu');
  
      if (!cv) {
        return res.status(404).send('CV not found');
      }
  
      res.json({ chucvu: cv.chucvu });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
app.post('/api/conversation', async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const newCoversation = new Conversation({ members: [senderId, receiverId] });
        await newCoversation.save();
        res.status(200).json(await newCoversation);
    } catch (error) {
        console.log(error, 'Error')
    }
})

app.get('/api/conversations/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("line 187" + userId);
        const conversations = await Conversation.find({ members: { $in: [userId] } });
        const conversationUserData = Promise.all(conversations.map(async (conversation) => {
            const receiverId = conversation.members.find((member) => member !== userId);
            const user = await User.findById(receiverId);
            if(user == null){
                const staff = await Staff.findById(receiverId)
                return { user: { receiverId: staff._id, email: "hr", username: staff.account }, conversationId: conversation._id }
            }else{
                return { user: { receiverId: user._id, email: user.email, username: user.username }, conversationId: conversation._id }
            }
        }))
        res.status(200).json(await conversationUserData);
    } catch (error) {
        console.log(error, 'Error')
    }
})

app.post('/api/message', async (req, res) => {
    try {
        const { conversationId, senderId, message, receiverId = '' } = req.body;
        if (!senderId || !message) return res.status(400).send('Please fill all required fields')
        if (conversationId === 'new' && receiverId) {
            const newCoversation = new Conversation({ members: [senderId, receiverId] });
            await newCoversation.save();
            const newMessage = new Messages({ conversationId: newCoversation._id, senderId, message });
            await newMessage.save();
            return res.status(200).send('Message sent successfully');
        } else if (!conversationId && !receiverId) {
            return res.status(400).send('Please fill all required fields')
        }
        const newMessage = new Messages({ conversationId, senderId, message });
        await newMessage.save();
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.log(error, 'Error')
    }
})

app.get('/api/message/:conversationId', async (req, res) => {
    try {
        const checkMessages = async (conversationId) => {
            console.log(conversationId, 'conversationId')
            const messages = await Messages.find({ conversationId });
            const messageUserData = Promise.all(messages.map(async (message) => {
                const user = await User.findById(message.senderId);
                if(user == null){
                    const user = await Staff.findById(message.senderId);
                    return { user: { id: user._id, email: '', fullName: user.account }, message: message.message }

                }else{
                    return { user: { id: user._id, email: user.email, fullName: user.username }, message: message.message }

                }
            }));
            res.status(200).json(await messageUserData);
        }
        const conversationId = req.params.conversationId;
        if (conversationId === 'new') {
            const checkConversation = await Conversation.find({ members: { $all: [req.query.senderId, req.query.receiverId] } });
            if (checkConversation.length > 0) {
                checkMessages(checkConversation[0]._id);
            } else {
                return res.status(200).json([])
            }
        } else {
            checkMessages(conversationId);
        }
    } catch (error) {
        console.log('Error', error)
    }
})

app.get('/api/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const users = await User.find({ _id: { $ne: userId } });
        const usersData = Promise.all(users.map(async (user) => {
            return { user: { email: user.email, fullName: user.fullName, receiverId: user._id } }
        }))
        res.status(200).json(await usersData);
    } catch (error) {
        console.log('Error', error)
    }
})
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
