const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    avatar_url: String,
    description: String,
    username: String,
    password_hash: String,
    email: String,
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema);