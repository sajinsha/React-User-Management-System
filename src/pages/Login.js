import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(8).required("Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("User logged in successfully", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Wait for the toast to finish before redirecting
      setTimeout(() => {
        navigate("/products");
      }, 2000);
    } catch (error) {
      toast.error("Invalid email or password", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="lg:h-screen flex flex-col lg:flex-row">
      {/* Left side - Black background, only on sm and up */}
      <div className="hidden lg:block lg:basis-[60%] bg-black lg:h-screen"></div>
      {/* Right side - Form */}
      <div className="w-full lg:basis-[40%] flex items-center justify-center bg-white lg:h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded  w-full lg:max-w-md"
        >
          <h2 className="text-2xl font-bold mb-2 text-start sm:text-center">
            Welcome Back!!
          </h2>
          <p className="sm:text-center text-start text-gray-500 mb-6 text-sm">
            Please Login your Account
          </p>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border rounded-[10px]"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 border rounded-[10px]"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
            <div className="flex justify-end mt-1">
              <button
                type="button"
                className="text-xs text-black hover:underline"
              >
                Forgot Password
              </button>
            </div>
          </div>
          {/* Responsive bottom actions: fixed on mobile, static on desktop */}
          <div
            className="w-full bg-white  pb-6 pt-2 z-10 [@media(max-width:1024px)]:p-8
               sm:mt-0
              fixed bottom-0 left-0 lg:relative
              lg:shadow-none shadow-lg
              lg:rounded-none rounded-t-2xl
              lg:w-full"
          >
            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-[10px] mt-4"
            >
              Sign in
            </button>
            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-gray-400 text-xs">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
            <div className="mt-2 text-center">
              <span>Didn't have an Account? </span>
              <Link to="/signup" className="font-bold">
                Sign-up
              </Link>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
