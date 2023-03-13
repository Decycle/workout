import express from 'express';

import {getWorkouts, createWorkouts, updateWorkout} from '../controllers/workouts.js'

const router = express.Router();

router.get('/', getWorkouts);
router.post('/', createWorkouts);
router.patch('/:id', updateWorkout)

export default router;