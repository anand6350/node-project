const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./model/blog');
const blogRoutes = require('./routes/blogRoutes');
const env = require('dotenv').config();

const app = express();

// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("db connected successfully");
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => console.log(err));

app.set('view engine', 'ejs');

// parse user data into js objects
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.get('/', (req, res) => {
    Blog.find().then(result => {
        res.render('blogs/home', {title: 'Home', blogs: result});
    }).catch(err => console.log(err));    
});

app.get('/create', (req, res) => {
    const title = "Add blog";
    res.render('blogs/create', {title});
});

app.use('/blogs', blogRoutes);
app.use(express.static('public'));

app.use((req, res) => {
    const title = "404";
    res.status(404).render('404', {title})
});

