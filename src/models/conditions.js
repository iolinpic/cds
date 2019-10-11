const mongoose = require('mongoose');
// const validator = require('validator');

const conditionSchema = mongoose.Schema({
  DisplayNameText: {
    type: String,
    required: true,
    trim: true,
  },
  DescriptionText: {
    type: String,
    required: true,
    trim: true,
  },
  Type: {
    type: Number,
    required: true,
    min: 0,
  },
  SubType: {
    type: Number,
    required: true,
    min: 0,
  },
  Immunity: {
    type: [Number],
    required: true,
    default: [],
  },
  ConditionOptions: {
    type: {},
    required: true,
  },
}, {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});
conditionSchema.virtual('DisplayName').get(function virtualName() {
  return `condition_name_${this.id}`;
});
conditionSchema.virtual('Description').get(function virtualName() {
  return `condition_description_${this.id}`;
});
const Condition = mongoose.model('Condition', conditionSchema);
module.exports = Condition;
