import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const yelpSchema = new Schema({
  date: { type: Date, default: Date.now, required: true },
  yelpId: {type: String, unique: true, dropDups: true},
  count: { type: Number, default: 1 },
  usersGoing: [String]
});

export default mongoose.model('YelpS', yelpSchema);
