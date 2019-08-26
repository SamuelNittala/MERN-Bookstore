const router = require('express').Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/user.model');

router.route('/register').post((req,res)=>{
    const username = req.body.username;
    const pword = req.body.password;
    
    var password = bcrypt.hashSync(pword,saltRounds);

    const newUser = new User({username,password});

    newUser.save()
        .then(()=>res.json("Registration Successful"))
        .catch(err => res.json(err));
});

router.route('/login').post((req,res)=>{
    const username = req.body.username;
    const pwd = req.body.password;
    
    User.findOne({username: username})
        .then(user => {
            if(bcrypt.compareSync(pwd,user.password)) res.json('Logged in Successfully');
            else res.json('Invalid Credentials');
        })
        .catch(err => res.json(err));
});

module.exports = router;