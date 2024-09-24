const { Router } = require('express');
const gameController = require('../controllers/game_Controller');

const router = new Router();

// Route pour créer une nouvelle partie
router.post('/create', gameController.createGame);

// Route pour rejoindre une partie en tant que joueur 2
router.post('/join', gameController.joinGame);

// Route pour jouer un coup dans une partie
router.post('/play', gameController.playTurn);

// Route pour récupérer le statut d'une partie
router.get('/:gameId/status', gameController.getGameStatus);

// Route pour terminer la partie et désigner un gagnant
router.post('/end', gameController.endGame);

module.exports = router;
