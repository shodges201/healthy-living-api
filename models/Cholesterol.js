const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cholesterolSchema = new Schema({
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


const Cholesterol = mongoose.model("Cholesterol", cholesterolSchema);
module.exports = Cholesterol;