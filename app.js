const express = require('express'); 
const app = express(); 
const routeController = require('./controllers/routes');

app.use(express.json());

app.use('/routes', routeController);