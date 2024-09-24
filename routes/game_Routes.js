const { Router } = require('express');
const gameController = require('../controllers/game_Controller');

const router = new Router();


router.post('/create', gameController.createGame);

router.post('/join', gameController.joinGame);

router.post('/play', gameController.playTurn);

router.get('/:gameId/status', gameController.getGameStatus);

router.post('/end', gameController.endGame);

router.get('', gameController.getGamesList);

module.exports = router;
