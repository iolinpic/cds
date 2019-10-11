const mongoose = require('mongoose');
const validator = require('validator');

const conditionSchema = mongoose.Schema({

});
const Condition = mongoose.model('Condition', conditionSchema);
module.exports = Condition;