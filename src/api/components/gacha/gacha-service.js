const repo = require('./gacha-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

const HADIAH = [
  { code: 'emas-10g', name: 'Emas 10 gram', kuota: 1 },
  { code: 'smartphone-x', name: 'Smartphone X', kuota: 5 },
  { code: 'smartwatch-y', name: 'Smartwatch Y', kuota: 10 },
  { code: 'voucher-100k', name: 'Voucher Rp100.000', kuota: 100 },
  { code: 'pulsa-50k', name: 'Pulsa Rp50.000', kuota: 500 },
];

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

async function gacha(userId) {
  const today = new Date();
  const total = await repo.countUserToday(userId);

  if (total >= 5) {
    throw errorResponder(
      errorTypes.VALIDATION,
      'Limit gacha 5x per hari'
    );
  }

  const isWin = Math.random() < 0.3;
  let result = {};
  let newLog = null;

  if (!isWin) {
    newLog = await repo.create({ userId, isWin: false });

    result = {
      isWinner: false,
      prize: null,
      message: '😢 Maaf, Anda Belum Beruntung, Coba Lagi Ya 😢',
    };
  } else {
    const available = [];

    for (const item of HADIAH) {
      const count = await repo.countHadiah(item.name);

      if (count < item.kuota) {
        available.push(item);
      }
    }

    if (available.length === 0) {
      result = {
        isWinner: false,
        prize: null,
        message: 'Hadiah habis',
      };
    } else {
      const hadiah =
        available[Math.floor(Math.random() * available.length)];

      newLog = await repo.create({
        userId,
        hadiah: hadiah.name,
        isWin: true,
      });

      result = {
        isWinner: true,
        prize: hadiah.name,
        message: '🎉 Hore! Selamat Anda Beruntung Memenangkan Hadiah!🎉',
      };
    }
  }

  return {
    user: {
      userId: userId,
    },
    drawDate: formatDate(today),
    drawCountToday: total + 1,
    remainingDrawsToday: 5 - (total + 1),
    result: result,
    logId: newLog?._id,
  };
}

async function getHistory(userId) {
  const data = await repo.getHistory(userId);

  return data.map((item) => ({
    id: item._id,
    userId: item.userId,
    isWin: item.isWin,
    hadiah: item.hadiah || null,
    createdAt: formatDate(item.createdAt),
  }));
}

async function getPrizes() {
  const result = [];

  for (const item of HADIAH) {
    const count = await repo.countHadiah(item.name);

    result.push({
      code: item.code,
      name: item.name,
      quota: item.kuota,
      winnerCount: count,
      remainingQuota: item.kuota - count,
    });
  }

  return result;
}

function maskName(name) {
  return name
    .split(' ')
    .map((word) => {
      if (word.length <= 2) return word;

      return word
        .split('')
        .map((char, i) => {
          if (i === 0 || i === word.length - 1) return char;

          return Math.random() < 0.5 ? char : '*';
        })
        .join('');
    })
    .join(' ');
}

async function getWinners() {
  const data = await repo.getAllWinners();

  const grouped = {};

  for (const item of data) {
    if (!grouped[item.hadiah]) {
      grouped[item.hadiah] = [];
    }

    grouped[item.hadiah].push({
      maskedName: maskName(item.userId),
      wonAt: formatDate(item.createdAt),
    });
  }

  return Object.keys(grouped).map((hadiah) => ({
    prizeName: hadiah,
    totalWinners: grouped[hadiah].length,
    winners: grouped[hadiah],
  }));
}

module.exports = {
  gacha,
  getHistory,
  getPrizes,
  getWinners,
};