const User = require('../models/user.model')


const getAlluser = async() =>{
    return await User.findAll();
};
const getUserById = async() =>{
    return await User.findByPk(id);
};
const updateUser = async (id, data) => {
    const [updated] = await User.update(data, {
        where: { id: id },  
        returning: true      
    });

    if (updated) {
        const updatedUser = await User.findByPk(id); 
        return updatedUser;
    }
    return null;  
};

const deleteUser = async(id) =>{
    const user = await User.findByPk(id);
    if(!user){
        return null;
    }
    await user.destroy();
    return user;
};

module.exports = {
    getAlluser,
    getUserById,
    updateUser,
    deleteUser
};
