const express = require("express");
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const config = require('./config')

const server = express();
const client = express();

// API Config
server.use(express.json())
server.use(methodOverride('_method'))
mongoose.Promise = global.Promise;
mongoose.connect(
	`mongodb+srv://${config.database.username}:${config.database.password}@${
		config.database.dbhost
	}`,
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

// Client Config
client.set('view engine', 'ejs')
client.use(express.static('public'))
client.use(methodOverride('_method'))



// Import routes
const indexRoutes = require('./routes/index')
const apiRoutes = require('./routes/api')

// Use routes
client.use(indexRoutes)
server.use(apiRoutes)


// Listen
server.listen(3001, () => {
  console.log("API server listening on port 3001");
})

client.listen(3000, () => {
  console.log("Client listening on port 3000");
})
