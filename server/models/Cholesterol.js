const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cholesterolSchema = new Schema({
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


const Cholesterol = mongoose.model("Cholesterol", cholesterolSchema);
module.exports = Cholesterol;