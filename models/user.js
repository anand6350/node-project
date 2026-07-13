const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new schema({
    username: String,
    email: String,
    password: String
}, {timestamps: true});

userSchema.pre('save', async function(){
    if(!this.isModified('password')) return;

    try{
        const saltrounds = 10;
        this.password = await bcrypt.hash(this.password, saltrounds);
    }catch(err){
        throw err;
    }
});

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}
const user = mongoose.model('User', userSchema);

module.exports = user;