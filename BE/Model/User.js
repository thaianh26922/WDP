import { ObjectId } from "mongodb";
import mongoose  from "mongoose";

const Schema = mongoose.Schema;

function validator(val){
    return val != null;
}

const UserSchema = new Schema({
    username: {type: String, required: true, max: 200},
    password: {type: String, required: true, max: 200},
    email: {type: String, required: true, max: 200},
    phone: {type: String, required: true, max: 200},
    isVip: {type: Boolean, required: false, default: false},
    isAdmin: {type: Boolean, required: false},
    avatar: {type: String, required: false, max: 200},
    bio: {type: String, required: false, max: 250},
    created_at: {type: Date, required: true, default: Date.now},
    savedPost: [{type: ObjectId, require: false, validate: validator, ref: 'Post'}],
    followCompany: [{type: ObjectId, require: false, validate: validator, ref: 'Company'}],
});

const User = mongoose.model('User',UserSchema);
export {User}