const User = require('../models/user.model')


const getAlluser = async() =>{
    return await User.find();
};
const getUserById = async() =>{
    return await User.findById(id);
};
const updateUser = async(id, data) =>{
    return await User.findByIdAndUpdate(id, data, {new: true});
};
const deleteUser = async(id) =>{
    const user = await User.findById(id);
    if(!user){
        return null;
    }
    await user.remove();
    return user;
};

module.exports = {
    getAlluser,
    getUserById,
    updateUser,
    deleteUser
};
