const Blog = require('../models/blog');
const asyncHandler = require('../middleware/asyncHandler');

// blogPost, blogDetails, blogDelete

const blogPost = asyncHandler( async(req, res) => {
    await Blog.create({
        title : req.body.title,
        snippet: req.body.snippet,
        author: req.session.userId
        });
    res.redirect('/');
});

const blogDetails = asyncHandler( async (req, res) => {
    const id = req.params.id;
    const findBlog = await Blog.findById(id);
        if(!findBlog){
           return res.status(404).render('404', {title: 'blog not found'});
        }
        res.render('blogs/blogdetails', {title: findBlog.title, blog: findBlog});
});

const blogDelete = asyncHandler ( async (req, res) => {
    const id = req.params.id;
    const deleteBlog = await Blog.findByIdAndDelete(id)
    if(!deleteBlog){
        return res.status(404).render('404', { title: 'Blog not found' });
    }
    res.redirect('/');
});

module.exports = {
    blogPost,
    blogDetails,
    blogDelete
}

