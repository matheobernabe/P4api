const {Router} = require('express');
const userController = require('../controllers/user_Controller');
const router = new Router();

router.post('/register', (req, res) =>{
    console.log(req.body);
    userController.post(req, res);
});
router.get('', (req, res) =>{
    userController.getall(req, res);
});
module.exports = router;
