var express = require('express');
var router = express.Router();
var Users = require('../model/user');
var userController = require('../controller/userController')

var data = {
  'message' : "Ok",
  'status':200,
  'data':[]
};

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const dataUsers = await Users.find({});
  try {
    data.message="Ok";
    data.status=200;
    data.data=dataUsers;
  } catch (error) {
    data.message="error";
    data.status=500;
    data.data=error;
  }
  res.send(data);
});

/* Create a new user */
router.post("/register", async function(req, res, next){
  userController.addNewUser(req.body, (error, user) => {
    if(error) return next(error);
      res.json(user);
  })

})

router.post("/login", async function(req, res, next){
  userController.logUser(req.body, (error, user) => {
    if(error) return next(error);
      res.json(user);
  })

})

module.exports = router;
