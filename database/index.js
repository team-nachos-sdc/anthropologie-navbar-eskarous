const Sequelize = require('sequelize');

const db = new Sequelize('fec', 'ubuntu', 'eskarous', {
  host: 'ec2-52-53-180-42.us-west-1.compute.amazonaws.com',
  dialect: 'postgres',
  port: 5432
});

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;
