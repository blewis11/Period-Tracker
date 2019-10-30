import * as express from 'express'

import connect from './connect'
import seedDatabase from './seedDatabase'
import createModels from './createModels'

const { mongoose, db } = connect()

const models = createModels(mongoose)
const { User } = models

seedDatabase(mongoose, models)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (_, res) => {
  res.send('Hello world\n');
});

app.get('/users', async (_, res) => {
  try {
    var result = await User.find().exec();
    res.send(result);
} catch (error) {
    res.status(500).send(error);
}
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)
