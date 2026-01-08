import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:2000/profile", {
          headers: {
            Authorization: `${token}`,
          },
        });

        setUser(res.data.userData);
        setProfilePic(res.data.userData.profilePic || "");
        setAddress(res.data.userData.address || {
          name: "",
          phone: "",
          street: "",
          city: "",
          state: "",
          pincode: ""
        });

      } catch (err) {
        toast.error("Session expired. Please login again.");
        sessionStorage.clear();
        navigate("/login");
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(
        "http://localhost:2000/profile/update",
        {
          profilePic,
          address
        },
        {
          headers: { Authorization: token }
        }
      );
      
      toast.success("Profile updated successfully");
      setIsEditing(false);
      
      // Refresh user data
      const res = await axios.get("http://localhost:2000/profile", {
        headers: { Authorization: token }
      });
      setUser(res.data.userData);
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  if (!user) {
    return <div className="h-screen flex justify-center items-center bg-slate-900 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 p-10">
      <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-xl text-white">
        <h1 className="text-3xl font-bold mb-8 text-center">My Profile</h1>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full bg-slate-600 flex items-center justify-center mb-4 overflow-hidden">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl">{user.name?.charAt(0)?.toUpperCase()}</span>
            )}
          </div>
          
          {isEditing && (
            <input
              type="url"
              placeholder="Profile Picture URL"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
              className="w-64 p-2 bg-slate-700 rounded border-none outline-none text-center"
            />
          )}
        </div>

        {/* User Info */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold mb-2">Name:</label>
            <p className="p-3 bg-slate-700 rounded">{user.name}</p>
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Email:</label>
            <p className="p-3 bg-slate-700 rounded">{user.email}</p>
          </div>
        </div>

        {/* Address Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Address</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Full Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={address.name}
                  onChange={(e) => setAddress({...address, name: e.target.value})}
                  className="w-full p-3 bg-slate-700 rounded border-none outline-none"
                />
              ) : (
                <p className="p-3 bg-slate-700 rounded">{address.name || "Not provided"}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Phone:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={address.phone}
                  onChange={(e) => setAddress({...address, phone: e.target.value})}
                  className="w-full p-3 bg-slate-700 rounded border-none outline-none"
                />
              ) : (
                <p className="p-3 bg-slate-700 rounded">{address.phone || "Not provided"}</p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-bold mb-2">Street Address:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) => setAddress({...address, street: e.target.value})}
                  className="w-full p-3 bg-slate-700 rounded border-none outline-none"
                />
              ) : (
                <p className="p-3 bg-slate-700 rounded">{address.street || "Not provided"}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">City:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => setAddress({...address, city: e.target.value})}
                  className="w-full p-3 bg-slate-700 rounded border-none outline-none"
                />
              ) : (
                <p className="p-3 bg-slate-700 rounded">{address.city || "Not provided"}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">State:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) => setAddress({...address, state: e.target.value})}
                  className="w-full p-3 bg-slate-700 rounded border-none outline-none"
                />
              ) : (
                <p className="p-3 bg-slate-700 rounded">{address.state || "Not provided"}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Pincode:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={address.pincode}
                  onChange={(e) => setAddress({...address, pincode: e.target.value})}
                  className="w-full p-3 bg-slate-700 rounded border-none outline-none"
                />
              ) : (
                <p className="p-3 bg-slate-700 rounded">{address.pincode || "Not provided"}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-bold"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
