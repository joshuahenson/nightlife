import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// TODO: WIP
const yelpSchema = new Schema({
  date: { type: Date, default: Date.now, required: true },
});
