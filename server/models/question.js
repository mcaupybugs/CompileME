var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    code: String,
    title: String,
    content: String,
    testCase: String
});

var Question = mongoose.model("Question", questionSchema);

module.exoprts = Question;