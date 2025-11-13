// import { useEffect, useState, useContext, use } from "react";
// import { AuthContext } from "../../provider/AuthProvider";

// export default function MyRatings() {
//   const { user } = useContext(AuthContext);
//   const [ratings, setRatings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!user) return;

//     fetch(`http://localhost:3000/properties?email=${user.email}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setRatings(data);
//       })
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   }, [user]);

//   if (!user) {
//     return (
//       <p className="text-center mt-10 text-red-500">
//         Please log in to see your ratings.
//       </p>
//     );
//   }

//   if (loading)
//     return <p className="text-center mt-10">Loading your ratings...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
//   if (ratings.length === 0)
//     return (
//       <p className="text-center mt-10">You haven't given any ratings yet.</p>
//     );

//   return (
//     <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {ratings.map((rating) => (
//         <div
//           key={rating._id}
//           className="shadow p-4 flex flex-col  hover:shadow-xl hover:shadow-gradient transition-all border  duration-200 rounded-xl"
//         >
//           <img
//             src={rating.imageR || rating.image}
//             alt={rating.propertyName}
//             className="w-full h-40 object-cover rounded-md mb-3"
//           />
//           <p className="text-gray-400 mb-1">Reviewer: {rating.userName}</p>
//           <p className="text-xl font-semibold mb-1">{rating.propertyName}</p>
//           <p className="text-yellow-500 mb-1">Stars {rating.stars} / 5</p>
//           <p className="text-gray-400 mb-2">
//             Dec : {rating.reviewText || rating.text}
//           </p>
//           <p className="text-gray-400 text-sm">
//             {new Date(rating.date).toLocaleDateString()}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }
// Reviewer Name
// Property Name (the property being reviewed)
// Star Rating (1 to 5)
// Short Review Text
//Review Date
// Thumbnail of Property

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

export default function MyRatings() {
  const { user } = useContext(AuthContext);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/ratings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched ratings:", data);
        setRatings(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user)
    return (
      <p className="text-center mt-10">Please login to see your reviews.</p>
    );

  if (loading)
    return <p className="text-center mt-10">Loading your reviews...</p>;

  if (ratings.length === 0)
    return <p className="text-center mt-10">No reviews yet.</p>;

  return (
    <>
      <h1 className="text-2xl text-center font-bold mb-4">My Reviews</h1>
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
            <p className="text-gray-400 mb-2">
              Dec : {rating.reviewText || rating.text}
            </p>
            <p className="text-gray-400 text-sm">
              {new Date(rating.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
