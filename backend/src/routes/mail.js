const router = require('express').Router();
const User = require('../models/User');
const { ensureAuthenticated } = require('../middlewares/athenticated');

router.get('/inbox', ensureAuthenticated, async (req, res)=>{

    const user = await User.findById(req.user.id);
    
    try{
        if(user){
            const {name, email, dateBirth, mails} = user;
            return res.send({name, email, dateBirth, mails});
        }
        
        else{
            return res.redirect('something didnt work');
        }
    }catch(error){
        console.log(error);
    }
});

router.get('/inbox/:id', ensureAuthenticated, async (req, res)=>{
    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).send('User not founded');
        }
        
        const mail = user.mails.id(req.params.id);
        if(!mail){
            return res.status(404).send('Mail not founded');
        }

        console.log(mail)
        res.status(200).send(mail);

    }catch(error){
        console.log(error);
    }
});

router.get('/write', ensureAuthenticated, (req, res)=>{
    res.send('write');
});

async function postMail(user, reciver, title, description){

    let address = reciver.email;
    let isSended = false;
    let read = false;
    let important = false;
    let recycle = false;
    const date = new Date();

    let newMailForReciver = {
        isSended,
        read,
        important,
        recycle,
        address,
        date,
        title,
        description
    }
    reciver.mails.push(newMailForReciver);

    address = user.email;
    isSended = true;
    let newMailForUser = {
        isSended,
        read,
        important,
        recycle,
        address,
        date,
        title,
        description
    }
    user.mails.push(newMailForUser);

    await reciver.save();
    await user.save();
}

router.post('/write', ensureAuthenticated, async (req, res) => {
    
    const {address, title, description} = req.body;
    const user = await User.findById(req.user.id);
    const reciver = await User.findOne({email: address}).catch();

    try{
        if(reciver){
            await postMail(user, reciver, title, description);
            res.send('Mail sended :D');
        }
        else{
            console.log('user not founded');
            res.send('user not founded');
        }
    }
    catch(error){
        console.error(error);
    }
});

module.exports = router;