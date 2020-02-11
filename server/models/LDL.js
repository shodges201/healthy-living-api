const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LDLSchema = new Schema({
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


const LDL = mongoose.model("LDL", LDLSchema);
module.exports = LDL;