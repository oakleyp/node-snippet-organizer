const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body: String,
    notes: String,
    language: String
}, {timestamps: true})

module.exports = mongoose.model("Comment", CommentSchema);