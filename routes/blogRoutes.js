const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogControllers');
const Blog = require('../models/blog');
const { requireAuth, requireOwner } = require('../middleware/authMiddleware');
const asyncHandler = require('../middleware/asyncHandler');

router.get('/edit/:id', requireOwner, (req, res) => {
        res.render('./blogs/edit', {blog: req.blog, title: 'edit blog'})
});

router.post('/', blogController.blogPost);
router.get('/:id', blogController.blogDetails);
router.delete('/:id', requireOwner, blogController.blogDelete);

router.put('/:id', requireOwner, asyncHandler( async (req, res) => {
    const findBlog = await Blog.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        snippet: req.body.snippet
    });
    res.redirect('/');
}));

module.exports = router;