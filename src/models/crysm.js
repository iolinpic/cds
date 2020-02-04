const mongoose = require('mongoose');
// const validator = require('validator');

const crysmSchema = mongoose.Schema({
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
  Blueprint: {
    type: String,
    required: true,
  },
  PreviousConfig: {
    type: String,
    default: '',
  },
  DefaultHitPoints: {
    type: Number,
    required: true,
    min: 0,
  },
  DefaultAttack: {
    type: Number,
    required: true,
    min: 0,
  },
  DefaultDefence: {
    type: Number,
    required: true,
    min: 0,
  },
  DefaultEvasion: {
    type: Number,
    required: true,
    min: 0,
  },
  DefaultReflection: {
    type: Number,
    required: true,
    min: 0,
  },
  LevelUpExpMultipliter: {
    type: Number,
    required: true,
    min: 0,
  },
  CrysmTypes: {
    type: [Number],
    required: true,
    default: [],
  },
  EvolutionLevel: {
    type: Number,
    required: true,
    default: -1,
  },
  EvolutionConditions: {
    type: [],
    required: true,
    default: [],
  },
  MilestonePacks: {
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
crysmSchema.virtual('DisplayName').get(function virtualName() {
  return `crysm_name_${this.id}`;
});
crysmSchema.virtual('Description').get(function virtualName() {
  return `crysm_description_${this.id}`;
});
const Crysm = mongoose.model('Crysm', crysmSchema);
module.exports = Crysm;
