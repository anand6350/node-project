const {body, validationResult} = require('express-validator'); 

const validateUser = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render('auth/login', { title: "Sign in", error: errors.array()[0].msg });
        }
        next();
    }
]

module.exports = validateUser;