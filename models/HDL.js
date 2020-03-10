const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HDLSchema = new Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
})


const HDL = mongoose.model("HDL", HDLSchema);
module.exports = HDL;