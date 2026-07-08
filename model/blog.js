const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogSchema = new schema({
    title: String,
    snippet: String
}, {timestamps: true});

const blog = mongoose.model('blog', blogSchema);

module.exports = blog;