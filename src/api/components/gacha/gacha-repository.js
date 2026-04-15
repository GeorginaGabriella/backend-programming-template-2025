const { Gacha } = require('../../../models');

async function create(data) {
  return Gacha.create(data);
}

async function countUserToday(userId) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Gacha.countDocuments({
    userId,
    createdAt: { $gte: today },
  });
}

async function countHadiah(hadiah) {
  return Gacha.countDocuments({
    hadiah,
    isWin: true,
  });
}

async function getHistory(userId) {
  return Gacha.find({ userId });
}

async function getAllWinners() {
  return Gacha.find({ isWin: true });
}

module.exports = {
  create,
  countUserToday,
  countHadiah,
  getHistory,
  getAllWinners,
};