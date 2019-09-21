const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;
//controller for flight API
const flightAPI = require('./controllers/flightControllers.js');
const eventsAPI = require('./controllers/eventsController.js');


app.use(bodyParser.json())

app.use('/assets', express.static(path.join(__dirname, '/../client/assets')))

app.get('/', (req ,res) => {
  res.status(200).sendFile(path.join(__dirname + '/../index.html'));
});
//getting all of the airport locations
app.get('/aiportFetch', flightAPI.getAiportTravelDestination, (req, res)=>{
    console.log(res.body)
})

app.get('/flightFetch', flightAPI.getFlightPrices , (req, res)=>{
    console.log(res.body)
})

// getting events by location
// app.get('/events', eventsAPI.getEvents, (req, res, next) => {
//   console.log(res.body);
// });



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
