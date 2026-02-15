const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

//Import routes
const homeRoutes = require('./controllers/homeRoutes');
const eventRoutes = require('./controllers/api/eventRoutes');

//Handlebars setup
const hbs = exphbs.create({
    helpers: {
        format_date: (date) => {
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Session middleware (basic setup for now)
app.use(session({
    secret: process.env.SESSION_SECRET || 'localize-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true in production with HTTPS
}));

//Use routes
app.use('/', homeRoutes);
app.use('/api/events', eventRoutes);

//Start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 DayAway Board running on port ${PORT}`);
  });
});
