var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    image: String,
    email: String,
    userId: String
});

var User = mongoose.model("User", userSchema)

module.exports = User;