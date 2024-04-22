import mongoose  from "mongoose";

const Schema = mongoose.Schema;

const hrManagerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    account: {type: String, required: true, max: 200},
    password: {type: String, required: true, max: 200},
    conpanyId: {type: Schema.Types.ObjectId, ref: 'Company'},
});

const HRManager = mongoose.model('HRManager', hrManagerSchema);

module.exports = HRManager;