import mongoose from "mongoose";

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true, max: 200 }},
    {
    timestamps: true
    });
    const Notification = mongoose.model('notification', notificationSchema)
export {Notification}