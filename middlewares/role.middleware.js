
const { getUserById } = require('../services/user.service'); 

const authorize = (role) => {
  return async (req, res, next) => {
      try {
          console.log('User from token:', req.user);
          const user = await getUserById(req.user.id); 
          console.log('Fetched User:', user);

          if (!user || !role.includes(user.role)) {
              return res.status(403).json({ message: 'No Permission' });
          }
          next();
      } catch (error) {
          console.error('Authorization Error:', error.message);
          res.status(500).json({ message: 'Internal Server Error' });
      }
  };
};


module.exports = { authorize };
