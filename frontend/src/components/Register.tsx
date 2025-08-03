import { useState } from "react";
import { motion } from "framer-motion";
import { useRegisterMutation } from "../app/services/services";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Keyboard,
  Eye,
  EyeOff,
} from "lucide-react";
import Footer from "./Footer";

function Register() {
  const [register, { data }] = useRegisterMutation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <nav className="relative z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Keyboard className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">FlashType</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <button
                onClick={() => navigate("/login")}
                className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
              >
                Sign In
              </button>
            </motion.div>
          </div>
        </nav>

        <div className="flex flex-col justify-center items-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Join FlashType
              </h1>
              <p className="text-slate-300 text-lg">
                Create your account and start improving your typing skills
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-2xl"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-white font-medium mb-3"
                  >
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-blue-400" />
                      <span>Email Address</span>
                    </div>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 bg-slate-900/50 text-white border border-slate-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder-slate-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-white font-medium mb-3"
                  >
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-blue-400" />
                      <span>Full Name</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ex. John Doe"
                    className="w-full px-4 py-3 bg-slate-900/50 text-white border border-slate-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder-slate-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-white font-medium mb-3"
                  >
                    <div className="flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-blue-400" />
                      <span>Password</span>
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Create a secure password"
                      className="w-full px-4 py-3 bg-slate-900/50 text-white border border-slate-600 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder-slate-400 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSignup}
                  disabled={isLoading}
                  className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </motion.button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-slate-800/50 text-slate-400">
                      Already have an account?
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/login")}
                  className="w-full border-2 border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:bg-slate-700/30"
                >
                  Sign In Instead
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center mt-6"
            >
              <p className="text-slate-400 text-sm">
                By creating an account, you agree to our terms of service
              </p>
            </motion.div>
          </motion.div>

          <div className="absolute top-20 left-10 animate-bounce">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full blur-xl"></div>
          </div>
          <div className="absolute bottom-20 right-10 animate-pulse">
            <div className="w-24 h-24 bg-purple-500/20 rounded-full blur-2xl"></div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Register;
