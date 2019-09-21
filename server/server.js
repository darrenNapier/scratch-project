const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;
//controller for flight API
const flightAPI = require('./flightControllers/flightControllers.js');

app.use(bodyParser.json())

app.use('/assets', express.static(path.join(__dirname, '/../client/assets')))


const unirest = require("unirest");
// var req = unirest("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/2b3aee7f7emsh9a3043bf4a78f25p186a4ejsn07fdb9fc52ed");

// req.query({
// 	"pageIndex": "0",
// 	"pageSize": "10"
// });

// req.headers({
// 	"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
// 	"x-rapidapi-key": "2b3aee7f7emsh9a3043bf4a78f25p186a4ejsn07fdb9fc52ed"
// });

// req.end(function (res) {
// 	if (res.error) throw new Error(res.error);
// 	console.log(res.body);
// });

var req = unirest("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/LASA-sky/anytime");
//headers for the request to skyscanner, the host and unique KEY for access
req.headers({
    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    "x-rapidapi-key": "2b3aee7f7emsh9a3043bf4a78f25p186a4ejsn07fdb9fc52ed"
});

req.end(function (res) {
    if (res.error) throw new Error(res.error);
    console.log(res.body);
    // return /next();
});




app.get('/', (req ,res) => {
  res.status(200).sendFile(path.join(__dirname + '/../index.html'));
});
//getting all of the airport locations
app.post('/aiportFetch', flightAPI.getAiportTravelDestination, (req, res)=>{
    console.log(res.body)
})

app.get('/flightFetch', flightAPI.getFlightPrices , (req, res)=>{
    console.log(res.body)
})



app.all('*', (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  }
  const errObj = Object.assign((defaultErr, err));
  console.log(errObj.log);

  res.sendStatus(errObj.status).json(errorObj.message);
});


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
