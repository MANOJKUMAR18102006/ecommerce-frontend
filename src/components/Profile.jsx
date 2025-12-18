import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
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

      } catch (err) {
        toast.error("Session expired. Please login again.");
        sessionStorage.clear();
        navigate("/login");
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <div className="h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="h-screen flex justify-center items-center bg-slate-900">
      <div className="bg-slate-600 p-10 rounded-xl shadow-xl text-white w-[400px]">
        <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>

        <p className="mb-2">
          <strong>Name:</strong> {user.name}
        </p>

        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>

        <p className="mb-2">
          <strong>Role:</strong> {user.role}
        </p>
      </div>
    </div>
  );
};

export default Profile;
