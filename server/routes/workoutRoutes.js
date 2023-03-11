import express from 'express';

import {getWorkouts, createWorkouts} from '../controllers/workouts.js'

const router = express.Router();

router.get('/', getWorkouts);
router.post('/', createWorkouts);

export default router;