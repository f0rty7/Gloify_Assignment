const express = require("express");
const port = process.env.PORT || 4000;
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const dbUrl = "mongodb://localhost:27017/Gloify";

mongoose.connect(
  dbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  error => {
    if (error) {
      console.log("Connection to Databse failed");
      console.log(error);
    } else {
      console.log("Database connected");
    }
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", function(req, res, next){
  res.send(JSON.stringify(`Helloooo!!! there you've reached backend. Server is online!!!`))
})

app.listen(port, () => {
  console.log("Server running on port ==> " + port);
});
