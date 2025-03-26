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
// import { MongoClient, ObjectId } from 'mongodb';
// const client = new MongoClient('mongodb://localhost:27017');
// const conn = await client.connect();

app.get('/api/documents.json', async (req, res) => {
  res.json([
    {
      name: "Apple",
      category: "fruit",
      price: 1.99,
      quantity: 150,
      supplier: "Organic Farms Inc",
      organic: true,
      country: "USA",
      expiration: new Date("2023-12-15")
    },
    {
      name: "Banana",
      category: "fruit",
      price: 0.59,
      quantity: 200,
      supplier: "Tropical Imports",
      organic: false,
      country: "Ecuador",
      expiration: new Date("2023-12-10")
    }]).status(200);
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
