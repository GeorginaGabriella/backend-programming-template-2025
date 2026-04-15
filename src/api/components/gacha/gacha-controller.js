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

module.exports = { gacha };