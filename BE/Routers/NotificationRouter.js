import express from 'express';
import notificationController from '../Controller/NotificationController.js';

const router = express.Router();
router.get('/', notificationController.getNotifications);
router.get('/:recipientId', notificationController.getNotifications);
router.post('/create-notification', notificationController.createNotification);

export default router;
