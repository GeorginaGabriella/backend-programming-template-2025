const repo = require('./gacha-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

const HADIAH = [
  { name: 'Emas 10 gram', kuota: 1 },
  { name: 'Smartphone X', kuota: 5 },
  { name: 'Smartwatch Y', kuota: 10 },
  { name: 'Voucher Rp100.000', kuota: 100 },
  { name: 'Pulsa Rp50.000', kuota: 500 },
];

async function gacha(userId) {
  const total = await repo.countUserToday(userId);

  if (total >= 5) {
    throw errorResponder(
      errorTypes.VALIDATION,
      'Limit gacha 5x per hari'
    );
  }

  const isWin = Math.random() < 0.3;

  if (!isWin) {
    await repo.create({ userId, isWin: false });
    return { message: 'Zonk! Anda Kurang Beruntung, Coba Lagi 😢'};
  }

  const available = [];

  for (const item of HADIAH) {
    const count = await repo.countHadiah(item.name);

    if (count < item.kuota) {
      available.push(item);
    }
  }

  if (available.length === 0) {
    return { message: 'Hadiah habis' };
  }

  const hadiah =
    available[Math.floor(Math.random() * available.length)];

  await repo.create({
    userId,
    hadiah: hadiah.name,
    isWin: true,
  });

  return {
    message: '🎉 Selamat Anda Menang!🎉',
    hadiah: hadiah.name,
  };
}

async function getHistory(userId) {
  return repo.getHistory(userId);
}

async function getPrizes() {
  const result = [];

  for (const item of HADIAH) {
    const count = await repo.countHadiah(item.name);

    result.push({
      name: item.name,
      kuota: item.kuota,
      sisa: item.kuota - count,
    });
  }

  return result;
}

function maskName(name) {
  return name
    .split('')
    .map((char, i) =>
      i === 0 || i === name.length - 1 ? char : '*'
    )
    .join('');
}

async function getWinners() {
  const data = await repo.getAllWinners();

  return data.map((item) => ({
    userId: maskName(item.userId),
    hadiah: item.hadiah,
  }));
}

module.exports = {
  gacha,
  getHistory,
  getPrizes,
  getWinners,
};