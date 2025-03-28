import 'dotenv/config';
import express from 'express';
import cors from 'cors';
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());

// log every request to the console
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// --- Change nothing above this line ---


// Connect to MongoDB
import { MongoClient, ObjectId } from 'mongodb';
const client = new MongoClient('mongodb://localhost:27017');
const conn = await client.connect();
const db = conn.db('app');

// Gets all the documents, uses .toArray()
app.get('/api/produce.json', async (req, res) => {
  const produce = await db.collection('produce').find().toArray()
  res.json(produce).status(200)
});

// This will work for any single document
app.get('/api/produce/:id.json', async (req, res) => {
  const id = req.params.id
  const product = await db.collection('produce').findOne({_id: new ObjectId(id)})
  res.json(product).status(200)
});


// --- Change nothing below this line ---

// 404 - not found
app.use((req, res, next) => {
  res.status(404).json({ message: 'resource ' + req.url + ' not found' });
});

// 500 - Any server error
app.use((err, req, res, next) => {
  res.status(500).json({ error: err });
});

// start server on port
app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}/`);
});
