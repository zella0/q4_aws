const jwt = require('jsonwebtoken');

const transactions_controller = require("../controllers/transactions_controller.js");
const users_controller = require("../controllers/users_controller.js");

module.exports = function(app){

  app.post('/users/login', users_controller.login);
  app.post('/users/signup', users_controller.signup);
  
  app.use(verifyToken);

  app.get('/transactions', transactions_controller.fetchTransactions_ByPage);
  app.post('/transactions/create', transactions_controller.addTransaction);
  app.delete('/transactions/remove/:id', transactions_controller.removeTransaction);
  app.patch('/transactions/update/:id', transactions_controller.updateTransaction);

}

function verifyToken(req, res, next) {
  let token = req.headers['token'];
  // if token exists
  if(token){
    // checks if it matches with our secret key
    jwt.verify(token, 'secretkey',  (err, decoded)=>{
      if(err){
        res.json({ message: 'Failed to authenticate' })
      }
      req.decoded = decoded;
      next();
    })
  }else{
    res.json({ message: 'Failed to authenticate' })
  }
}
