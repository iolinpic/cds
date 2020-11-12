const mongoose = require('mongoose');
// const validator = require('validator');

const dialogSchema = mongoose.Schema({
    Name: {
        type:String,
        default:"",
    },
    StartStageId: {
        type:String,
        required:true,
        default:"",
    },
    Stages: {
        type:[],
        default:[],
    },
}, {
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    },
});
/*actorSchema.virtual('DisplayName').get(function virtualName() {
    return `actor_name_${this.id}`;
});
actorSchema.virtual('Description').get(function virtualName() {
    return `actor_description_${this.id}`;
});*/
const Dialog = mongoose.model('Dialog', dialogSchema);
module.exports = Dialog;
