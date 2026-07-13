const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogControllers');
const Blog = require('../models/blog');

router.get('/edit/:id', (req, res) => {
    Blog.findById(req.params.id).then(blog => {
        res.render('./blogs/edit', {blog, title: 'edit blog'})
    }).catch(err => {
        console.log(err);
    })
})

router.post('/', blogController.blogPost);
router.get('/:id', blogController.blogDetails);
router.delete('/:id', blogController.blogDelete);

router.put('/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        snippet: req.body.snippet
    }).then(blog => {
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    })
});


module.exports = router;