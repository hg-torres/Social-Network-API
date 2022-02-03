const router = require('express').Router()
const { Thought, User } = require('../models')


// GET all Thoughts
router.get('/thoughts', async function (req, res) {
  const thoughts = await Thought.find({}).populate(/* user */ 'reactions')
  res.json(thoughts)
})

// GET ONE Thought by id
router.get('/thoughts/:id', async function (req, res) {
  const thought = await Thought.findById(req.params.id).populate(/* user */'reactions')
  res.json(thought)
})

// POST ONE Thought
router.post('/thoughts', async function (req, res) {
  const thought = await Thought.create(req.body)
  await User.findByIdAndUpdate(req.body.user, {
    $push: { thoughts: thought._id }
  })
  res.json(thought)
})

// PUT one thought by id
router.put('/thoughts/:id', async function (req, res) {
  await Thought.findByIdAndUpdate(req.params.id, req.body)
  res.sendStatus(200)
})

// DELETE one thought by id
router.delete('/thoughts/:id', async function (req, res) {
  await Thought.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})

module.exports = router