const { response } = require("express");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const https = require("https");
const port = 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const city = query;
  const appKey = "c25ba34f6dfe3ff883dfc2c6d617b38a";
  const units = "metric";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    appKey +
    "&units=" +
    units;

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl =
        "https://www.openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<h1>The weather in " +
          query +
          " is currently " +
          temp +
          " degrees Celcius.</h1>"
      );
      res.write("<p>Enjoy the " + weatherDescription + ".<p>");
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });
});

app.listen(port, function () {
  console.log("Server listening on " + port + ".");
});
