var User = require('../model/user')

const addNewUser = (user, next) => {
    User.startSession().then(async (session) => {
  
      const newUser = new User(user);
  
      await session.withTransaction(async () =>{
  
        await newUser.save((error, newUser) => {
  
          if (error) return next(error);
  
         // const token = generateToken(newUser);
  
         // newUser.token = token;
  
          next(null, newUser);
  
        });
  
      })
  
      session.endSession();
  
    })/*.then(() => {
  
      User.findOne({_id:user._id}).populate("profile_id").exec((err, usr) => {
  
        if(err) return next(err);
  
        next(null, usr);
  
      })
  
    })*/;
  
  };

  module.exports = {addNewUser};