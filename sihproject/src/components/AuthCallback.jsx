import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/auth/user", {
          method: "GET",
          credentials: "include", // Ensure cookies are included in the request
        });

        if (res.ok) {
          const data = await res.json();
          dispatch(signInSuccess(data)); // Update Redux state
          navigate("/"); // Redirect to home or dashboard
        } else {
          console.error("Failed to fetch user data");
          navigate("/login"); // Redirect to login page on error
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login"); // Redirect to login page on error
      }
    };

    fetchUserData();
  }, [dispatch, navigate]);

  return <div>Loading...</div>;
};

export default AuthCallback;
