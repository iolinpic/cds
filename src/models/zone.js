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
  TitleText: {
    type: String,
    trim: true,
    default:'',
  },
  AutoText: {
    type: String,
    trim: true,
    default:'',
  },


}, {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});
zoneSchema.virtual('Title').get(function virtualName() {
   return `zone_title_${this.DisplayNameText}`;
 });
zoneSchema.virtual('Auto').get(function virtualName() {
   return `zone_auto_${this.DisplayNameText}`;
});
const Zone = mongoose.model('Zone', zoneSchema);
module.exports = Zone;
