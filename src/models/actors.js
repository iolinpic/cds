const mongoose = require('mongoose');
// const validator = require('validator');

const actorSchema = mongoose.Schema({
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
  EquipArtifacts: {
    type: [],
    required: true,
    default: [],
  },
  Consumables: {
    type: [],
    required: true,
    default: [],
  },
  DialogGreetings:{
    type:[],
    default:[],
  }

}, {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});
actorSchema.virtual('DisplayName').get(function virtualName() {
  return `actor_name_${this.id}`;
});
actorSchema.virtual('Description').get(function virtualName() {
  return `actor_description_${this.id}`;
});
const Actor = mongoose.model('Actor', actorSchema);
module.exports = Actor;
