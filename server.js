const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

const mockCards = require('./mock');
let cards = [...mockCards];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/detail.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/detail.html'));
});


app.get('/api/cards', (req, res) => {
  const { search } = req.query;
  const filtered = search
    ? cards.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : cards;
  res.json(filtered);
});

app.get('/api/cards/:id', (req, res) => {
  const card = cards.find(c => c.id == req.params.id);
  if (card) res.json(card);
  else res.status(404).json({ error: "Not found" });
});

app.post('/add', (req, res) => {
  const newCard = { ...cards[0], id: Date.now() };
  cards.push(newCard);
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  cards = cards.filter(c => c.id != req.params.id);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
