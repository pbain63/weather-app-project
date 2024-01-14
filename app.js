//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// widgets code long:
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  //console.log(req.body.cityName);//
  const city = req.body.cityName;

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=13a0905082de2b6e1aa988f8b675e363&units=metric";
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp; //
      const weatherDescription = weatherData.weather[0].description;
      const imageIcon = weatherData.weather[0].icon;
      const imageUrl =
        "https://openweathermap.org/img/wn/" + imageIcon + "@2x.png";
      //console.log(temp);
      //console.log(description);

      res.write(
        "<h1>The temperature in " +
          city +
          " is " +
          temp +
          " degrees Celsius." +
          "</h1>"
      );

      res.write("<h2>The weather is currently " + weatherDescription + "</h2>");
      res.write("<img src = " + imageUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
