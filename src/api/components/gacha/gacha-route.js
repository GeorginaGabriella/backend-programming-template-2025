const express = require('express');
const controller = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  route.post('/', controller.gacha);

  route.get('/history/:userId', controller.getHistory);
  route.get('/prizes', controller.getPrizes);
  route.get('/winners', controller.getWinners);
};