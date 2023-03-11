import workoutModel from '../models/workoutModel.js';

export const getWorkouts = async (req, res) => {
    try {
        const workoutModels = await workoutModel.find();

        console.log(workoutModels);

        res.status(200).json(workoutModels);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
};

export const createWorkouts = async (req, res) => {
    const workout = req.body;

    const newWorkout = new workoutModel(workout);

    try {
        await newWorkout.save();

        res.status(201).json(newWorkout);
    } catch (error) {
        res.status(409).json({ mesage: error.message })
    }
}; 