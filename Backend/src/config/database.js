require('dotenv').config();
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;
const sqlConnected = postgres(connectionString);

export default sqlConnected;
module.exports = {
  dialect: 'postgres',
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,

  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
