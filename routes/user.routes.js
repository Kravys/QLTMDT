const express = require('express');
const userController = require('../controllers/user.controller');
const { authorize } = require('../middlewares/role.middleware');
const { authenticate } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/aUser', authenticate ,authorize(['admin', 'employee']),userController.getAlluser);
router.get('/:id', authenticate,authorize(['admin', 'employee']),userController.getUserById);
router.put('/:id', authenticate,authorize(['admin', 'employee']),userController.updateUser);
router.delete('/:id', authenticate,authorize(['admin', 'employee']),userController.deleteUser);

module.exports = router;
