require('dotenv').config();

const express = require('express');
const app = express();

const userRoutes = require('./routes/user_Routes'); 
const gameRoutes = require('./routes/game_Routes'); 
const authenticateJWT = require('./middleware/authMiddleware');
const versioning = require('./middleware/versioningMiddleware');
const validateMove = require('./middleware/gameValidationMiddleware');
const addHateoasLinks = require('./middleware/hateoasMiddleware');

app.use(express.json());

app.use(versioning);

app.use('/api/users', userRoutes);

app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'Vous êtes authentifié', user: req.user });
});

app.use('/api/games', gameRoutes);

app.post('/api/move', validateMove, (req, res) => {
  res.json({ message: 'Coup valide dans Puissance 4' });
});

app.get('/api/games/:gameId', addHateoasLinks, (req, res) => {
  const game = { id: req.params.gameId, name: 'Puissance 4' };
  res.json({ game, links: res.locals.links });
});

app.get('/', (req, res) => {
  res.json({ message: 'API Puissance 4 est opérationnelle !' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
