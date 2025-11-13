import { useEffect, useState, useContext, use } from "react";
import { AuthContext } from "../../provider/AuthProvider";

export default function MyRatings() {
  const { user } = useContext(AuthContext);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/properties?reviewerEmail=${user.email}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("Expected array but got:", data);
          setError("Invalid response from server");
          setLoading(false);
          return;
        }

        setRatings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching ratings:", err);
        setError("Failed to load ratings.");
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return (
      <p className="text-center mt-10 text-red-500">
        Please log in to see your ratings.
      </p>
    );
  }

  if (loading)
    return <p className="text-center mt-10">Loading your ratings...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (ratings.length === 0)
    return (
      <p className="text-center mt-10">You haven't given any ratings yet.</p>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ratings.map((rating) => (
        <div
          key={rating._id}
          className="shadow p-4 flex flex-col  hover:shadow-xl hover:shadow-gradient transition-all border  duration-200 rounded-xl"
        >
          <img
            src={rating.imageR || rating.image}
            alt={rating.propertyName}
            className="w-full h-40 object-cover rounded-md mb-3"
          />
          <p className="text-gray-400 mb-1">Reviewer: {rating.userName}</p>
          <p className="text-xl font-semibold mb-1">{rating.propertyName}</p>
          <p className="text-yellow-500 mb-1">Stars {rating.stars} / 5</p>
          <p className="text-gray-400 mb-2">Dec : {rating.text}</p>
          <p className="text-gray-400 text-sm">
            {new Date(rating.date).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
