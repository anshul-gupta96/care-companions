var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gfg', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log("connection succeeded");
});

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/sign_up', async function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.password;
    var phone = req.body.phone;

    var data = {
        "name": name,
        "email": email,
        "password": pass,
        "phone": phone
    }

    try {
        await db.collection('details').insertOne(data);
        console.log("Record inserted Successfully");
        return res.redirect('signup.html');
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error inserting record");
    }
});

app.get('/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('index.html');
});

app.listen(3000, function () {
    console.log("server listening at port 3000");
});
