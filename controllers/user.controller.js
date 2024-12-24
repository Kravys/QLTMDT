const userService = require('../services/user.service');

const getAlluser = async (req, res) =>{
    try {
        const user = await userService.getAllUser();
        res.status(200).json(user);
        if (req.user.role !== 'admin' && req.user.role !== 'employee') {
            return res.status(403).json({ message: 'No permission.' });
        }
    } catch (error) {
        console.error('Error:', error); 
        res.status(500).json({message: 'Error', error});
    }
};
const getUserById = async (req, res) =>{
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(user);
        if (req.user.role !== 'admin' && req.user.role !== 'employee') {
            return res.status(403).json({ message: 'No permission.' });
        }
    } catch (error) {
        res.status(500).json({message: 'Not Found', error});
    }
};
const updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
        if (req.user.role !== 'admin' && req.user.role !== 'employee') {
            return res.status(403).json({ message: 'No permission.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};
const deleteUser = async (req, res) => {
    try {
        const deleteUser = await userService.deleteUser(req.params.id);
        if(!reuslut){
            return res.status(404).json({ message: 'User not found' });            
        }
        res.status(200).json({ message: 'User deleted successfully' });
        if (req.user.role !== 'admin' && req.user.role !== 'employee') {
            return res.status(403).json({ message: 'No permission.' });
        }
    } catch (error) {
        res.status(500).json({message: 'Not Found', error});
    }
};

module.exports = {
    getAlluser,
    getUserById,
    updateUser,
    deleteUser
}