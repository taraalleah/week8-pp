const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET /api/workouts
const getAllWorkouts = async (req, res) => {
  res.send("getAllWorkouts");
};

// POST /api/workouts
const createWorkout = async (req, res) => {
  res.send("createWorkout");
};

// GET /api/workouts/:workoutId
const getWorkoutById = async (req, res) => {
  const { workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return res.status(404).json({ message: "Invalid workout ID" });
  }

  try {
    const workout = await Workout.findById(workoutId);
    if (workout) {
      res.status(200).json(workout);
    } else {
      res.status(404).json({ message: "Workout not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve workout" });
  }
};


// PUT /api/workouts/:workoutId
const updateWorkout = async (req, res) => {
  res.send("updateWorkout");
};

// DELETE /api/workouts/:workoutId
const deleteWorkout = async (req, res) => {
    const { workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return res.status(404).json({ message: "Invalid workout ID" });
  }
  try {
    const deletedWorkout = await Workout.findOneAndDelete({ _id: workoutId });
    if (deletedWorkout) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Workout not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete workout" });
  }
};

module.exports = {
  getAllWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
};

