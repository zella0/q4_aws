const knex = require("../db/knex.js");

module.exports = {
  fetchTransactions_ByPage: (req, res) => {
    knex('transactions')
      .limit(10)
      .offset(req.query.page * 10)
      .then((response) => {
        res.json(response);
      })
  },
  addTransaction: (req, res) => {
    knex('transactions')
    .insert({
      user_id: req.body.user_id,
      type: req.body.type,
      amount: req.body.amount,
      business_name: req.body.business_name
    }, '*')
    .then((response)=>{
      res.json(response)
    })
  },
  removeTransaction: (req, res) => {
    knex('transactions')
    .where('id', req.params.id)
    .del()
    .then(() => {
      res.sendStatus(200)
    })
  },
  updateTransaction: (req, res) => {
    knex('transactions')
    .where('id', req.params.id)
    .update({
      user_id: req.body.user_id,
      type: req.body.type,
      amount: req.body.amount,
      business_name: req.body.business_name
    })
    .then(() => {
      res.sendStatus(200)
    })
  },

}
