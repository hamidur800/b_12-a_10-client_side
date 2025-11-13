import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function AllProperties() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const url = new URL("http://localhost:3000/properties");
      if (search) url.searchParams.append("search", search);
      if (sort) url.searchParams.append("sort", sort);

      const res = await fetch(url);
      const data = await res.json();

      if (Array.isArray(data)) setProperties(data);
      else setProperties([]);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [search, sort]);

  return (
    <div className="min-h-screen py-12 px-4">
      {/* Header Controls */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold">All Properties</h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg w-56 focus:ring-2 focus:ring-gray-400 outline-none"
          />

          {/* Sort Dropdown */}
          <select
            onChange={(e) => setSort(e.target.value)}
            value={sort}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
          >
            <option className="text-gray-400" value="">
              Sort by
            </option>
            <option className="text-gray-400" value="price_asc">
              Price Down
            </option>
            <option className="text-gray-400" value="price_desc">
              Price Up
            </option>
            <option className="text-gray-400" value="date_asc">
              Date Down
            </option>
            <option className="text-gray-400" value="date_desc">
              Date Up
            </option>
          </select>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-rose-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <p className="col-span-full text-center text-gray-400">
              No properties found.
            </p>
          ) : (
            properties.map((prop) => (
              <div
                key={prop._id}
                className="flex flex-col hover:shadow-xl hover:shadow-gradient transition-all border  duration-200 rounded-xl "
              >
                <img
                  src={prop.image || "/placeholder.jpg"}
                  alt={prop.propertyName}
                  className="h-48 w-full object-cover rounded-t-xl"
                />
                <div className="flex flex-col justify-between flex-grow p-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      {prop.propertyName}
                    </h3>
                    <p className="text-gray-500 text-sm mb-1">
                      {prop.location}
                    </p>
                    <p className="text-sm text-gray-400 mb-2">
                      Category: {prop.category}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <p className="text-lg font-bold text-rose-500">
                      ${prop.price}
                    </p>
                    <Link to={`/property/${prop._id}`}>View Details</Link>
                  </div>
                  <p className="mt-2 text-xs text-gray-400">
                    Posted by: {prop.userName || "Unknown"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
