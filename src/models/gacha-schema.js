module.exports = (db) =>
  db.model(
    'Gacha',
    db.Schema({
      userId: String,
      hadiah: String,
      isWin: Boolean,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    })
  );