import express from "express";
import { insertUser, updateUser, forgotPassword, loginUser, applyJob, updatePasswordByUsername, followCompany, followPost, unfollowPost, unfollowCompany, getAllPostFollowed, getAllCompanyFollowed } from "../Controller/UserController.js";

import authenToken from "../Middleware/AuthenToken.js";

const UserRouter = express.Router();

UserRouter.post("/register", (req, res) => {
    insertUser(req, res);
});

UserRouter.put("/update-user/:id", authenToken, (req, res) => {
    updateUser(req, res);
});

UserRouter.patch("/forgot-password", (req, res) => {
    forgotPassword(req, res);
});


UserRouter.post('/login', (req, res) => {
    loginUser(req, res);
});

UserRouter.post('/apply-jobs', authenToken, (req, res) => {
   applyJob(req, res); 
});

UserRouter.put('/update-password', authenToken, (req, res) => {
    updatePasswordByUsername(req, res);
})

UserRouter.put('/:userId/follow-post', authenToken, (req, res) => {
    followPost(req, res);
});
UserRouter.put('/:userId/unfollow-post', authenToken, (req, res) => {
    unfollowPost(req, res);
});

UserRouter.put('/:userId/follow-company', authenToken, (req, res) => {
    followCompany(req, res);
});
UserRouter.put('/:userId/unfollow-company', authenToken, (req, res) => {
    unfollowCompany(req, res);
});

UserRouter.get('/:userId/get-all-posts-followed', authenToken, (req, res) => {
    getAllPostFollowed(req, res);
});
UserRouter.get('/:userId/get-all-companies-followed', (req, res) => {
    getAllCompanyFollowed(req, res);
});

export { UserRouter};

