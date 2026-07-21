// 1. CONFIGURATION & ENVIRONMENT VARIABLES
const env = require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

// 2. IMPORT MODULES
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverRide = require('method-override');
const helmet = require('helmet');

// 3. IMPORT MODELS & ROUTERS
const Blog = require('./models/blog');
const blogRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes');

// 4. IMPORT MIDDLEWARE
const { authLimiter } = require('./middleware/rateLimiter');
const { requireAuth, requireOwner } = require('./middleware/authMiddleware');
const asyncHandler = require('./middleware/asyncHandler');

// 5. INITIALIZE APP & SETTINGS
const app = express();
app.set('view engine', 'ejs');

// 6. GLOBAL SECURITY MIDDLEWARE
app.use(helmet());

// 7. BODY PARSERS, STATICS, & METHOD OVERRIDES
app.use(express.urlencoded({ extended: true })); // Parses user data into JS objects
app.use(methodOverRide('_method'));
app.use(express.static('public'));               // Serves static files early

// 8. SESSION SETUP
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// 9. CUSTOM GLOBAL MIDDLEWARES (Requires session)
app.use((req, res, next) => {
    res.locals.currentUser = req.session.userId || null;
    next();
});

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// 10. MAIN APP ROUTES
app.get('/', asyncHandler(async (req, res) => {
    const result = await Blog.find();
    res.render('blogs/home', { title: 'Home', blogs: result });
}));

app.get('/dashboard', requireAuth, (req, res) => {
    res.render('dashboard', { title: "Dashboard" });
});

app.get('/register', (req, res) => {
    res.render('auth/register', { title: "Sign up", error: null });
});

app.get('/create', requireAuth, (req, res) => {
    const title = "Add blog";
    res.render('blogs/create', { title });
});

app.get('/login', (req, res) => {
    res.render('auth/login', { error: null, title: "Sign in" });
});

// 11. ROUTER MIDDLEWARES
app.use('/blogs', blogRouter);
app.use('/auth', authLimiter, userRouter);

// 12. 404 FALLBACK HANDLER
app.use((req, res) => {
    const title = "404";
    res.status(404).render('404', { title });
});

// 13. GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err.stack);
    const statusCode = res.statusCode && res.statusCode != 200 ? res.statusCode : 500;
    res.status(statusCode).render('error', { error: err.message || 'Something went wrong' });
});

// 14. DATABASE CONNECTION & SERVER START
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("db connected successfully");
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => console.log(err));