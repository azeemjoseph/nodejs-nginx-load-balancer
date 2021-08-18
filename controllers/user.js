const models = require("../models/index");

// https://sequelize.org/v5/manual/models-usage.html                    // for more functions
exports.getAllUsers = (req, res, next) => {
  //req = for request object res = for response object next is used to call next middeleware
  // console.log('getAllUsers called :');
  models.User.findAll()
    .then((user) => {
      console.log("user : ", user);
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

//POSTMAN is used to test the End Points localhost:3001/GetuserByName (set raw then select datatype JSON)
exports.getSpecificUserByEmail = (req, res, next) => {
  console.log("User email password in req body : ", req.body);
  const email = req.body.email;
  const password = req.body.password;
  models.User.findOne({
    where: { email: email, password: password },
    attributes: ["id", ["email", "emailAlias"],"password"], // This attribute is used to set Alias like :column as column1
  }).then((user) => {
    // user.get('userName') will contain the name of the user as column name of table
    if(user) {
    console.log("user.get(id) :", user.get("emailAlias"));    
    }        
    return user;
  }).then( result => {
    if(result) {
     let token = "acd123";
     res.status(200).json(token);
    } else {
      res.status(404).json({message: "Invalid user Name Password"});
      return;
    }
  }).catch(err => {
    console.log(err);
  });
};

exports.createUserInDB = (req, res, next) => {
  //req = for request object res = for response object next is used to call next middeleware
  models.User.create({
    email: req.body.email,
    password: req.body.password,
  })
    .then((result) => {
      res.status(201).json({
        message: "User account Created Successfuly",
        email: req.body.email,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(406).json({ message: "Email or password must be valid" });
    });
};
