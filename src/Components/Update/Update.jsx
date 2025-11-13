import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

export default function UpdateProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    propertyName: "",
    price: "",
    location: "",
    category: "",
    description: "",
  });

  //  Fetch single property by ID
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(
          `https://b-12-a-10-server-side.vercel.app/properties/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch property");
        const data = await res.json();

        setFormData({
          propertyName: data.propertyName || "",
          price: data.price || "",
          location: data.location || "",
          category: data.category || "",
          description: data.description || "",
        });
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load property data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(
        `https://b-12-a-10-server-side.vercel.app/properties/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update property");

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Property updated successfully.",
        confirmButtonColor: "#f43f5e",
      }).then(() => {
        navigate(`/property/${id}`);
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Update failed!",
        confirmButtonColor: "#f43f5e",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-rose-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Update Property</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-8 rounded-2xl shadow-xl border"
      >
        {/* User Info */}
        <div className="mb-4">
          <label className="block text-gray-400 font-semibold mb-1">
            User Name
          </label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full border rounded px-3 py-2 cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 font-semibold mb-1">
            User Email
          </label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border rounded px-3 py-2 cursor-not-allowed"
          />
        </div>

        {/* Property Fields */}
        <div className="mb-4">
          <label className="block text-gray-400 font-semibold mb-1">
            Property Name
          </label>
          <input
            type="text"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 font-semibold mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 font-semibold mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 font-semibold mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option className="text-gray-400" value="">
              Select Category
            </option>
            <option className="text-gray-400" value="Flat">
              Flat
            </option>
            <option className="text-gray-400" value="House">
              House
            </option>
            <option className="text-gray-400" value="Office">
              Office
            </option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-400 font-semibold mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded px-3 py-2"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-rose-500 text-white font-semibold py-2 rounded hover:bg-rose-600 transition"
        >
          {submitting ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
}
