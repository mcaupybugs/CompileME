var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs');

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


// listening route
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})