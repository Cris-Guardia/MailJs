const router = require('express').Router();

router.get('/', (req, res)=>{
    res.render('main.ejs');
});

module.exports = router;