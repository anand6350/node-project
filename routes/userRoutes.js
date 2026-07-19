const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const validateUser = require('../middleware/validate');

router.post('/register', validateUser, userController.register);
router.post('/login', validateUser, userController.login);

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.render('./auth/login', {title: "Sing in", error: null});
    })
});

module.exports = router;