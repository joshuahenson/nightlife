export const db = process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://localhost/nightlife';

export default {
  db
};
