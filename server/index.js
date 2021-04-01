import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/post.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/post', postRoutes);
// Mongo Database Atlas

const DBCONNECTION =
  process.env.DBCONNECTION ||
  'mongodb+srv://mymernboilerplate:mymernboilerplate0517@cluster0.ere55.mongodb.net/mern?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose
  .connect(DBCONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);
