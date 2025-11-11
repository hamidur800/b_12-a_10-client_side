import React, { useContext, useState } from "react";

import { Helmet } from "react-helmet";
import { AuthContext } from "../../provider/AuthProvider";

const MyProperties = () => {
  const { user, updateUserProfile } = useContext(AuthContext);

  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(name, photoURL);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-4">
      <Helmet>
        <title>My Properties | HOME-NEST</title>
      </Helmet>
    </div>
  );
};

export default MyProperties;
