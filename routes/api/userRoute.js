const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);
router.route('/:userId/friends/:friendId').delete(removeFriend).post(addFriend);

module.exports = router;