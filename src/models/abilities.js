const mongoose = require('mongoose');

const abilitiesSchema = mongoose.Schema({
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
  Icon: {
    type: String,
  },
  AnimationType: {
    type: String,
    required: true,
    trim: true,
  },
  AbilitType: {
    type: String,
    required: true,
    trim: true,
  },
  AbilityDirection: {
    type: String,
    required: true,
    trim: true,
  },
  AbilityValue: {
    type: Number,
    required: true,
  },
  HitChance: {
    type: Number,
    required: true,
  },
  CritChance: {
    type: Number,
    required: true,
  },
  AbilityDelay: {
    type: Number,
    required: true,
  },
  ActCount: {
    type: Number,
    required: true,
  },
  ActDelay: {
    type: Number,
    required: true,
  },
  RestTime: {
    type: Number,
    required: true,
  },
  DamageTypes: {
    type: [Number],
    required: true,
    default: [],
  },
  ConditionTarget: {
    type: [],
    required: true,
    default: [],
  },
  ConditionSelf: {
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
abilitiesSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.__v;
  delete obj._id;
  delete obj.DisplayName;
  delete obj.Description;
  return obj;
};
abilitiesSchema.virtual('DisplayName').get(function virtualName() {
  return `ability_name_${this.id}`;
});
abilitiesSchema.virtual('Description').get(function virtualName() {
  return `ability_description_${this.id}`;
});
const Ability = mongoose.model('Ability', abilitiesSchema);
module.exports = Ability;
