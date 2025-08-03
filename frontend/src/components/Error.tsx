import React from "react";
import { motion } from "framer-motion";
import {
  Keyboard,
  Zap,
  Trophy,
  BarChart3,
  Users,
  Timer,
  ArrowRight,
  CheckCircle,
  Target,
} from "lucide-react";

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast Tests",
      description:
        "Quick typing tests that adapt to your skill level with real-time feedback",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Detailed Analytics",
      description:
        "Track your WPM, accuracy, and improvement over time with comprehensive stats",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Achievements System",
      description:
        "Unlock badges and compete on leaderboards to stay motivated",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multiplayer Races",
      description:
        "Challenge friends or join public typing races with real-time competition",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Custom Difficulty",
      description:
        "Choose from programming code, literature, or custom text challenges",
    },
    {
      icon: <Timer className="w-6 h-6" />,
      title: "Practice Sessions",
      description: "Structured practice with focused exercises for weak points",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Typists" },
    { number: "2M+", label: "Tests Completed" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "120+", label: "Average WPM" },
  ];

  return (
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
            <a
              href="/login"
              className="text-slate-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Get Started
            </a>
          </motion.div>
        </div>
      </nav>

      <section className="relative px-6 pt-20 pb-32">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Master Your
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {" "}
                Typing Speed
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your typing skills with personalized tests, real-time
              analytics, and competitive challenges
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/register"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-2"
              >
                <span>Start Typing Test</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </a>

              <a
                href="/login"
                className="border-2 border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
              >
                Sign In
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-20 left-10 animate-bounce">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full blur-xl"></div>
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse">
          <div className="w-24 h-24 bg-purple-500/20 rounded-full blur-2xl"></div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-slate-700">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and insights you
              need to become a typing master
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:bg-slate-800/70"
              >
                <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-24 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Get started in three simple steps and watch your typing skills
              soar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Create Account",
                description: "Sign up for free and set your typing goals",
                icon: <Users className="w-8 h-8" />,
              },
              {
                step: "02",
                title: "Take Tests",
                description:
                  "Practice with various text types and difficulty levels",
                icon: <Keyboard className="w-8 h-8" />,
              },
              {
                step: "03",
                title: "Track Progress",
                description: "Monitor your improvement with detailed analytics",
                icon: <BarChart3 className="w-8 h-8" />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="text-white">{item.icon}</div>
                </div>
                <div className="text-sm font-bold text-blue-400 mb-2">
                  STEP {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-12 border border-blue-500/30"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Type Faster?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join thousands of users who have already improved their typing
              speed by an average of 40 WPM
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/register"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </a>

              <div className="flex items-center space-x-2 text-slate-400">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>No credit card required</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default LandingPage;
