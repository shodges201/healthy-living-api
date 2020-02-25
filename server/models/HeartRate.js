const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const heartRateSchema = new Schema({
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


const HeartRate = mongoose.model("HeartRate", heartRateSchema);
module.exports = HeartRate;
