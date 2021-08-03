const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Shopping = new Schema({
  id: String,
  name: String,
  items: Array,
  categories: Array,
});

module.exports = mongoose.model('Shopping', Shopping);
