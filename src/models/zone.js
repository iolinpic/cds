const mongoose = require('mongoose');
// const validator = require('validator');

const zoneSchema = mongoose.Schema({
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

}, {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});
// zoneSchema.virtual('DisplayName').get(function virtualName() {
//   return `zone_name_${this.id}`;
// });
// zoneSchema.virtual('Description').get(function virtualName() {
//   return `zone_description_${this.id}`;
// });
const Zone = mongoose.model('Zone', zoneSchema);
module.exports = Zone;
