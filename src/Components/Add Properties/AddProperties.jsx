import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

const AddProperties = () => {
  const { user } = useContext(AuthContext);

  const handleAddProperty = (e) => {
    e.preventDefault();
    const form = e.target;

    const propertyData = {
      propertyName: form.propertyName.value,
      description: form.description.value,
      category: form.category.value,
      price: form.price.value,
      location: form.location.value,
      image: form.image.value,
      userEmail: user?.email,
      userName: user?.displayName,
      createdAt: new Date(),
    };

    fetch("http://localhost:3000/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(propertyData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Property Added!",
          text: "Your property listing has been successfully created.",
          confirmButtonColor: "#6366f1",
        });
        form.reset();
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 py-12">
      <div className="w-11/12 md:w-3/5 mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Add New Property
        </h2>

        <form onSubmit={handleAddProperty} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="propertyName"
              type="text"
              placeholder="Property Name"
              className="input input-bordered w-full"
              required
            />
            <input
              name="category"
              type="text"
              placeholder="Category (Rent, Sale, etc.)"
              className="input input-bordered w-full"
              required
            />
          </div>

          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="price"
              type="number"
              placeholder="Price"
              className="input input-bordered w-full"
              required
            />
            <input
              name="location"
              type="text"
              placeholder="Location"
              className="input input-bordered w-full"
              required
            />
          </div>

          <input
            name="image"
            type="url"
            placeholder="Image URL"
            className="input input-bordered w-full"
            required
          />

          <div className="grid md:grid-cols-2 gap-6">
            <input
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full"
            />
            <input
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition"
          >
            Add Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperties;
