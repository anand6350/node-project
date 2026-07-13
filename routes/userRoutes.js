const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.render('./auth/login', {title: "Sing in", error: null});
    });
})

module.exports = router;