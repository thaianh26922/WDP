import Message from '../Model/Message.js';

async function sendMessage(req, res) {
    try {
        const { sender, recipient, content } = req.body;
        const message = new Message({ sender, recipient, content });
        await message.save();
        res.json(message);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getMessages(req, res) {
    try {
        const { userId } = req.params;
        // Tìm tất cả tin nhắn mà người dùng là người gửi hoặc người nhận
        const messages = await Message.find({
            $or: [
                { sender: userId },
                { recipient: userId }
            ]
        }).sort({ timestamp: 'desc' }).populate('sender recipient');
        res.json(messages);
    } catch (error) {
        console.error('Error getting messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export default {
    sendMessage,
    getMessages
};
