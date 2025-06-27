import toast from "react-hot-toast";
import useAuth from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const userGoogleLogin = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();

      await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        {
          email: result?.user?.email,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return handleGoogleLogin;
};

export default userGoogleLogin;
