const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://philippe:mossoko0302@cluster0.1fftp.mongodb.net/MERN-testDB",
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected to mongoDB")
);

const singerSchema = new mongoose.Schema({
  firstName: String,
});

const Singer = mongoose.model("Singer", singerSchema);

app.get("/api/customers", async (req, res) => {
  // const customers = [
  //   { id: 1, firstName: "Kurt", lastName: "Cobain" },
  //   { id: 2, firstName: "Courtney", lastName: "Love" },
  //   { id: 3, firstName: "Ben", lastName: "Harper" },
  // ];

  const singers = await Singer.find();

  res.json({ data: singers });
});

app.post("/test", async (req, res) => {
  const singer = await Singer.create(req.body).then(
    res.json({ data: req.body.firstName })
  );
  console.log(singer);
});

const port = 5000;

app.listen(port, () => console.log(`server started on ${port}`));

// in back package.json :
// npm instal concurrently
// add scripts:
// "client": "cd client && npm start",
// "dev": "concurently \"npm run server\" \"npm run client\" "

// in react package.json :
// "proxy": "http://localhost:5000"

// to fix React colorette issue :
// npm i autoprefixer@9.8.0
