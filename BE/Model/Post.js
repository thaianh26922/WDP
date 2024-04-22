import { ObjectId } from "mongodb";
import mongoose  from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    HRId: {type: Schema.Types.ObjectId, required: true, ref: 'Staff'},
    companyId: {type: Schema.Types.ObjectId, required: true, ref: 'Company'},
    jobCategory: {type: ObjectId, required: true, ref: 'JobCategory'}, 
    status: {type: String, required: false, default: 'Pending'},
    title: {type: String, required: true, max: 50},
    jobDescription: {type: String, required: true, max: 2000},
    salary: {type: String, required: false, max: 200, default: "Thỏa thuận"},
    candidateReq: {type: String, required: false, max: 2000},
    location: {type: String, required: false, max: 200},
    deadline: {type: Date, required: true},
    priority: {type: Boolean, required: false, default: false},
},
 {
    timestamps: true
});
const Post = mongoose.model('Post', PostSchema)


export {Post};