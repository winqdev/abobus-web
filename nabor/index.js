const express = require("express");
const app = express();
const mongo = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config.json");

app.use(bodyParser.urlencoded({extended: true}))

mongo.connect(config.dblink,
    err => {
        if(err) throw err;
        console.log('Database connected!')
    });

const naborSchema = {
    username: String,
    age: String,
    adequate: String,
    discord: String,
    region: String
}

const Nabor = mongo.model("nabor", naborSchema)

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
    app.use(express.static(__dirname + '/deco'));
})

app.post("/", function(req, res) {
    let newNabor = new Nabor({
    username: req.body.urname,
    age: req.body.age,
    adequate: req.body.theadequate,
    discord: req.body.discord,
    region: req.body.region
    });
    newNabor.save();
    res.redirect("https://google.com");
})

app.listen(80, function() {
    console.log("App running!")
})