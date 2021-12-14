const jwt = require("jsonwebtoken");
const UserRepository = require("../routes/user/user.data.js");
const userRepository = new UserRepository();

const JWT_SECRETKEY = "key_instagram";

module.exports = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if(!(authHeader && authHeader.startsWith('Bearer'))){
      return res.sendStatus(401);
  }
  const token = authHeader.split(' ')[1];

  jwt.verify(token, JWT_SECRETKEY, async(error, decoded)=>{
      if(error){
          return res.sendStatus(401);
      }
      const user = await userRepository.findById(decoded.id);
      if(!user){
          return res.status(401);
      }

      req.user = user;
      next();
  })
};
