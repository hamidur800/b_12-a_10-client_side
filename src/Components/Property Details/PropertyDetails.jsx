import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";

export default function PropertyDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For new review
  const [newRating, setNewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Fetch property details and reviews
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/properties/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setProperty(data))
      .catch((err) => {
        console.error("Error fetching property:", err);
        setError("Failed to load property.");
      });

    fetch(`http://localhost:3000/ratings?propertyId=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // Submit new review
  const handleSubmitReview = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please log in!",
        text: "You must be logged in to submit a review.",
      });
      return;
    }

    if (!newRating || reviewText.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please provide both a star rating and review text.",
      });
      return;
    }

    const reviewPayload = {
      propertyId: id,
      reviewerName: user.displayName || "Anonymous",
      reviewerEmail: user.email,
      category: property.category,
      propertyName: property.propertyName,
      image: property.image,
      price: property.price,
      location: property.location,
      stars: newRating,
      text: reviewText,
      date: new Date().toISOString(),
    };

    fetch("http://localhost:3000/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewPayload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to post review");
        return res.json();
      })
      .then((data) => {
        setReviews([data, ...reviews]); // add new review on top
        setNewRating(0);
        setReviewText("");
        Swal.fire({
          icon: "success",
          title: "Review Submitted!",
          text: "Your review has been posted successfully.",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((err) => console.error("Error posting review:", err));
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
          <p className="text-gray-600 mb-1">Category: {property.category}</p>
          <p className="text-gray-600 mb-1">Price: ${property.price}</p>
          <p className="text-gray-600 mb-1">Location: {property.location}</p>
          <p className="text-gray-600 mb-1">Posted by: {property.userName}</p>
          <p className="text-gray-500 text-sm">
            Posted on: {new Date(property.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Add Review */}
      {user && (
        <div className="mb-8 border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Add Your Review</h2>
          <div className="flex items-center flex-row">
            <Rating
              onClick={setNewRating}
              ratingValue={newRating}
              size={25}
              allowHalfIcon={false}
            />
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

      {/* Reviews List */}
    </div>
  );
}
