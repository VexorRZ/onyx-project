require('dotenv').config();
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;
const sqlConnected = postgres(connectionString);

export default sqlConnected;
module.exports = {
  dialect: 'postgres',

  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
