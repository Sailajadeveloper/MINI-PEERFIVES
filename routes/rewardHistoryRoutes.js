const rewardHistoryController = require('../controllers/rewardHistoryController');
// const validationController = require('../controllers/validationController')

module.exports = (app, router) => {
  router.post('/users/:id/p5', [rewardHistoryController.createP5Transaction]);
  router.delete('/users/p5/:transaction_id', [rewardHistoryController.deleteP5Transaction]);
  router.get('/users/:id/rewards', [rewardHistoryController.rewardsHistory]);
  router.get('/users/:id/points', [rewardHistoryController.pointsHistory]);
  
  app.use('/',router);
};