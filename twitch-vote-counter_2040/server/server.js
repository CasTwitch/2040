const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const dbPath = path.join(__dirname, 'db.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/votes', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  res.json(data);
});

app.post('/api/vote/:key', (req, res) => {
  const key = req.params.key;
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  if (data[key] !== undefined) {
    data[key]++;
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    res.json({ success: true, votes: data });
  } else {
    res.status(400).json({ error: 'Invalid vote key' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
