var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs');
const { exec, spawn } = require('child_process');


// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'upload');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// })

// var upload = multer({ storage: storage });

mongoose.connect("mongodb://localhost/CompileME");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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


// listening route
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})