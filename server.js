require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/games');
const userRoutes = require('./routes/user');

app.use('/api/games', gameRoutes);
app.use('/api/users', userRoutes);
app.use(express.json()); 

app.get('/', (req, res) => {
  res.json({ message: 'API Puissance 4 est opérationnelle !' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

