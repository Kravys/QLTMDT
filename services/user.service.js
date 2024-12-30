const User = require('../models/user.model')


const getAlluser = async (req, res) => {
    try {
        if (req.user.role !== 'admin' && req.user.role !== 'employee') {
            return res.status(403).json({ message: 'No permission.' });
        }
        const user = await userService.findAll();
        res.status(200).json(user);
    } catch (error) {
        console.error('Error:', error); 
        res.status(500).json({ message: 'Error', error });
    }
};

const getUserById = async (id) => {
    try {
        const user = await User.findByPk(id); 
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error('Error fetching user by ID: ' + error.message);
    }
};
const updateUser = async (id, data) => {
    try {
        const [updated] = await User.update(data, {
            where: { id },
        });
        if (!updated) {
            return null;
        }
        return await User.findByPk(id);
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

const deleteUser = async (id) => {
    try {
        const deleted = await User.destroy({
            where: { id },
        });
        if (!deleted) {
            return null;
        }
        return deleted;
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

module.exports = {
    getAlluser,
    getUserById,
    updateUser,
    deleteUser
};
