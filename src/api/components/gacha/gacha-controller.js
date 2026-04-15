const service = require('./gacha-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function gacha(request, response, next) {
  try {
    const { userId } = request.body;

    if (!userId) {
      throw errorResponder(errorTypes.VALIDATION, 'userId required');
    }

    const result = await service.gacha(userId);

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getHistory(req, res, next) {
  try {
    const data = await service.getHistory(req.params.userId);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
}

async function getPrizes(req, res, next) {
  try {
    const data = await service.getPrizes();
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
}

async function getWinners(req, res, next) {
  try {
    const data = await service.getWinners();
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  gacha,
  getHistory,
  getPrizes,
  getWinners,
};