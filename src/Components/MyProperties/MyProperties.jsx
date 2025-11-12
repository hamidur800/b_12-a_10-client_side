import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";

export default function MyProperties() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // // 🔒 Simulated Auth
  // const user = JSON.parse(localStorage.getItem("user"));
  // const isLoggedIn = !!user;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProperties = async () => {
      if (!user || !user.email) {
        console.log("User not logged in yet.");
        setLoading(false);
        return; // ✅ Stop here if no user
      }

      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/properties?email=${user.email}`
        );
        const data = await res.json();

        if (Array.isArray(data)) setProperties(data);
        else setProperties([]);
      } catch (err) {
        console.error("Fetch error:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProperties();
  }, [user]);

  // 🗑️ Delete Property
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This property will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/properties/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setProperties((prev) => prev.filter((p) => p._id !== id));
          Swal.fire("Deleted!", "Your property has been deleted.", "success");
        } else {
          Swal.fire("Error", "Failed to delete property", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Something went wrong", "error");
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-rose-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
        My Properties
      </h2>

      {properties.length === 0 ? (
        <p className="text-center text-gray-500">No properties found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <div
              key={prop._id}
              className="flex flex-col rounded-xl shadow-md hover:shadow-xl transition-all bg-gradient-to-r from-fuchsia-50 to-sky-50  duration-200"
            >
              <img
                src={prop.image || "/placeholder.jpg"}
                alt={prop.propertyName}
                className="h-48 w-full object-cover rounded-t-xl"
              />
              <div className="flex flex-col justify-between flex-grow p-4">
                <div className="flex justify-between items-center">
                  <div className="">
                    <h3 className="text-xl font-semibold mb-1">
                      {prop.propertyName}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">
                      {prop.location}
                    </p>
                  </div>
                  <div className="">
                    <p className="italic text-gray-700 text-sm">
                      Category :{prop.category || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <p className="text-lg font-bold text-rose-500">
                    ${prop.price}
                  </p>

                  <Link to={`/property/${prop._id}`}>View Details</Link>
                </div>
                <p className=" italic text-gray-700 text-sm">
                  Posted by : {prop.userName || "Unknown"}
                </p>
              </div>
              <div className="p-2 flex justify-between gap-2">
                <Link
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/property/${prop._id}`)}
                >
                  View
                </Link>
                <Link
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/update/${prop._id}`)}
                >
                  Update
                </Link>
                <Link
                  variant="default"
                  size="sm"
                  className="bg-rose-500 hover:bg-rose-600 text-white"
                  onClick={() => handleDelete(prop._id)}
                >
                  Delete
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
