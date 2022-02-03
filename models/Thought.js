const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction')

const Thought = new Schema({
  thoughtText: {
    type: String,
    required: 'You need to leave a post!',
    minlength: 1,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  reactions: [Reaction]
}, { timestamps: true, toJSON: {getters: true}, id: false })

Thought.virtual('reactionCount').get(function () {
  return this.reactions.length
})

module.exports = model('thought', Thought)