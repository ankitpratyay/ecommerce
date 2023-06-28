const jwt = require("jsonwebtoken");
const config = require("../userController/config");

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, config.secret, (err, user) => {
      if (err) res.status(403).send("Invalid Token");
      console.log(user);
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated !!!");
  }
};
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.isAdmin)
    if (!req.user.isAdmin) {
      next();
    } else {
      res
        .status(401)
        .json("You are not allowed to performe this operation !!!");
    }
  });
};
const verifyTokenAndAuthorize = (req,res,next)=>{
  verifyToken(req,res,()=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
      next();
    }else{
      res.status(403).json("You are not allowed to do it !!")
    }
  })
}
module.exports = { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorize };
