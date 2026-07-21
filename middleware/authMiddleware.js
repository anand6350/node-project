const Blog = require('../models/blog');
const asyncHandler = require('../middleware/asyncHandler');

function requireAuth(req, res, next){
    if(req.session.userId){
        next();
    }else{
        res.redirect('/login');
    }
}

const requireOwner = asyncHandler(async function(req, res, next){
    const blog = await Blog.findById(req.params.id);
    if(!blog) return res.status(404).render('404', {title: "Blog not found"});
    if(blog.author.toString() !== req.session.userId){
        return res.status(403).render('404', {title: "Not authorized"}); // also fix .send below
    }
    req.blog = blog;
    next();
});

module.exports = {
    requireAuth,
    requireOwner
}