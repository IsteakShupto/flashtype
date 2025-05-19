import { useState } from "react";
import { useRegisterMutation } from "../app/services/services";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./Footer";

function Register() {
  const [register, { data, isError, isLoading }] = useRegisterMutation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email) {
      toast("Please provide email address.", {
        progressClassName: "toast-progress-bar",
        theme: "dark",
      });
      return;
    }

    if (!name) {
      toast("Please provide your name.", {
        progressClassName: "toast-progress-bar",
        theme: "dark",
      });
      return;
    }

    if (!password) {
      toast("Please provide password.", {
        progressClassName: "toast-progress-bar",
        theme: "dark",
      });
      return;
    }

    try {
      const signupCredentials = {
        email: email,
        name: name,
        password: password,
      };

      const result = await register(signupCredentials).unwrap();
      console.log(result, data);
      if (result.message) {
        toast(result.message, {
          progressClassName: "toast-progress-bar",
          theme: "dark",
        });
      }
    } catch (error) {
      console.log("Error logging in", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex flex-col justify-center items-center bg-black">
        <div className="border-neutral-400 border p-10">
          <div className="w-80 mb-12 ">
            <h1 className="text-neutral-400 mb-2 font-semibold text-xl">
              Sign up
            </h1>
            <p className="text-neutral-400">
              Already have an account?{" "}
              <a
                href=""
                className="text-white"
                onClick={() => navigate("/login")}
              >
                Login here
              </a>
              .
            </p>
          </div>
          <div className="flex flex-col w-80">
            <label htmlFor="email" className="text-neutral-400">
              <i className="fa-solid fa-envelope"></i> Email address
            </label>
            <input
              type="email"
              id="email"
              className="px-3 py-1.5 mt-3 bg-black text-white border-neutral-700 border"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
            />

            <label htmlFor="name" className="mt-4 text-neutral-400">
              <i className="fa-solid fa-signature"></i> Name
            </label>
            <input
              type="text"
              id="name"
              className="px-3 py-1.5 mt-3 bg-black text-white border-neutral-700 border"
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex. John Doe"
            />

            <label htmlFor="password" className="mt-4 text-neutral-400">
              <i className="fa-solid fa-lock"></i> Password
            </label>
            <input
              type="password"
              id="password"
              className="px-3 py-1.5 mt-3 bg-black text-white border-neutral-700 border"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-white text-neutral-700 font-semibold px-3 py-1.5 mt-10 cursor-pointer border-neutral-700 border"
              onClick={handleSignup}
            >
              Register
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
