const { response } = require("express");
const express=require("express");
const https=require("https");  // It is a native node module to get http request
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

/*To use CSS in HTML file*/
app.use(express.static(__dirname + '/public'));

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
    console.log("File Sent");
});


app.post("/", function(req,res)
{
      /*Getting the data from API url*/
      const cityname=req.body.city;
      const url="https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid=b4bc4996f067eeecd582dae3bb08bdbc&mode=json&units=metric#";
      https.get(url,function(response)
      {
          console.log(response.statusCode); // logging the status code on console
          if(response.statusCode==404)
          res.send("<h1>Page not found</h1>");
          else
          { 
          /*Parsing the data to JSON format and outputting it on console*/
          response.on("data", function(data)
          {
              const weatherData=JSON.parse(data);   // parsing the data to JSON format
              console.log(weatherData.temp);           
              
              res.write("<h1>The weather data for "+cityname+" is :</h1>");
              res.write("<p>The coordinates are : <br> Longitude :  "+weatherData.coord.lon+"<br> Latitude :  "+weatherData.coord.lat+"</p>");
              res.write("<p>Temperature : "+weatherData.main.temp+" &#176C</p>");
              res.write("<p>Feels like : "+weatherData.main.feels_like+" &#176C</p>");
              res.write("<p>Descrition : "+weatherData.weather[0].description+"</p>");
              res.write("<p>Wind speed : "+weatherData.wind.speed+" </p>");
              res.write("<p>Humidity : "+weatherData.main.humidity+"% </p>");
              res.write("<p>Visibility : "+weatherData.visibility+" m</p>");
              res.send();  
          });
        }
       
      });
      /*Sending a response to server to show this text */
});


app.listen(3000,function()
{
    console.log("Server started at port 3000");
});