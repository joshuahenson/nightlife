import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const yelpSchema = new Schema({
  date: { type: Date, default: Date.now, required: true },
  yelpId: { type: String },
  count: { type: Number },
  usersGoing: [String]
});

export default mongoose.model('YelpS', yelpSchema);
