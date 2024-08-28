const User = require('../models/User');
const passport = require('passport');
const router = require('express').Router();

//////////////////////////THIS IS SING IN

router.get('/users/singIn', (req, res)=>{
    res.send('sing in');
});

router.post('/users/singIn', (req, res, next)=>{
    passport.authenticate('local', (err, user, info) => {
        if(err){
            return next(err);
        }
        else if(!user){
            return res.send(`${info.message}`);
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            else{
                return res.redirect('/inbox');
            }
        });
    })(req, res, next);
});

//////////////////////////THIS IS SING UP

router.get('/users/singUp', (req, res)=>{
    res.send('sing Up');
});

function isValidEmail(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

router.post('/users/singUp', async (req, res)=>{
    const {name, email, dateBirth, password, confirmPassword} = req.body;
    const errors = [];

    if(name.length <= 0){
        errors.push({text: 'there are not a name'});
    }
    if(!email || !isValidEmail(email)){
        console.log(!isValidEmail(email));
        errors.push({text: 'there are not a valid email'});
    }
    if(dateBirth == null){
        errors.push({text: 'there are not a date of birth'});
    }
    if(password.length < 4){
        errors.push({text: 'there are not a password'});
    }
    if(password != confirmPassword){
        errors.push({text: 'Password and confrim password does not match'});
    }

    //////////////////////////CHECK EMAIL

    if(errors.length > 0){
        console.log('there are errors');
        res.send('ta mal');
    }
    else{
        console.log('\n');
        console.log('The email will be finded');
        
        const emailUser = await User.findOne({ email }).catch();
        console.log('The find ends');

        if(emailUser){
            console.log('Email already exist\n');
            res.send('ta mal, el mail existe');
        }
        else{
            console.log('there are not any error\n');
            
            const newUser = new User({name, email, dateBirth, password});
            newUser.password = await newUser.encryptPassword(password).catch();
            await newUser.save().catch();

            console.log('registered\n');
            res.redirect('/users/singIn');
        }
    }
});

////////////////////////////////// THIS IS LOG OUT //////////

router.get('/users/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;