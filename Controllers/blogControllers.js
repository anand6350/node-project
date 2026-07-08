const Blog = require('../models/blog');

// blogPost, blogDetails, blogDelete

const blogPost = (req, res) => {
    Blog.create({
        title : req.body.title,
        snippet: req.body.snippet
    }).then(() => res.redirect('/'))
    .catch(err => console.log(err));
}

const blogDetails = (req, res) => {
    const id = req.params.id;
    Blog.findById(id).then(result => {
        if(!result){
           return res.status(404).render('404', {title: 'blog not found'});
        }
        res.render('blogs/blogdetails', {title: result.title, blog: result});
    }).catch(err => {
        console.log("THE HIDDEN ERROR IS:", err);
        res.status(500).send("Internal Server Error");
    });
}

const blogDelete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id).then(result => res.json({redirect: '/'})).catch(err => console.log(err));
}

module.exports = {
    blogPost,
    blogDetails,
    blogDelete
}

