var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs');
const { exec } = require('child_process');
var User = require('./models/user');
var Question = require('./models/question');

mongoose.connect("mongodb://root:example@mongo:27017/");
//mongoose.connect("mongodb+srv://mcaupybugs:CompileIt@cluster0-rqe7k.mongodb.net/test?retryWrites=true&w=majority")
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//==============================================> New user route
app.post('/newUser', (req, res) => {
    //console.log("ru");
    User.exists({ userId: req.body.values.userId }, (err, result) => {
        if (err) {
            res.status(404).send();
            console.log(err);
        } else {
            if (result == true) {
                //   console.log(req.body.values);
                User.findOneAndUpdate({ userId: req.body.values.userId }, req.body, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(404).send();
                    } else {
                        //   console.log("Update");
                        res.status(200).send();
                    }
                })
            } else {
                User.create(req.body.values, (err, data) => {
                    if (err) {
                        console.log(err)
                        res.status(404).send();
                    } else {
                        // console.log("Create");
                        res.status(200).send();
                    }
                })
            }
        }
    })
    res.status(200).send();
})

//==============================================> New question 

app.post('/newQuestion', (req, res) => {
    console.log(req.body.code);
    Question.exists({ code: req.body.code }, (err, result) => {
        if (err) {
            res.send("There was a error ... Try again later..")
            console.log(err);
        } else {
            if (result == true) {
                console.log("Already exists");
                res.send("Question Code already exists");
            } else {
                Question.create(req.body, (err, data) => {
                    if (err) {
                        res.send("There was a error ... Try again later..")
                        console.log(err);
                    } else {
                        res.send("Upload Success");
                        console.log(data);
                    }
                })
            }
        }
    })
})

//==============================================> Question list

app.get('/questionList', (req, res) => {
    Question.find({}, (err, data) => {
        if (err) {
            res.status(404).send();
        } else {
            res.status(200).send(data);
            console.log(data);
        }
    })
})


//==============================================>Single question route
app.get('/questionDetail/:id', (req, res) => {
    //console.log(req.params.id);
    var questionCode = req.params.id;
    Question.find({ code: questionCode }, (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).send();
        } else {
            res.status(200).send(result);
        }
    })
})

//==============================================>Running route

app.post('/run', (req, res) => {

    var mode = req.body.mode;
    var givenInput = req.body.givenInput;
    fs.writeFile('input.txt', givenInput, (err) => {
        if (err) throw err;
    })
    if (mode === 'c_cpp') {
        fs.writeFile('data.cpp', req.body.code, (err) => {
            if (err) throw err;
        })
        exec('make data', (err, stdout, stderr) => {
            if (err) {
                //console.log(stderr);
                fs.writeFile('output.txt', stderr, (err) => {
                    if (err) throw err;
                    else {
                        res.send(stderr);
                    }
                })
                return;
            } else {
                exec('timeout 1s ./data < input.txt > output.txt', (err, stdout, stderr) => {
                    if (err) {
                        console.log(err);
                        if (err.code == 124) {
                            res.send("TLE");
                        }
                        else if (err.code == 1) {
                            res.send(err.message);
                        } else if (err.code == 139) {
                            res.send("SEGMENTATION FAULT");
                        } else {
                            console.log(err);
                        }
                    } else {
                        fs.readFile('output.txt', (err, data) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.send(data);
                            }
                        })
                    }
                })
            }
        })
    }
    if (mode === 'java') {
        fs.writeFile('Main.java', req.body.code, (err) => {
            if (err) throw err;
        })
        exec('javac Main.java', (err, stdout, stderr) => {
            if (err) {
                fs.writeFile('output.txt', stderr, (err) => {
                    if (err) throw err;
                    else {
                        res.send(stderr);
                    }
                })
                return;
            } else {
                exec('timeout 1s java Main < input.txt > output.txt', (err, stdout, stderr) => {
                    if (err) {
                        console.log(err);
                        if (err.code == 124) {
                            res.send("TLE");
                        }
                        else if (err.code == 1) {
                            res.send(err.message);
                        }
                        else if (err.code == 139) {
                            res.send("SEGMENTATION FAULT");
                        } else {
                            console.log(err);
                        }
                    } else {
                        fs.readFile('output.txt', (err, data) => {
                            if (err) throw err;
                            else {
                                res.send(data);
                            }
                        })
                    }
                })
            }
        })
    }
})

//==========================================================>Submit route
app.post('/submit', (req, res) => {

    var mode = req.body.mode;
    var givenInput = req.body.givenInput;
    var questionCode = req.body.questionCode;
    console.log(questionCode);
    Question.find({ code: questionCode }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result[0].testCaseInput);
            var input = result[0].testCaseInput;
            fs.writeFile('input.txt', input, (err) => {
                if (err) throw err;
            })
            var correct = result[0].testCaseOutput;
            fs.writeFile('correct.txt', correct, (err) => {
                if (err) throw err;
            })
        }
    })

    if (mode === 'c_cpp') {
        fs.writeFile('data.cpp', req.body.code, (err) => {
            if (err) throw err;
        })
        exec('make data', (err, stdout, stderr) => {
            if (err) {
                //console.log(stderr);
                fs.writeFile('output.txt', stderr, (err) => {
                    if (err) throw err;
                    else {
                        res.send("Failed\n" + stderr);
                    }
                })
                return;
            } else {
                exec('timeout 1s ./data < input.txt > output.txt', (err, stdout, stderr) => {
                    if (err) {
                        console.log(err);
                        if (err.code == 124) {
                            res.send("Failed\n TLE");
                        }
                        else if (err.code == 1) {
                            res.send("Failed\n" + err.message);
                        } else if (err.code == 139) {
                            res.send("Failed\n SEGMENTATION FAULT");
                        } else {
                            console.log(err);
                        }
                    } else {
                        var testCase = fs.readFileSync('output.txt', 'utf-8');
                        var correctCase = fs.readFileSync('correct.txt', 'utf-8');
                        if (testCase === correctCase) {
                            res.send("Passed");
                        } else {
                            res.send("Failed");
                        }
                    }
                })
            }
        })
    }
    if (mode === 'java') {
        fs.writeFile('Main.java', req.body.code, (err) => {
            if (err) throw err;
        })
        exec('javac Main.java', (err, stdout, stderr) => {
            if (err) {
                fs.writeFile('output.txt', stderr, (err) => {
                    if (err) throw err;
                    else {
                        res.send("Failed\n" + stderr);
                    }
                })
                return;
            } else {
                exec('timeout 1s java Main < input.txt > output.txt', (err, stdout, stderr) => {
                    if (err) {
                        console.log(err);
                        if (err.code == 124) {
                            res.send("Failed\n TLE");
                        }
                        else if (err.code == 1) {
                            res.send("Failed\n" + err.message);
                        }
                        else if (err.code == 139) {
                            res.send("Failed\n SEGMENTATION FAULT");
                        } else {
                            console.log(err);
                        }
                    } else {
                        var testCase = fs.readFileSync('output.txt', 'utf-8');
                        var correctCase = fs.readFileSync('correct.txt', 'utf-8');
                        if (testCase === correctCase) {
                            res.send("Passed");
                        } else {
                            res.send("Failed");
                        }
                    }
                })
            }
        })
    }
})


// listening route
const port = 3001;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})