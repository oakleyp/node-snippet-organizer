const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SnippetSchema = new Schema({
    title: String,
    body: String,
    notes: String,
    language: String,
    tags: String,
}, {timestamps: true})

module.exports = mongoose.model("Snippet", SnippetSchema);