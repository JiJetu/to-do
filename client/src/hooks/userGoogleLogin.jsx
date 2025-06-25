import toast from "react-hot-toast";
import useAuth from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const userGoogleLogin = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // Google login
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
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
