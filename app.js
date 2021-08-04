/*
Working on student show page.
Need to add authorization to all student routes
*/

const express = require('express');
const dotenv = require('dotenv');
const favicon = require('serve-favicon');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const errorHandler = require('./middleware/errorHandler');
const makeUserAvailable = require('./middleware/makeUserAvailable');
const User = require('./models/user');

const app = express();
dotenv.config({ path: './config/config.env' });
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// API Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Cookieparser config
app.use(cookieParser());

// Client Config
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Import routes
const clientRoutes = require('./routes/client');
const apiRoutes = require('./routes/api');

// Passport Config
app.use(
  expressSession({
    secret: process.env.ES_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session()); // Allows persistent sessions
passport.serializeUser(User.serializeUser()); // What data should be stored in session
passport.deserializeUser(User.deserializeUser()); // Get user data from stored session
passport.use(new LocalStrategy(User.authenticate())); // Use the local strategy

// Use middleware
app.use(errorHandler);
app.use(makeUserAvailable);

// Use routes
app.use(clientRoutes);
app.use('/api/v1/', apiRoutes);

// Listen
app.listen(3000, () => {
  console.log('Client listening on port 3000');
});
