import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PineconeClient } from "@pinecone-database/pinecone";

import workoutRoutes from './routes/workoutRoutes.js'

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/workouts', workoutRoutes);

const pinecone = new PineconeClient();

await pinecone.init({
  environment: 'us-east-1-aws',
  api_key: 'a826dad4-8d98-4adf-bac3-ce6c23e1ad1f',
  project_name: 'workouts'
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

//const workout_index = pinecone.Index('/workout')