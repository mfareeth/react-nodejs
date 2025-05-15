const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let users = [];
let idCounter = 1;

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Add user
app.post('/users', (req, res) => {
  const user = { id: idCounter++, ...req.body };
  users.push(user);
  res.status(201).json(user);
});

// Edit user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(user => user.id == id);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).send('User not found');
  }
});

// Delete user
app.delete('/users/:id', (req, res) => {
  users = users.filter(user => user.id != req.params.id);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));