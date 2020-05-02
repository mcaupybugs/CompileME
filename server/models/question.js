var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    code: String,
    title: String,
    content: String,
    input: String,
    output: String,
    constraints: String,
    tasks: String,
    exampleInput: String,
    exampleOutput: String,
    explaination: String,
    testCaseInput: String,
    testCaseOutput: String
});

var Question = mongoose.model("Question", questionSchema);

module.exports = Question;