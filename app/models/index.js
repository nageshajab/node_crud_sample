const dbConfig = require("../config/db.config.js");

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.DBURL;//dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.Urls=require("./url.model.js")(mongoose);
db.tags=require("./tags.model.js")(mongoose);

module.exports = db;
