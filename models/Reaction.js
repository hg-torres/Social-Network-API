const { Schema, model } = require('mongoose')


const Reaction = new Schema({
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    }
  }, { timestamps: true, toJSON:{getter: true}, id: false })

module.exports = Reaction