require('dotenv').config();

const express = require('express');
const app = express();

const userRoutes = require('./routes/user_Routes'); 
const gameRoutes = require('./routes/game_Routes'); 
const securityRoutes = require('./routes/security_Routes');
const authenticateJWT = require('./middleware/authMiddleware');
const versioning = require('./middleware/versioningMiddleware');
const validateMove = require('./middleware/gameValidationMiddleware');
const Hateoas = require('./middleware/hateoasMiddleware');
const i18n = require('./middleware/translation');

app.use(express.json());

app.use(i18n);
app.use(Hateoas);
app.use(versioning);

app.use('/api/security', securityRoutes);
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'Vous êtes authentifié', user: req.user });
});

app.use('/api/games', gameRoutes);

app.post('/api/move', validateMove, (req, res) => {
  res.json({ message: 'Coup valide dans Puissance 4' });
});


app.get('/', (req, res) => {
  res.json({ message: 'API Puissance 4 est opérationnelle !' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
