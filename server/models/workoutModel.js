import mongoose from 'mongoose';

const workoutSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const workoutModel = mongoose.model('workoutModel', workoutSchema);

export default workoutModel;