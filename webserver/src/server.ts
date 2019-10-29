import * as express from 'express'
import * as mongoose from 'mongoose'

import userData from './data/userData'
// import symptomData from './data/symptomData'
// import userSymptomData from './data/userSymptonData'

var mongoDB = 'mongodb://db:27017/reach-engine'
mongoose.connect(mongoDB, { useNewUrlParser: true })
var db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  }
})

const User = mongoose.model('User', userSchema)

User.collection.insert(userData, (err, docs: any) => {
  if (err) {
    throw err
  } else {
      console.info('%d users were successfully stored.', docs.length);
  }
})

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.get('/something', async (req, res) => {
  try {
    var result = await User.find().exec();
    res.send(result);
} catch (error) {
    res.status(500).send(error);
}
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)
