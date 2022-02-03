const router = require('express').Router()
const { Reaction, Thought } = require('../models')

// POST ONE Reaction
router.post('/reactions', async function (req, res) {
  const reaction = await Reaction.create(req.body)
  await Thought.findByIdAndUpdate(req.body.thought, {
    $push: { reactions: reaction._id }
  })
  res.json(reaction)
})

// DELETE one Reaction by id
router.delete('/reactions/:id', async function (req, res) {
  await Reaction.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})

module.exports = router