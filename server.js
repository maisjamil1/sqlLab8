// GEOCODE_API_KEY=2732c0cd8cc15d
// WEATHER_API_KEY=52af1ae145584cf1819337bd08631a21
// TRAIL_API_KEY=200721508-7f6f7e38c77b1e414967a16beb2af253


//مصيبة 1_____________________
'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
 const superagent= require('superagent')
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
app.use(cors());




//مصيبة 2_____________________

// app.get('/location', (req, res) => {

//   let search_querysql = locationData.search_query
//   let formatted_querysql = locationData.latitude
//   let latitudesql = locationData.latitude
//   let longitudesql = locationData.longitude
//   const SQL = 'INSERT INFO locations(search_query,value) VALUES ($1,$2) RETURNING *'
//   const safeValue = ['search_query', search_querysql];
//   client
//     .query(SQL, safeValue)
//     .then((results) => {
//       res.status(200).json(results.rows);
//     })


//     .catch((err) => {
//       res.status(500).send(err);
//     });

// });



//مصيبة 2_____________________

app.get('/location', (request, response) => {
  const city = request.query.city;
  const SQL = 'SELECT * FROM location WHERE search_query =$1';
  const values =[city];
client.query(SQL,values).then((result)=>{
  response.status(200).json(result.rows);
})
.catch(()=>
app.use((error,request,response)=>{
  response.status(500).send(error);
})
);






// app.get('/location', locationHandler);
// app.get('/weather', weatherHandler);
// app.get('/trails', trailhandler);



// function locationHandler(request, response) {

//   const city = request.query.city; // query string (what we will enter in the front end)
//   superagent(
//     `https://eu1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json`
//   )
//     .then((res) => {
//       console.log('zzzz' , res);

//       const geoData = res.body;
//       console.log("whats this ? :",geoData);

//       const locationData = new Location(city, geoData);
//       response.status(200).json(locationData);
//     })
//     .catch((errT)=> errorHandler(errT, request, response));
// }




// //____________________

//   function weatherHandler(request, response) {
//     superagent(
//       `https://api.weatherbit.io/v2.0/forecast/daily?city=${request.query.search_query}&key=${process.env.WEATHER_API_KEY}`
//     )
//       .then((weatherRes) => {
//         console.log(weatherRes);
//         const weatherSummaries = weatherRes.body.data.map((day) => {
//           return new Weather(day);
//         });
//         response.status(200).json(weatherSummaries);
//       })
//       .catch((errT)=> errorHandler(errT, request, response));
//   }




// //___________________________________________________

//     function trailhandler(request, response) {
//     superagent(`https://www.hikingproject.com/data/get-trails?lat=${request.query.latitude}&lon=${request.query.longitude}&maxDistance=400&key=${process.env.TRAIL_API_KEY}`)

//     .then((trailRes) => {   
//         console.log(trailRes.body);
//         const trailsobj = trailRes.body.trails.map((trail$$)=> {
//             return new Trail(trail$$);
//         });

//         response.status(200).json(trailsobj);

//     })
//     .catch((errT)=> errorHandler(errT, request, response));

//    };






// //______________________________________________
// app.use('*', notFoundHandler);

// function notFoundHandler(request, response) {
//   response.status(404).send('page Not Found');
// }



// constructors_______________________
function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}

   function Weather(day) {
     this.forecast = day.weather.description;
     this.time = new Date(day.valid_date).toString().slice(0, 15);
  }

  function Trail(trail$$) {
    this.name = trail$$.name;
    this.location = trail$$.location ;
    this.length = trail$$.length ;
    this.stars = trail$$.stars ;
    this.star$votes = trail$$.star_votes ;
    this.summary = trail$$.summary ;
    this.trail$url = trail$$.trail_url ;
    this.conditions= trail$$.conditions;
    this.conditions_date=trail$$.condition_date;
    this.conditions_time=trail$$.condtion_time
}

 function errorHandler(error, request, response) {
   response.status(500).send(error);
 }

// client.on('error', (err) => {
//   throw new Error(err);
// });

client
  .connect()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`my server is running on port ${PORT}`)

    );
  })
  .catch((err) => {
    throw new Error(err);
  });




















//________________________________

client
  .query(SQL, values)
  .then((result) => {
    if (result.rows.length > 0) {
      response.status(200).json(result.rows[0]);
    }else {
        superagent(`https://eu1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json`
        ).then((result) => {
          const geoData = res.body;
          const locationData = new Location(city, geoData);
          const SQL = 'INSERT INTO location (search_query,formatted_query,latitude,longitude)VALUES($1,$2,$3,$4) RETURNING *';
const values =[
  locationData.search_query,
  locationData.formatted_query,
  locationData.latitude,
  locationData.longitude,
];
client.query(SQL,values).then((result)=>{
  console.log(result.rows);
  
  response.status(200).json(result.rows[0]);
});

        });

  //     }

  //   }
  // }
  // )





