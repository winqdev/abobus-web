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

const anketaSchema = {
    username: String,
    skills: String,
    age: String,
    discord: String,
    region: String
}

const Anketa = mongo.model("anketa", anketaSchema)


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
    app.use(express.static(__dirname + '/deco'));
})

app.post("/", function(req, res) {
    let newAnketa = new Anketa({
    username: req.body.urname,
    skills: req.body.skill,
    age: req.body.age,
    discord: req.body.discord,
    region: req.body.region
    });
    newAnketa.save();
    res.redirect("https://google.com");
})

app.listen(80, function() {
    console.log("App running!")
})