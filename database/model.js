const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Shopping = new Schema({
  code: String,
  name: String,
  items: Array,
  categories: Array,
  password: String,
  time: Number,
});

module.exports = mongoose.model('Shopping', Shopping);
