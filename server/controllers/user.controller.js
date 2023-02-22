const User = require('../models/user.model')

const getUser = async (req, res) =>{
    const userList = await User.find().select('name city country');

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);
}

const getUserById = async(req,res)=>{
    const user = await User.findById(req.params.id).select('name city country');

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    } 
    res.status(200).send(user);
}


module.exports = {
    getUser,
    getUserById,
}