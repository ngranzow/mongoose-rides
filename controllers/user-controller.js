const { User, Thought } = require('../models');

// Set up User Controller
const userController = {
    // Create a new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    // Get all users
    getAllUsers(req, res) {
        User.find({})
            // populate users thoughts
            .populate({ path: 'thoughts', select: '-__v' })
            // populate user friends
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            // .sort({_id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Get single user by ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            // return if no user is found 
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this ID!' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    // Update a current user by ID
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    },
    // Delete a current user by ID
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this ID!' });
                    return;
                }
                // remove the user from friends
                User.updateMany({ _id: { $in: dbUserData.friends } }, { $pull: { friends: params.id } })
                .then(() => {
                    // remove any thoughts from this user
                    Thought.deleteMany({ username: dbUserData.username })
                    .then(() => { res.json({ message: 'User has been successfully deleted!' }) })
                    .catch(err => res.status(400).json(err));
                })
                .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
    },
    // Add a friend
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $push: { friends: params.friendId } }, { new: true })
            .populate({ path: 'friends', select: ('-__v') })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // Delete a current friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { new: true })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }

};

module.exports = userController; 