const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogControllers');

router.post('/', blogController.blogPost);
router.get('/:id', blogController.blogDetails);
router.delete('/:id', blogController.blogDelete);

module.exports = router;