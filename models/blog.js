const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogSchema = new schema({
    title: String,
    snippet: String,
    author: { type: schema.Types.ObjectId, ref: 'user', required: true }
}, {timestamps: true});

const blog = mongoose.model('blog', blogSchema);

module.exports = blog;