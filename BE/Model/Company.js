import { ObjectId } from "mongodb";
import mongoose  from "mongoose";

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    taxCode: {type: String, required: true, max: 200},
    account: {type: String, required: true, max: 200},
    password: {type: String, required: true, max: 200},
    email: {type: String, required: true, max: 200},
    name: {type: String, required: true, max: 50, required: true},
    bio: {type: String, required: false, max: 250, default: ''},
    avatar: {type: String, required: false},
    size: {type: String, required: false, max: 200},
    phone: {type: String, required: true, max: 250},
    website: {type: String, required: false, max: 200},
    location: {type: String, required: false, max: 200},
    vip: {type: String, required: false, enum: ['LUX', 'NORMAL']},
},
 {
    timestamps: true
});

const Company = mongoose.model('Company', CompanySchema);
export {Company}