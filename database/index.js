require('dotenv').config();
const express = require('express');
const { nanoid } = require('nanoid');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const Shopping = require('./model');

//app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());

app.post('/api/code', async (req, res) => {
  const categories = JSON.parse(req.body.categories);
  const items = JSON.parse(req.body.items);
  const name = req.body.name;
  const id = nanoid(10);
  const data = { id, categories, items, name };
  const db = new Shopping(data);
  await db.save();
  res.json({ success: true, id });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
