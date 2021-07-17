const express = require("express");
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const config = require('./config')
const errorHandler = require("./middleware/errorHandler")

const app = express();

// API Config
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
mongoose.Promise = global.Promise;
mongoose.connect(
	`mongodb+srv://${config.database.username}:${config.database.password}@${
		config.database.dbhost
	}`,
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

// Client Config
app.set('view engine', 'ejs')
app.use(express.static('public'))


// Import routes
const clientRoutes = require('./routes/client')
const apiRoutes = require('./routes/api')

// Use routes
app.use(clientRoutes)
app.use("/api/v1/", apiRoutes)

// Use middleware
app.use(errorHandler)


// Listen
app.listen(3000, () => {
  console.log("Client listening on port 3000");
})
