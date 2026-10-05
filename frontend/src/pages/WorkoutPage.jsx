import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";

const WorkoutPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const deleteWorkout = async (workoutId) => {
    try {
      const res = await fetch(`/api/workouts/${workoutId}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        throw new Error("Failed to delete workout");
      }
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };


  const onDeleteClick = (workoutId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this workout?"
    );
    if (!confirm) return;

    deleteWorkout(workoutId);
    navigate("/");
  };

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await fetch(`/api/workouts/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setWorkout(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  const handleGoHome = () => {
    navigate("/");
  };


  return (
    <div className="workout-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>Workout Details</h2>
          <h2>Title: {workout.title}</h2>
          <p>Difficulty: {workout.difficulty}</p>
          <p>Description: {workout.description}</p>
          <p>Price: ${workout.price.toFixed(2)}</p>
          <button onClick={() => handleGoHome()}>Back</button>
          <button onClick={() => onDeleteClick(workout._id)}>Delete</button>
          <button onClick={() => navigate(`/edit/${workout._id}`)}>Edit</button>
        </>
      )}
    </div>
  );
};

export default WorkoutPage;
