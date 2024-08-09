const userController = require('../controllers/userController');
const validationController = require('../controllers/validationController')

module.exports = (app, router) => {
  router.get('/userList', userController.getUsers);
  router.post('/createUser', [validationController.checkUser,userController.createUser]);
  router.put('/editUser/:id', [validationController.checkUser,userController.editUser]);
  app.use('/',router);
};