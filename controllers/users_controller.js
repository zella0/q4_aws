const knex = require("../db/knex.js");
const hasher = require('../config/hasher');
const jwt = require('jsonwebtoken');

module.exports = {

  login: (req, res) => {
    knex('users')
    .where('email', req.body.email)
    .then((user)=>{
      if(user[0]){
        hasher.check(user[0], req.body)
        .then((isMatch)=>{
          // if user is valid
          if(isMatch){
            let token = jwt.sign({ user: user[0] }, 'secretkey', { expiresIn: 3000 });
            res.json({ token });
          }else{
            res.json({ message: 'Invalid Email/Password' });
          }
        })
      }else{
        res.json({ message: 'Invalid Email/Password' });
      }
    })
  },
  signup: (req, res) => {
    hasher.hash(req.body)
    .then((user)=>{
      knex('users')
      .where('email', req.body.email)
      .count('email', req.body.email)
      .then((response)=>{
        if (Number(response[0].count) >= 1) {
          res.json({ message: 'Email address already exists' })
        }else{
          knex('users')
          .insert(user)
          .then(()=>{
            res.json({ message: 'User has been created' })
          })
        }
      })
    
    })
  }
}