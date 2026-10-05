import { Link } from "react-router-dom";


const WorkoutListing = ({ workout }) => {
  return (
    <div className="workout-preview">
      {/* <h2>30-Day Fat Burn</h2>
      <p>Difficulty: Beginner</p>
      <p>Price: $49.99</p> */}
      <Link to={`/workouts/${workout.id}`}>
        <h2>{workout.title}</h2>
      </Link>
      <p>Difficulty: {workout.difficulty}</p>
      <p>Price: ${workout.price}</p>
    </div>
  );
};

export default WorkoutListing;
