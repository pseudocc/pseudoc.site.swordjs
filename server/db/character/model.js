const mongoose = require('mongoose');
const genders = require('./gender');

function init_model() {
  const stats_type = {
    type: Number,
    required: true,
    min: 0,
    max: 100
  };
  const schema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20
    },
    gender: {
      type: Number,
      required: true,
      min: genders.NONE,
      max: genders.BOTH
    }
  });
}