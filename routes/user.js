const {Router} = require('express');
const userController = require('../controllers/user_Controller');
const router = new Router();

router.post('/register', userController.post);

module.exports = router;
