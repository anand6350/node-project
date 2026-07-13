const Blog = require('../models/blog');

function requireAuth(req, res, next){
    if(req.session.userId){
        next();
    }else{
        res.redirect('/login');
    }
}

async function requireOwner(req, res, next){
    const blog = await Blog.findById(req.params.id);
    if(!blog) return res.status(404).render('404', {title: "Blog not found"});
    if(blog.author.toString() !== req.session.userId){
        return res.status(403).send("You are not Authorized to edit this blog");
    }
    req.blog = blog;
    next();
}

module.exports = {
    requireAuth,
    requireOwner
}