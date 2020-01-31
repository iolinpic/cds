const mongoose = require('mongoose');

const questsSchema = mongoose.Schema({
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
    trim: true,
  },
  FirstStageId: {
    type: String,
    required: true,
  },
  Stage: {
    type: [
      {
        StageId: {
          type: String,
          required: true,
        },
        NextStageId: {
          type: String,
          default: '',
        },
        StageDescription: {
          type: String,
          default: '',
        },
        Goals: {
          type: [{
            GoalId: {
              type: String,
              required: true,
            },
            GoalType: {
              type: String,
              required: true,
            },
            GoalOptions: {
              type: [],
              default: [],
            },
          }],
          default: [],
        },
      },
    ],
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
questsSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.__v;
  delete obj._id;
  delete obj.DisplayName;
  delete obj.Description;
  return obj;
};
questsSchema.virtual('DisplayName').get(function virtualName() {
  return `quest_name_${this.id}`;
});
questsSchema.virtual('Description').get(function virtualName() {
  return `quest_description_${this.id}`;
});
const Quest = mongoose.model('Quest', questsSchema);
module.exports = Quest;
