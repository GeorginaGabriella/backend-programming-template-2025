const repo = require('./gacha-repository');

const HADIAH = [
  { name: 'Emas 10 gram', kuota: 1 },
  { name: 'Smartphone X', kuota: 5 },
  { name: 'Smartwatch Y', kuota: 10 },
  { name: 'Voucher Rp100.000', kuota: 100 },
  { name: 'Pulsa Rp50.000', kuota: 500 },
];

async function gacha(userId) {
  // limit 5x
  const total = await repo.countUserToday(userId);
  if (total >= 5) {
    throw new Error('Limit gacha 5x per hari');
  }

  const isWin = Math.random() < 0.3;

  if (!isWin) {
    await repo.create({ userId, isWin: false });
    return { message: 'Zonk 😢' };
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
    message: 'Menang 🎉',
    hadiah: hadiah.name,
  };
}

module.exports = { gacha };