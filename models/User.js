const { Schema, model } = require('mongoose')

const User = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please provide a valid email'],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought',
      }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
      }]
}, { timestamps: true, toJSON: { virtuals: true }, id: false })

User.virtual('friendCount').get(function () {
  return this.friends.length
})

module.exports = model('user', User)