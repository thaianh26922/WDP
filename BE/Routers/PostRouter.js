import express from 'express'
import PostController from '../Controller/PostController.js';

const PostRouter = express.Router();

PostRouter.get('/get-all-posts', (req, res) => {
    PostController.getAllPosts(req, res);
});

PostRouter.get('/get-post-by-id/:id', (req, res) => {
    PostController.getPostById(req, res);
});

PostRouter.post('/insert-post', (req, res) => {
    PostController.insertPost(req, res);
});

PostRouter.put('/update/:id', (req, res) => {
    PostController.updatePost(req, res);
});

PostRouter.get('/get-posts-by-title/:title', (req, res) => {
    PostController.getPostsByTitle(req, res);
});

PostRouter.get('/search-posts-by-keyword/:keyword', (req, res) => {
    PostController.searchPostsByKeyword(req, res);
});

PostRouter.get('/get-posts-by-company-id/:companyId', (req, res) => {
    PostController.getPostsByCompanyId(req, res);
});
PostRouter.put('/accept-post', (req, res) => {
    PostController.changePostStatus(req, res);
});

PostRouter.delete('/delete-post-by-id/:postId', PostController.deletePostById);


export { PostRouter }