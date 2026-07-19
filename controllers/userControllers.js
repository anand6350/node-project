const User = require('../models/user');
const asyncHandler = require('../middleware/asyncHandler');

// register, login

const register = asyncHandler( async (req, res) => {
   const {username, email, password} = req.body;
   const existingUser = await User.findOne({email});

   if(existingUser){
    return res.status(400).render('auth/register', {title: "Sign in", error: "This email is already registered."})
   }

   const createUser = await User.create({
      username,
      email,
      password
   });
   res.redirect('/');
});

const login = asyncHandler( async (req, res) => {
    const {email, password} = req.body;
    const foundUser = await User.findOne({email: email});
        if(!foundUser){
            res.status(401).render('auth/login', {error: "invalid mail and password", title: "Sign in"});
            return;
        }

        const passMatched = await foundUser.comparePassword(password);
            if(!passMatched){
                return res.status(401).render('auth/login', {error: "invalid mail and password", title: "Sign in"});
            }
            req.session.userId = foundUser._id;
            res.redirect('/');
});

module.exports = {
    register,
    login
}
