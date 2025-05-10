import { useState } from "react";
import { useLoginMutation } from "../app/services/services";
import { useNavigate } from "react-router";

function Login() {
  const [login, { data, isError, isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (isError) return <h1>Error</h1>;

  if (isLoading) return <h1>Loading...</h1>;

  const handleLogin = async () => {
    try {
      const loginCredentials = {
        email: email,
        password: password,
      };

      const result = await login(loginCredentials).unwrap();
      console.log(result, data);
      if (result.message) navigate("/");
    } catch (error) {
      console.log("Error logging in", error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-black">
        <div className="border-neutral-700 border p-10">
          <div className="w-80 mb-12 ">
            <h1 className="text-neutral-400 mb-2 font-semibold text-xl">
              Sign in to your account
            </h1>
            <p className="text-neutral-400">
              Don't have an account?{" "}
              <a
                href=""
                className="text-white"
                onClick={() => navigate("/register")}
              >
                Register here
              </a>
              .
            </p>
          </div>
          <div className="flex flex-col w-80">
            <label htmlFor="email" className="text-white">
              <i className="fa-solid fa-envelope"></i> Email address
            </label>
            <input
              type="email"
              id="email"
              className="px-3 py-1.5 mt-3 bg-black text-white border-neutral-700 border"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
            />
            <label htmlFor="password" className="mt-4 text-white">
              <i className="fa-solid fa-lock"></i> Password
            </label>
            <input
              type="password"
              id="password"
              className="px-3 py-1.5 mt-3 bg-black text-white border-neutral-700 border"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-white border-neutral-700 border font-semibold px-3 py-1.5 mt-10 cursor-pointer text-neutral-700"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
