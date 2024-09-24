const { Router } = require('express');
const gameController = require('../controllers/game_Controller');
const checkAuth = require('../middleware/checkAuth');

const router = new Router();


router.post('/create', checkAuth, gameController.createGame);

router.post('/join', checkAuth, gameController.joinGame);

router.post('/play', checkAuth, gameController.playTurn);

router.get('/:gameId/status', checkAuth, gameController.getGameStatus);

router.post('/end', checkAuth, gameController.endGame);

router.get('', checkAuth, gameController.getGamesList);

module.exports = router;
