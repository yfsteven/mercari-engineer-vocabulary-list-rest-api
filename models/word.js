const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const uri = process.env.DB_URI;
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

const wordSchema = new mongoose.Schema({
  日本語: String,
  English: String,
  例文: String,
  example: String,
});

wordSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Word = mongoose.model('Word', wordSchema, 'word');

module.exports = Word;