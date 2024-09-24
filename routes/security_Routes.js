const {Router} = require('express');
const router = new Router();
const securityController = require('../controllers/security_Controller');

router.post('/login', (req, res) =>{
    securityController.login(req, res);
});
module.exports = router;