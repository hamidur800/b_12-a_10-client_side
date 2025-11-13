import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import "./myR.css";

export default function MyProperties() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProperties = async () => {
      if (!user || !user.email) {
        console.log("User not logged in yet.");
        setLoading(false);
        return; // Stop here if no user
      }

      setLoading(true);
      try {
        const res = await fetch(
          `https://b-12-a-10-server-side.vercel.app/properties?email=${user.email}`
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

  //  Delete Property
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
        const res = await fetch(
          `https://b-12-a-10-server-side.vercel.app/properties/${id}`,
          {
            method: "DELETE",
          }
        );

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
    <div className="min-h-screen py-12 px-4">
      <h2 className="text-3xl font-bold  text-center mb-10">My Properties</h2>

      {properties.length === 0 ? (
        <p className="text-center">No properties found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <div
              key={prop._id}
              className="flex flex-col shadow-xl hover:shadow-xl hover:shadow-gradient transition-all border  duration-200 rounded-xl"
            >
              <img
                src={prop.image}
                alt={prop.propertyName}
                className="h-48 w-full object-cover rounded-t-xl"
              />
              <div className="flex flex-col justify-between flex-grow p-4">
                <div className="flex justify-between items-center">
                  <div className="">
                    <h3 className="text-xl font-semibold mb-1">
                      {prop.propertyName}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {prop.location}
                    </p>
                  </div>
                  <div className="">
                    <p className="italic text-gray-400 text-sm">
                      Category :{prop.category || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <p className="text-lg font-bold">
                    price :{" "}
                    <span className=" text-rose-500">${prop.price}</span>
                  </p>

                  <Link
                    to={`/property/${prop._id}`}
                    className="button"
                    style={{ "--clr": "#7808d0" }}
                  >
                    <span className="button__icon-wrapper">
                      <svg
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="button__icon-svg"
                        width="10"
                      >
                        <path
                          d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                          fill="currentColor"
                        />
                      </svg>

                      <svg
                        viewBox="0 0 14 15"
                        fill="none"
                        width="10"
                        xmlns="http://www.w3.org/2000/svg"
                        className="button__icon-svg button__icon-svg--copy"
                      >
                        <path
                          d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    View Details
                  </Link>
                </div>
                <p className=" italic text-gray-400 text-sm">
                  Posted by : {prop.userName || "Unknown"}
                </p>
              </div>
              <div className="px-3">
                <div className="p-3 flex justify-between gap-1">
                  <Link
                    onClick={() => navigate(`/update/${prop._id}`)}
                    className="fancy-button"
                  >
                    Update
                  </Link>
                  <Link
                    className="delete-button"
                    type="button"
                    onClick={() => handleDelete(prop._id)}
                  >
                    <span className="delete-button__text">Delete</span>
                    <span className="delete-button__icon">
                      <svg
                        className="svg"
                        height="512"
                        viewBox="0 0 512 512"
                        width="512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Delete Icon</title>
                        <path
                          d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
                          style={{
                            fill: "none",
                            stroke: "#fff",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "32px",
                          }}
                        ></path>
                        <line
                          style={{
                            stroke: "#fff",
                            strokeLinecap: "round",
                            strokeMiterlimit: 10,
                            strokeWidth: "32px",
                          }}
                          x1="80"
                          x2="432"
                          y1="112"
                          y2="112"
                        ></line>
                        <path
                          d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
                          style={{
                            fill: "none",
                            stroke: "#fff",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "32px",
                          }}
                        ></path>
                        <line
                          style={{
                            fill: "none",
                            stroke: "#fff",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "32px",
                          }}
                          x1="256"
                          x2="256"
                          y1="176"
                          y2="400"
                        ></line>
                        <line
                          style={{
                            fill: "none",
                            stroke: "#fff",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "32px",
                          }}
                          x1="184"
                          x2="192"
                          y1="176"
                          y2="400"
                        ></line>
                        <line
                          style={{
                            fill: "none",
                            stroke: "#fff",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "32px",
                          }}
                          x1="328"
                          x2="320"
                          y1="176"
                          y2="400"
                        ></line>
                      </svg>
                    </span>
                  </Link>

                  {/* <button
                    
                    className="button"
                    type="button"
                  >
                    <span className="button__text">Delete</span>
                    <span className="button__icon">
                      <svg
                        className="svg"
                        height="512"
                        viewBox="0 0 512 512"
                        width="512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title></title>
                        <path
                          d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
                          style={{
                            fill: "none",
                            stroke: "#fff",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "32px",
                          }}
                        />
                        <line
                          x1="80"
                          y1="112"
                          x2="432"
                          y2="112"
                          style={{
                            stroke: "#fff",
                            strokeLinecap: "round",
                            strokeMiterlimit: 10,
                            strokeWidth: "32px",
                          }}
                        />
                        <path
                          d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
                          style={{
                            fill: "none",
                            stroke: "#fff",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "32px",
                          }}
                        />
                        <line
                          x1="256"
                          y1="176"
                          x2="256"
                          y2="400"
                          style={{
                            fill: "none",
                            stroke: "#fff",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "32px",
                          }}
                        />
                        <line
                          x1="184"
                          y1="176"
                          x2="192"
                          y2="400"
                          style={{
                            fill: "none",
                            stroke: "#fff",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "32px",
                          }}
                        />
                        <line
                          x1="328"
                          y1="176"
                          x2="320"
                          y2="400"
                          style={{
                            fill: "none",
                            stroke: "#fff",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "32px",
                          }}
                        />
                      </svg>
                    </span>
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
