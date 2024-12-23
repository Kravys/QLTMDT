
const { getUserById } = require('../services/user.service'); 

const authorize = (roles) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id; 
      const user = await getUserById(userId);

      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ message: 'No Permission' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};

module.exports = { authorize };
