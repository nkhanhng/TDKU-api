const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema({
    createBy: {type: Schema.Types.ObjectId, ref: "users", required: true},
    content: {type: String, required: true}
})

const PostSchema = new Schema({
    image: {type: Buffer, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    like: {type: Number, default: 0},
    active: {type: Boolean, default: true},
    comment: {type: [commentSchema], default: []},
    createBy: {type: Schema.Types.ObjectId, ref: "users", required: true}
})

module.exports = mongoose.model('posts', PostSchema)