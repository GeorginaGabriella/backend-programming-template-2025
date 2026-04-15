const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const config = require('../core/config');
const logger = require('../core/logger')('app');

// 🔥 GANTI KE NON-SRV (ANTI ERROR DNS)
const connection =
  'mongodb://GeorginaGabriella:API05BackEnd88Jina@ac-umafp0z-shard-00-00.cqgtkok.mongodb.net:27017,ac-umafp0z-shard-00-01.cqgtkok.mongodb.net:27017,ac-umafp0z-shard-00-02.cqgtkok.mongodb.net:27017/gacha_db?ssl=true&replicaSet=atlas-41wevb-shard-0&authSource=admin';

mongoose.connect(connection);

const db = mongoose.connection;

db.once('open', () => {
  logger.info('Successfully connected to MongoDB');
});

db.on('error', (err) => {
  logger.error('MongoDB connection error:', err);
});

const dbExports = {};
dbExports.db = db;

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(mongoose);
    dbExports[model.modelName] = model;
  });

module.exports = dbExports;