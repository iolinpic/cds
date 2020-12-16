const mongoose = require('mongoose');
// const validator = require('validator');

const storagePackSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Packs: {
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
storagePackSchema.methods.toJSON = function toJSON() {
    const obj = this.toObject();
    delete obj._id;
    delete obj.__v;
    return obj;
};
storagePackSchema.virtual('DisplayName').get(function virtualName() {
   return `storagePack_${this.id}`;
});
// conditionSchema.virtual('Description').get(function virtualName() {
//   return `condition_description_${this.id}`;
// });
const SPack = mongoose.model('SPack', storagePackSchema);
module.exports = SPack;
