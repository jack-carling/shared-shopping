require('dotenv').config();
const express = require('express');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const app = express();

async function connect() {
  mongoose.connect(process.env.MONGO_DB);
}

connect().catch((error) => console.log(error));

const Shopping = require('./model');

app.use(express.json());

app.post('/api/code', async (req, res) => {
  const categories = JSON.parse(req.body.categories);
  const items = JSON.parse(req.body.items);
  const name = req.body.name;
  const code = nanoid(10);
  const password = '';
  const time = Date.now();
  const data = { code, categories, items, name, password, time };
  const db = new Shopping(data);
  await db.save();
  res.json({ success: true, code, time });
});

app.post('/api/password', async (req, res) => {
  const response = { success: true };
  const code = req.body.code;
  const password = req.body.password;
  let hashedPassword = '';
  if (password) hashedPassword = await bcrypt.hash(password, 10);
  const db = await Shopping.findOneAndUpdate({ code }, { password: hashedPassword });
  if (!db) response.success = false;
  res.json(response);
});

app.post('/api/join', async (req, res) => {
  const response = { success: true };
  const code = req.body.code;
  const result = await Shopping.find({ code });
  if (!result.length) {
    response.success = false;
    response.message = 'Cannot find a list with this code.';
  }
  response.password = result[0]?.password.length ? true : false;
  if (!response.password) {
    response.data = result;
  }
  res.json(response);
});

app.post('/api/compare', async (req, res) => {
  const response = { success: true };
  const code = req.body.code;
  const password = req.body.password;
  const result = await Shopping.find({ code });
  let match;
  if (password) match = await bcrypt.compare(password, result[0].password);
  if (match) {
    response.data = result;
  } else {
    response.success = false;
  }
  res.json(response);
});

app.post('/api/save', async (req, res) => {
  const categories = JSON.parse(req.body.categories);
  const items = JSON.parse(req.body.items);
  const name = req.body.name;
  const code = req.body.code;
  const time = Date.now();
  const data = { code, categories, items, name, time };
  const db = await Shopping.findOneAndUpdate({ code }, data);
  res.json({ success: true, time });
});

app.get('/api/list', async (req, res) => {
  const code = req.query.code;
  const db = await Shopping.find({ code });
  res.json({ success: true, data: db[0] });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
