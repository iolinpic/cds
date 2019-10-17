const mongoose = require('mongoose');
// const validator = require('validator');

const conditionSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Abilities: {
    type: [],
    required: true,
    default: [],
  },
  Bonuses: {
    type: [],
    required: true,
    default: [],
  },
}, {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});
// conditionSchema.virtual('DisplayName').get(function virtualName() {
//   return `condition_name_${this.id}`;
// });
// conditionSchema.virtual('Description').get(function virtualName() {
//   return `condition_description_${this.id}`;
// });
const Condition = mongoose.model('Condition', conditionSchema);
module.exports = Condition;
