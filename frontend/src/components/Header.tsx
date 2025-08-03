import Logout from "./Logout";
import { motion } from "framer-motion";
import { Keyboard } from "lucide-react";

function Header() {
  return (
    <>
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
            <a
              href="/results"
              className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Results
            </a>
            <Logout />
          </motion.div>
        </div>
      </nav>
    </>
  );
}

export default Header;
