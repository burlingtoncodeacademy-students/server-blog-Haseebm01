require('dotenv').config();
const express = require('express'); 
const app = express(); 
// const PORT = 4002;
const PORT = process.env.PORT;

// Controllers
const routeController = require('./controllers/routes');

// Middleware
app.use(express.json());

// Routes
app.use('/routes', routeController);

app.listen(PORT, console.log(`Running on port ${PORT}`));