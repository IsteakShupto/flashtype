import React from "react";
import { Keyboard } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="px-6 py-12 border-t border-slate-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Keyboard className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold text-white">FlashType</span>
          </div>

          <div className="flex items-center space-x-8">
            <a
              href="/login"
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              Register
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-700 text-center text-slate-500">
          <p>&copy; 2025 FlashType. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
