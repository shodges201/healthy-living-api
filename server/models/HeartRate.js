const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const heartRateSchema = new Schema({
    userID: {
        type: mongoose.Types.ObjectId
    },
    rate: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
})


const HeartRate = mongoose.model("HeartRate", heartRateSchema);
module.exports = HeartRate;
