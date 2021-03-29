const express = require('express');
const User = require('../models/user');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');
const router = express.Router();
const crypto = require('crypto');
const mailer = require('../../modules/mailer');
const { send } = require('process');
const sendmail = require('sendmail')();


function generateToken(params={}){
   return jwt.sign(params, authConfig.secret,{
        expiresIn:86400,
    });
}

router.post('/register', async (req,res)=>{
    const {email} =req.body;
    try{
        if(await User.findOne({email}))
        return res.status(400).send({error: 'user already exists'})
        const user = await User.create(req.body);
        user.password = undefined;

      return res.send({
          user,
          token: generateToken({id: user.id}),
        });
    }catch(err){
        return res.status(400).send({error: 'Registration Failed'})
    }
});
// autenticação
router.post('/authenticate', async (req,res)=>{
    const {email, password} =req.body;
    const user = await User.findOne({email}).select('+password');
    if(!user)
    return res.status(400).send({error: 'User Not Found'});
    if(!await bcrypt.compare(password,user.password))
    return res.status(400).send({error: 'Invalid Password'});
    
    user.password = undefined;


    res.send({
        user,
        token: generateToken({id:user.id}),
    });

});
router.post('/lista', async(req,res)=>{
   // const user =await User.getUsers();
    res.json(await User.find({}));
    
});

router.post('/forget_password',async(req,res)=>{
    const {email} =req.body;

    try{
        const user = await User.findOne({email});
        if(!user)
        return res.status(400).send({error: 'User Not Found'});

        const token = crypto.randomBytes(20).toString('hex');

        // tempo de espiração do Token
        const now = new Date();
        now.setHours(now.getHours()+1);
            /*
        await User.updateOne(user.id,{
            '$set':{
                passwordReserToken: token,
                passwordResetExpires:now,
            }

        }
        );

        */
       await User.findByIdAndUpdate(user.id, {
        '$set': {
        passwordReserToken: token,
        passwordResetExpires: now,
        }
        }, { new: true, useFindAndModify: false }
        );
        
        sendmail({
            to: email,
            from:'adilson.manuel1@hotmail.com',
            template:'auth/forgot_password',
            context: {token},
        },
        
            (err) =>{
               if(err)
                console.log(err);
                   return res.status(400).send({error: 'Connot send forgot password email'});
                   return res.send();
               
            }
        )
        
    }catch (err){
        console.log(err);
        res.status(400).send({error:'Error on forgot password, try again'});
    }
});


module.exports = app => app.use('/auth',router);