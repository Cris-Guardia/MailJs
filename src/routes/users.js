const User = require('../models/User');
const passport = require('passport');
const router = require('express').Router();

//////////////////////////THIS IS SING IN

router.get('/users/singIn', (req, res)=>{
    res.render('users/singIn.ejs');
});

router.post('/users/singIn', passport.authenticate('local', {
    successRedirect: '/inbox',
    failureRedirect: '/users/singin',
    failureFlash: true
}));

//////////////////////////THIS IS SING UP

router.get('/users/singUp', (req, res)=>{
    res.render('users/singUp.ejs');
});

router.post('/users/singUp', async (req, res)=>{
    const {name, email, password, confirmPassword} = req.body;
    const errors = [];

    res.setHeader('Content-Type', 'text/html');

    if(name.length <= 0){
        errors.push({text: 'there are not a name'});
    }
    if(email.length <= 0){
        errors.push({text: 'there are not an email'});
    }
    if(password.length < 4){
        errors.push({text: 'there are not a password'});
    }
    if(password != confirmPassword){
        errors.push({text: 'Password and confrim password does not match'});
    }

    //////////////////////////CHECK EMAIL

    if(errors.length > 0){
        console.log('\n');
        console.log('there are errors');
        res.redirect('/users/singUp');
    }
    else{
        console.log('\n');
        console.log('The email will be finded');
        const emailUser = await User.findOne({ email }).catch();
        console.log('The find ends');
        if(emailUser){
            console.log('Email already exist\n');
            res.redirect('/users/singUp');
        }
        else{
            console.log('there are not any error\n');
            const newUser = new User({name, email, password});
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