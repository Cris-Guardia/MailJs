const router = require('express').Router();
const Mail = require('../models/Mail');
//const { isAuthenticated } = require('../helpers/auth');

router.get('/inbox', /*isAuthenticated,*/ async (req, res)=>{
    const mails = await Mail.find();
    res.render('inbox.ejs', {mails});
});

router.get('/write', /*isAuthenticated,*/ (req, res)=>{
    res.render('write.ejs');
});

router.post('/write', (req, res) => {
    const {mailFor, title, description} = req.body;
    console.log(req.body.mailFor);
    console.log(mailFor);
    const errors = [];
    if(!mailFor){
        errors.push({text: 'Please Write who will recieve the mail'});
    }
    if(!title){
        errors.push({text: 'Please Write a Title'});
    }
    if(!description){
        errors.push({text: 'Please Write a Description'});
    }
    console.log(errors);
});

module.exports = router;