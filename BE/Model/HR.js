import mongoose  from "mongoose";

const Schema = mongoose.Schema;

const HR = new Schema({
    _id: Schema.Types.ObjectId,
    account: {type: String, required: true, max: 200},
    password: {type: String, required: true, max: 200},
    name: {type: String, required: true, max: 200},
    companyId: {type: Schema.Types.ObjectId, ref: 'Company'},
});