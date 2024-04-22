import mongoose  from "mongoose";

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    postId: {type: Schema.Types.ObjectId, required: true, ref: 'Post'},
    content: {type: String, required: true, max: 2000},
    status: {type: String, required: true, default: 'Pending', max: 200, enum: ['Finished', 'Pending']},
}, {
    timestamps: true
});
const Report = mongoose.model('Report',ReportSchema);
export {Report};