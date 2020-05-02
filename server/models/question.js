var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    code: String,
    title: String,
    content: String,
    testCaseInput: String,
    testCaseOutput: String
});

var Question = mongoose.model("Question", questionSchema);

module.exports = Question;