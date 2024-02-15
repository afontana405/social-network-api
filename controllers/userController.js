const { user, thought } = require('../models');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await user.find().populate('thoughts');
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const userById = await user.findOne({ _id: req.params.userId })
            .populate('thoughts').populate('friends').
            select("-__v");
            if (!userById) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json(userById);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createUser: async (req, res) => {
        try {
            const newUser = await user.create(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error: 'Bad Request' });
        }
    },

    updateUser: async (req, res) => {
        try {
            const updateUser = await user.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true });
            if (!updateUser) {
                return res.status(404).json({
                message: "No user found",});
            }
            res.json("User updated!");
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const delUserById = await user.findOneAndDelete({ _id: req.params.userId });
            if (!delUserById) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json(delUserById);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    addFriend: async (req, res) => {
        try {
            const newFriend = await user.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true });
            if (!newFriend) {
                return res.status(404).json({ message: "No User found" });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    removeFriend: async (req, res) => {
        try {
            const noFriend = await user.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true });
            if (!noFriend) {
                return res.status(404).json({ message: "No User found" });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = userController;