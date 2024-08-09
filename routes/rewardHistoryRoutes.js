const rewardHistoryController = require('../controllers/rewardHistoryController');
// const validationController = require('../controllers/validationController')

module.exports = (app, router) => {
//   app.get('/', rewardHistoryController.getUsers);
//   app.post('/new', rewardHistoryController.createUser);
  app.use('/',router);
};