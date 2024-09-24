const {Router} = require('express');
const router = new Router();
const securityController = require('../controllers/securityController');

router.post('/login', securityController.login);
module.exports = router;