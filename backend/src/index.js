const express = require('express');
const bp = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

/////////////////////////       INITIALIZE

const app = express();
require('./database');
require('./config/passport');

//////////////////////          MIDDELWARES

app.use(bp.json());
app.use(express.json());
app.use(bp.urlencoded({ extended: true }));
app.use(session({
    secret: 'Mailjs',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

/////////////////////////       ROUTES

app.use(require('./routes/main'));
app.use(require('./routes/mail'));
app.use(require('./routes/users'));

/////////////////////////       SETTINGS

app.set('port', 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/////////////////////////       SATIC FILES

app.use(express.static(path.join(__dirname, 'public')));

////////////////////////        START SERVER

app.listen( app.get('port'), ()=>{
    console.log('Server on port:', app.get('port'));
});