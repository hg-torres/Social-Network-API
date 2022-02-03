const router = require('express').Router()
const { User } = require('../models')

// Get all Users
router.get('/users', async function (req, res) {
  const users = await User.find({}).populate('thoughts')
  res.json(users)
})

// Get ONE User by id
router.get('/users/:id', async function (req, res) {
  const user = await User.findById(req.params.id).populate('thoughts')
  res.json(user)
})

// POST a User
router.post('/users', async function (req, res) {
  const user = await User.create(req.body)
  res.json(user)
})

// PUT one User by id

router.put('/users/:id', async function (req, res) {
  await User.findByIdAndUpdate(req.params.id, req.body)
  res.sendStatus(200)
})

// DELETE one User by id
router.delete('/users/:id', async function (req, res) {
  await User.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})

// Add a Friend
router.post('/user/:userId/friend/:friendId', async function (req, res) {
  const friend = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } })
  const friend2 = await User.findByIdAndUpdate(req.params.friendId, { $addToSet: { friends: req.params.userId } })
  res.sendStatus(200)
})

// Delete a Friend
router.delete('/user/:userId/friend/:friendId', async function (req, res) {
  const friend = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } })
  const friend2 = await User.findByIdAndUpdate(req.params.friendId, { $pull: { friends: req.params.userId } })
  res.sendStatus(200)
})

module.exports = router