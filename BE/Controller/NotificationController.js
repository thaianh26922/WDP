import {Notification} from '../Model/Notification.js';

async function getNotifications(req, res) {
    try {
        const notifications = await Notification.find().exec();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createNotification(req, res) {
    try {
        const { userId, content } = req.body;
        const notification = new Notification({ userId, content });
        await notification.save();
        res.status(201).json({ message: 'Notification created successfully', data: notification });
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
export default {
    getNotifications, createNotification
};
