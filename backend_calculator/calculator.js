const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/bmiCalculator", (req, res) => {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmiCalculator", (req, res) => {
  height = parseInt(req.body.ht);
  weight = parseInt(req.body.wt);
  bmi = Math.floor((weight / height ** 2) * 10000);

  res.send(`Your BMI is ${bmi}`);
});

app.post("/", (req, res) => {
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);
  let result = num1 + num2;

  res.send(`Result of calculation is ${result}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
