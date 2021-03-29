const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');
const { schema } = require('../models/user');
module.exports = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    if(!authHeader)
    return res.status(401).send({error: 'No token Provided'});

    const parts = authHeader.split(' ');
    if(!parts.length == 2)
    return res.status(401).send({error:'Token erros'});
    const [schema, token] =parts;
    if(!/^Bearer$/i.test(schema))
    return res.status(401).send({error: 'Token Malformated'});
    jwt.verify(token, authConfig.secret,(err,decoded)=>{
        if(err) return res.status(401).send({error:'Token Invalid'});

        req.userId = decoded.id;
        return next();
    })

}