const express = require('express');
const Game = require('../models/Game');
const router = express.Router();

// Nouvelle Partie
router.post('/create', async (req, res) => {
  try {
    const game = await Game.create({ player1: req.body.player1 });
    res.json({ message: 'Game created successfully', game });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/:gameId/play', async (req, res) => {
  // le jeu tout ça tout ça
});

module.exports = router;
