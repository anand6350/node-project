const User = require('../models/user');

// register, login

const register = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(result => {
        console.log("user added in db");
        res.redirect('/');
    }).catch(err => console.log(err));
}

const login = (req, res) => {
    const {email, password} = req.body;
    User.findOne({email: email}).then(foundUser => {
        if(!foundUser){
            res.status(401).render('auth/login', {error: "invalid mail and password", title: "Sign in"});
            return;
        }

        return foundUser.comparePassword(password).then(passMatched => {
            if(passMatched){
                req.session.userId = foundUser._id;
                console.log("Login succesfull");
                res.redirect('/');
            }else{
                res.status(401).render('auth/login', {error: "invalid mail and password", title: "Sign in"});
            }
        }).catch(err => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        })
    })
}
module.exports = {
    register,
    login
}
