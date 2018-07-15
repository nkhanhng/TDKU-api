const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TradeModel = new Schema({
    ownerId: {type: String, required: true},
    postId: {type: String, required: true},
    guestId: {type: String, required: true},
    status: {type: Number, default: 0, required: true}
})

    // status: 
    // 0: pending
    // 1: accept
    // 2: deny

module.exports = mongoose.model('trades', TradeModel)