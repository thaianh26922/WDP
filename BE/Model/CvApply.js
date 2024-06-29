import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

function validator(val) {
    return val != null;
}

const experienceSchema = new Schema({
    companyName: { type: String, required: true, max: 200 },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    jobName: { type: String, required: true, max: 200 },
    jobDescription: { type: String, required: true, max: 1000 },
}, { _id: false });

const projectSchema = new Schema({
    projectName: { type: String, required: true, max: 200 },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    customer: { type: String, required: true, max: 200 },
    projectScope: { type: String, required: true, max: 500 },
    projectDescription: { type: String, required: true, max: 1000 },
}, { _id: false });

const educationSchema = new Schema({
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    chuyennganh: { type: String, required: true, max: 200 },
    school: { type: String, required: true, max: 200 },
    description: { type: String, required: true, max: 1000 },
}, { _id: false });

const skillSchema = new Schema({
    skill: { type: String, required: true, max: 200 },
    description: { type: String, required: true, max: 1000 },
}, { _id: false });

const awardSchema = new Schema({
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    awardName: { type: String, required: true, max: 200 },
    awardDescription: { type: String, required: true, max: 1000 },
}, { _id: false });

const certificateSchema = new Schema({
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    certificateDes: { type: String, required: true, max: 1000 },
}, { _id: false });

const CvApplySchema = new Schema({
    name: { type: String, required: true, max: 200 },
    phone: { type: String, required: true, max: 200 },
    email: { type: String, required: true, max: 200 },
    address: { type: String, required: true, max: 200 },
    chucvu: { type: String, required: true, max: 200 },
    muctieu: { type: String, required: true, max: 200 },
    experience: { type: [experienceSchema], required: false },
    project: { type: [projectSchema], required: false },
    education: { type: educationSchema, required: true },
    skill: { type: skillSchema, required: true },
    awards: { type: [awardSchema], required: true },
    certificate: { type: [certificateSchema], required: true },
    idUser: { type: String, required: true, max: 200 },
});

const CV = mongoose.model('CvApply', CvApplySchema);
export { CV };
