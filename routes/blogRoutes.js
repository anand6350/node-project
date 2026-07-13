const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogControllers');
const Blog = require('../models/blog');
const { requireAuth, requireOwner } = require('../middleware/authMiddleware');

router.get('/edit/:id', requireOwner, (req, res) => {
        res.render('./blogs/edit', {blog: req.blog, title: 'edit blog'})
})

router.post('/', blogController.blogPost);
router.get('/:id', blogController.blogDetails);
router.delete('/:id', requireOwner, blogController.blogDelete);

router.put('/:id', requireOwner, (req, res) => {
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