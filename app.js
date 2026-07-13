const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverRide = require('method-override');
const Blog = require('./models/blog');
const blogRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes');
const requireAuth = require('./middleware/authMiddleware');
const env = require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');
// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("db connected successfully");
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => console.log(err));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.currentUser = req.session.userId || null;
    next();
});

// parse user data into js objects
app.use(express.urlencoded({ extended: true }));

app.use(methodOverRide('_method'));

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.get('/', (req, res) => {
    Blog.find().then(result => {
        res.render('blogs/home', {title: 'Home', blogs: result});
    }).catch(err => console.log(err));    
});

app.get('/dashboard', requireAuth, (req, res) => {
    res.render('dashboard', {title: "Dashboard", });
});

app.get('/register', (req, res) => {
    res.render('auth/register', {title: "Sign up"});
});

app.get('/create',requireAuth, (req, res) => {
    const title = "Add blog";
    res.render('blogs/create', {title});
});

app.get('/login', (req, res) => {
    res.render('auth/login', {error: null, title: "Sign in"});
});

app.use('/blogs', blogRouter);
app.use('/auth', userRouter);

app.use(express.static('public'));

app.use((req, res) => {
    const title = "404";
    res.status(404).render('404', {title})
});

