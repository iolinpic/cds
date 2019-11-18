const mongoose = require('mongoose');
// const validator = require('validator');

const itemSchema = mongoose.Schema({
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
    type: String,
    required: true,
    min: 0,
  },
  Subtype: {
    type: String,
    required: true,
    min: 0,
  },
  ItemOption: {
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
itemSchema.virtual('DisplayName').get(function virtualName() {
  return `item_name_${this.id}`;
});
itemSchema.virtual('Description').get(function virtualName() {
  return `item_description_${this.id}`;
});
const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
