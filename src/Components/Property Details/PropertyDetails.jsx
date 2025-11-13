import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import { CiStar } from "react-icons/ci";
import Swal from "sweetalert2";

export default function PropertyDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigator = useNavigate();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const BASE_URL = "https://b-12-a-10-server-side.vercel.app";

  // Fetch property details and reviews
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${BASE_URL}/properties/${id}`).then((res) => res.json()),
      fetch(`${BASE_URL}/ratings?propertyId=${id}`).then((res) => res.json()),
    ])
      .then(([propertyData, reviewData]) => {
        setProperty(propertyData);
        setReviews(reviewData);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load property or reviews.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Review Submit
  const handleSubmitReview = async () => {
    if (!user) {
      Swal.fire("Oops!", "Please login first!", "warning");
      navigator("/login");
      return;
    }

    if (!reviewText.trim() || newRating === 0) {
      Swal.fire("Error!", "Please add rating and review text!", "error");
      return;
    }

    const reviewData = {
      propertyimage: property.image,
      reviewerName: user.displayName || "Anonymous",
      reviewerEmail: user.email,
      propertyId: id,
      reviewText: reviewText,
      stars: newRating,
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch(
        "https://b-12-a-10-server-side.vercel.app/ratings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reviewData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Success!", "Review added successfully!", "success");
        setReviews([...reviews, data]);
        setNewRating(0);
        setReviewText("");
        navigator(`/MyRatings`);
      } else {
        console.error("Server Response:", data);
        Swal.fire("Error!", data.error || "Failed to add review.", "error");
      }
    } catch (error) {
      console.error("Error posting review:", error);
      Swal.fire("Error!", "Server error occurred!", "error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading property...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!property)
    return <p className="text-center mt-10">Property not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Property Details */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <img
          src={property.image}
          alt={property.propertyName}
          className="w-full md:w-1/2 h-80 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">{property.propertyName}</h1>
          <p className="text-gray-400 mb-1">Category: {property.category}</p>
          <p className="text-gray-400 mb-1">Price: ${property.price}</p>
          <p className="text-gray-400 mb-1">Location: {property.location}</p>
          <p className="text-gray-400 mb-1">Posted by: {property.userName}</p>
          <p className="text-gray-400 text-sm">
            Posted on: {new Date(property.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Add Review */}
      {user && (
        <div className="mb-8 border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Add Your Review</h2>
          <div className="flex items-center flex-row">
            <div className="inline-flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <CiStar
                    key={star}
                    onClick={() => setNewRating(star)}
                    size={25}
                    className={
                      newRating >= star ? "text-yellow-500" : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span>{newRating} Stars</span>
            </div>
          </div>
          <textarea
            className="w-full border rounded p-2 mt-2 mb-2"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button
            onClick={handleSubmitReview}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
}
