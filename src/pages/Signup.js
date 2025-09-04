import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup.string().email().required("Email is required"),
  dob: yup.string().required("Date of Birth is required"),
  mobile: yup.string().required("Mobile is required"),
  password: yup.string().min(8).required("Password is required"),
});

function Signup() {
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(userCredential.user, { displayName: data.name });
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: data.name,
        email: data.email,
        dob: data.dob,
        mobile: data.mobile,
      });
      navigate("/products");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="lg:min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Black background, only on sm and up */}
      <div className="hidden lg:flex lg:flex-col lg:justify-end lg:basis-[60%] bg-black p-12 relative">
        <div className="absolute left-0 bottom-0 w-full px-12 pb-10">
          <div className="mb-6">
            <span className="text-white text-2xl font-bold">&#10077;</span>
          </div>
          <blockquote className="text-white text-base mb-4 leading-relaxed">
            Figma ipsum component variant main layer. Create flatten create
            effect move strikethrough, Union export plugin bullet effect hand
            arrange align. Project project boolean arrow scale. Rectangle device
            clip hand figma content frame underline content.
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white text-sm mb-2 font-semibold">
                Pam Hand
              </div>
              <div className="text-gray-300 text-sm mb-4">
                pam.hand@gmail.com
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              {/* <span className="text-white cursor-pointer text-lg">&#60;</span> */}
              <img
                src="/lesserthan.svg"
                alt="lesser Icon"
                className="w-8 h-3 cursor pointer"
              />
              {/* <span className="text-white cursor-pointer text-lg">&#62;</span> */}
              <img
                src="/greaterthan.svg"
                alt="greater Icon"
                className="w-8 h-3 cursor pointer"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Right side - Form */}
      <div className="w-full lg:basis-[40%] flex items-center justify-center bg-white lg:min-h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded w-full lg:max-w-md"
        >
          <h2 className="text-2xl font-bold mb-2 text-start sm:text-center">
            Create an Account
          </h2>
          <p className="text-start sm:text-center text-gray-500 mb-6">
            Are you ready to join us! Let's create an account
          </p>
          <div className="mb-4">
            <label className="block mb-1">Full name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full p-2 border rounded-[10px]"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>
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
            <label className="block mb-1">Date Field</label>
            <input
              type="date"
              {...register("dob")}
              className="w-full p-2 border rounded-[10px]"
            />
            <p className="text-red-500 text-sm">{errors.dob?.message}</p>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Mobile</label>
            <input
              type="text"
              {...register("mobile")}
              className="w-full p-2 border rounded-[10px]"
            />
            <p className="text-red-500 text-sm">{errors.mobile?.message}</p>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 border rounded-[10px]"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2  hover:bg-gray-800 rounded-[10px] mt-4"
          >
            Create Account
          </button>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-400 text-xs">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <div className="mt-2 text-center">
            <span className="text-gray-500">Already have an account? </span>
            <Link to="/login" className="font-bold">
              Sign-in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
