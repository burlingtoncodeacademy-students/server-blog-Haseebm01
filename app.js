const express = require('express'); 
const app = express(); 
const routeController = require('./controllers/routes');



app.use('/routes', routeController);