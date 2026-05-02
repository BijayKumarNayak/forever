import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdEdit } from "react-icons/md";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showAvatarSelect, setShowAvatarSelect] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/user/profile", {
          headers: { token },
        });
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "http://localhost:4000/api/user/update",
        {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
        {
          headers: { token },
        },
      );

      alert("Profile Updated Successfully");
      setEditMode(false);
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  const maleAvatar = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  const femaleAvatar =
    "https://cdn-icons-png.flaticon.com/512/3135/3135789.png";

  if (!user) {
    return <p className="mt-20 text-center">Loading profile...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl sm:p-8">
        <div className="relative flex flex-col items-center">
          <img
            src={user.avatar || maleAvatar}
            alt="Profile"
            className="border-4 border-indigo-500 rounded-full w-28 h-28"
          />

          {showAvatarSelect && (
            <MdEdit
              onClick={() => setShowAvatarSelect(!showAvatarSelect)}
              className="absolute bottom-0 bg-white rounded-full cursor-pointer"
            />
          )}

          {showAvatarSelect && (
            <div className="flex mt-4 space-x-4">
              <img
                src={maleAvatar}
                alt="Male"
                className="w-16 h-16 border rounded-full cursor-pointer hover:border-indigo-500"
                onClick={() => {
                  setUser({ ...user, avatar: maleAvatar });
                  setShowAvatarSelect(false);
                }}
              />
              <img
                src={femaleAvatar}
                alt="Female"
                className="w-16 h-16 border rounded-full cursor-pointer hover:border-indigo-500"
                onClick={() => {
                  setUser({ ...user, avatar: femaleAvatar });
                  setShowAvatarSelect(false);
                }}
              />
            </div>
          )}
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Name</label>
            <input
              value={user.name}
              disabled={!editMode}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-3 py-2 mt-1 bg-gray-100 rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              value={user.email}
              disabled={!editMode}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-3 py-2 mt-1 bg-gray-100 rounded-lg"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 text-white bg-indigo-500 rounded-lg"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              className="px-4 py-2 text-white bg-green-500 rounded-lg"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
