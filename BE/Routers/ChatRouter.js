import express from 'express';
import chatController from '../Controller/ChatController.js';

const router = express.Router();

router.post('/send-message', chatController.sendMessage);
router.get('/:userId', chatController.getMessages);

export default router;
