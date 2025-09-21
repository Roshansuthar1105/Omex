import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaComment, 
  FaThumbsUp, 
  FaThumbsDown, 
  FaStar, 
  FaPaperPlane, 
  FaCheck,
  FaEnvelope,
  FaUser,
  FaBug,
  FaLightbulb,
  FaHeart,
  FaShieldAlt
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const Feedback = () => {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: null,
    category: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Handle rating selection
  const handleRatingSelect = (rating) => {
    setFormData({
      ...formData,
      rating: rating,
    });
    if (errors.rating) {
      setErrors({
        ...errors,
        rating: "",
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Name is optional, but if provided, validate it's not empty
    if (formData.name.trim() && formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email is optional, but if provided, validate format
    if (formData.email.trim() && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.rating) {
      newErrors.rating = "Please select a rating";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate form submission (replace with your actual form handling)
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast.success("Feedback submitted successfully!");
      }, 2000);
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-black" : "bg-gray-50"
        }`}
      >
        <Loader fullscreen size="xl" color="purple" text="Loading Feedback..." />
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const categories = [
    { value: "bug", label: "Bug Report", icon: FaBug, color: "red" },
    { value: "feature", label: "Feature Request", icon: FaLightbulb, color: "yellow" },
    { value: "improvement", label: "Improvement", icon: FaStar, color: "blue" },
    { value: "general", label: "General Feedback", icon: FaComment, color: "green" },
    { value: "other", label: "Other", icon: FaHeart, color: "purple" },
  ];

  const getRatingStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <motion.button
        key={star}
        type="button"
        onClick={() => handleRatingSelect(star)}
        className={`p-2 rounded-lg transition-all duration-200 ${
          formData.rating >= star
            ? "text-yellow-400 bg-yellow-100/20"
            : isDark
            ? "text-gray-400 hover:text-yellow-300 hover:bg-gray-700/50"
            : "text-gray-300 hover:text-yellow-400 hover:bg-gray-100/50"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaStar className="text-3xl" />
      </motion.button>
    ));
  };

  return (
    <motion.div
      className={`min-h-screen w-full ${
        isDark
          ? "bg-gradient-to-br from-black via-gray-900 to-black text-white"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
      } relative overflow-hidden`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Enhanced Modernized Background */}
      <div className="absolute inset-0">
        {/* Animated gradient overlay */}
        <motion.div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"
              : "bg-gradient-to-br from-blue-100/30 via-purple-100/30 to-pink-100/30"
          }`}
          animate={{
            background: isDark
              ? [
                  "linear-gradient(to bottom right, rgba(30, 58, 138, 0.2), rgba(88, 28, 135, 0.2), rgba(157, 23, 77, 0.2))",
                  "linear-gradient(to bottom right, rgba(88, 28, 135, 0.2), rgba(157, 23, 77, 0.2), rgba(30, 58, 138, 0.2))",
                  "linear-gradient(to bottom right, rgba(157, 23, 77, 0.2), rgba(30, 58, 138, 0.2), rgba(88, 28, 135, 0.2))",
                  "linear-gradient(to bottom right, rgba(30, 58, 138, 0.2), rgba(88, 28, 135, 0.2), rgba(157, 23, 77, 0.2))",
                ]
              : [
                  "linear-gradient(to bottom right, rgba(219, 234, 254, 0.3), rgba(243, 232, 255, 0.3), rgba(252, 231, 243, 0.3))",
                  "linear-gradient(to bottom right, rgba(243, 232, 255, 0.3), rgba(252, 231, 243, 0.3), rgba(219, 234, 254, 0.3))",
                  "linear-gradient(to bottom right, rgba(252, 231, 243, 0.3), rgba(219, 234, 254, 0.3), rgba(243, 232, 255, 0.3))",
                  "linear-gradient(to bottom right, rgba(219, 234, 254, 0.3), rgba(243, 232, 255, 0.3), rgba(252, 231, 243, 0.3))",
                ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 border border-blue-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-40 right-32 w-24 h-24 border border-purple-500 rounded-lg"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-32 left-40 w-40 h-40 border border-pink-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Modern floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              isDark
                ? i % 3 === 0
                  ? "bg-blue-400"
                  : i % 3 === 1
                  ? "bg-purple-400"
                  : "bg-pink-400"
                : i % 3 === 0
                ? "bg-blue-500"
                : i % 3 === 1
                ? "bg-purple-500"
                : "bg-pink-500"
            } opacity-40`}
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1200),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 800),
            }}
            animate={{
              y: [
                null,
                Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 800),
              ],
              x: [
                null,
                Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1200),
              ],
            }}
            transition={{
              duration: Math.random() * 15 + 25,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Modernized Header */}
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <motion.div
            className="flex justify-center mb-8"
            variants={floatingVariants}
            animate="animate"
          >
            <motion.div
              className={`relative p-6 rounded-2xl backdrop-blur-2xl ${
                isDark
                  ? "bg-gray-900/40 border border-gray-700/30 shadow-2xl shadow-purple-500/10"
                  : "bg-white/60 border border-white/60 shadow-2xl shadow-purple-500/20"
              }`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20" />
              <FaComment className="text-5xl text-purple-500 relative z-10" />
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaHeart className="w-3 h-3 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Share Your Feedback
            </motion.h1>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          <motion.p
            className={`max-w-3xl mx-auto text-lg leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your feedback is invaluable to us! Help us improve OMEX by sharing your
            thoughts, suggestions, and experiences. We read every piece of feedback
            and use it to make our platform better for everyone.
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Enhanced Feedback Form */}
          <motion.div
            className={`rounded-3xl p-8 backdrop-blur-2xl ${
              isDark
                ? "bg-gray-900/40 border border-gray-700/30 shadow-2xl shadow-purple-500/10"
                : "bg-white/60 border border-white/60 shadow-2xl shadow-purple-500/20"
            } relative overflow-hidden`}
            whileHover={{ scale: 1.005, y: -3 }}
            transition={{ duration: 0.3 }}
            variants={itemVariants}
          >
            {/* Animated background pattern */}
            <motion.div
              className="absolute top-0 right-0 w-80 h-80 -mr-32 -mt-32 opacity-5"
              animate={{ rotate: -360 }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="url(#feedbackGrad)"
                  d="M45.3,-51.2C58.3,-42.3,68.5,-27.2,73.8,-9.5C79.1,8.1,79.4,28.3,69.9,41.8C60.4,55.3,41.1,62.1,21.8,69.2C2.6,76.3,-16.6,83.7,-30.1,77.8C-43.6,71.9,-51.5,52.7,-59.3,34.9C-67.1,17.1,-74.9,0.7,-73.1,-15.2C-71.3,-31.1,-60,-46.4,-45.7,-55.3C-31.4,-64.2,-14.1,-66.7,1.3,-68.2C16.7,-69.7,32.3,-60.1,45.3,-51.2Z"
                  transform="translate(100 100)"
                />
                <defs>
                  <linearGradient
                    id="feedbackGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    className="text-center py-16"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="flex justify-center mb-8"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <motion.div
                        className={`p-6 rounded-3xl backdrop-blur-sm ${
                          isDark
                            ? "bg-green-900/50 border border-green-400/30 shadow-xl shadow-green-500/20"
                            : "bg-green-100/80 border border-green-400/40 shadow-xl shadow-green-500/30"
                        }`}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      >
                        <FaCheck className="text-green-500 text-4xl" />
                      </motion.div>
                    </motion.div>
                    <motion.h2
                      className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      Thank You for Your Feedback!
                    </motion.h2>
                    <motion.p
                      className={`max-w-md mx-auto mb-8 text-lg ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      We've received your feedback and truly appreciate you taking
                      the time to share your thoughts with us. Your input helps us
                      make OMEX better for everyone.
                    </motion.p>
                    <motion.button
                      onClick={() => setIsSubmitted(false)}
                      className={`backdrop-blur-sm bg-gradient-to-r ${
                        isDark
                          ? "from-purple-600/80 to-pink-600/80 hover:from-purple-500/90 hover:to-pink-500/90"
                          : "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      } text-white font-semibold py-4 px-10 rounded-2xl transition-all duration-200 border border-purple-400/30 shadow-xl`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Submit Another Feedback
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="flex items-center mb-10"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <motion.div
                        className={`p-4 rounded-2xl backdrop-blur-sm ${
                          isDark
                            ? "bg-purple-500/20 border border-purple-400/30"
                            : "bg-purple-100/80 border border-purple-400/40"
                        } mr-4`}
                        variants={pulseVariants}
                        animate="animate"
                      >
                        <FaComment className="w-7 h-7 text-purple-500" />
                      </motion.div>
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          Tell Us What You Think
                        </h2>
                        <p
                          className={`mt-2 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Help us improve by sharing your experience and suggestions.
                        </p>
                      </div>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Name and Email */}
                      <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        {/* Name */}
                        <motion.div
                          className="group"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <label
                            htmlFor="name"
                            className="block mb-3 font-semibold text-lg flex items-center"
                          >
                            <FaUser className="mr-2 text-purple-500" />
                            Your Name (Optional)
                          </label>
                          <motion.input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-6 py-4 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
                              isDark
                                ? "bg-gray-800/30 border-gray-600/50 text-white placeholder-gray-400 focus:bg-gray-800/50 focus:border-purple-400/70"
                                : "bg-white/50 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-purple-500/70"
                            } border-2 focus:outline-none focus:ring-4 focus:ring-purple-500/20 text-lg group-hover:border-purple-400/50`}
                            placeholder="Enter your name (optional)"
                            whileFocus={{ scale: 1.02 }}
                          />
                          <AnimatePresence>
                            {errors.name && (
                              <motion.p
                                className="mt-2 text-red-500 text-sm font-medium"
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{
                                  opacity: 1,
                                  height: "auto",
                                  y: 0,
                                }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                              >
                                {errors.name}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        {/* Email */}
                        <motion.div
                          className="group"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <label
                            htmlFor="email"
                            className="block mb-3 font-semibold text-lg flex items-center"
                          >
                            <FaEnvelope className="mr-2 text-purple-500" />
                            Your Email (Optional)
                          </label>
                          <motion.input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-6 py-4 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
                              isDark
                                ? "bg-gray-800/30 border-gray-600/50 text-white placeholder-gray-400 focus:bg-gray-800/50 focus:border-purple-400/70"
                                : "bg-white/50 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-purple-500/70"
                            } border-2 focus:outline-none focus:ring-4 focus:ring-purple-500/20 text-lg group-hover:border-purple-400/50`}
                            placeholder="your@email.com (optional)"
                            whileFocus={{ scale: 1.02 }}
                          />
                          <AnimatePresence>
                            {errors.email && (
                              <motion.p
                                className="mt-2 text-red-500 text-sm font-medium"
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{
                                  opacity: 1,
                                  height: "auto",
                                  y: 0,
                                }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                              >
                                {errors.email}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </motion.div>

                      {/* Category */}
                      <motion.div
                        className="group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <label className="block mb-3 font-semibold text-lg flex items-center">
                          <FaShieldAlt className="mr-2 text-purple-500" />
                          Category
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {categories.map((category) => {
                            const IconComponent = category.icon;
                            return (
                              <motion.button
                                key={category.value}
                                type="button"
                                onClick={() => handleChange({
                                  target: { name: "category", value: category.value }
                                })}
                                className={`p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 border-2 text-left ${
                                  formData.category === category.value
                                    ? isDark
                                      ? "bg-purple-500/20 border-purple-400/70 text-white"
                                      : "bg-purple-100/80 border-purple-500/70 text-purple-900"
                                    : isDark
                                    ? "bg-gray-800/30 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:border-purple-400/50"
                                    : "bg-white/50 border-gray-300/50 text-gray-700 hover:bg-purple-50/80 hover:border-purple-400/50"
                                }`}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-center mb-2">
                                  <IconComponent className={`text-xl mr-3 text-${category.color}-500`} />
                                  <span className="font-semibold">{category.label}</span>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                        <AnimatePresence>
                          {errors.category && (
                            <motion.p
                              className="mt-2 text-red-500 text-sm font-medium"
                              initial={{ opacity: 0, height: 0, y: -10 }}
                              animate={{ opacity: 1, height: "auto", y: 0 }}
                              exit={{ opacity: 0, height: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                            >
                              {errors.category}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Message */}
                      <motion.div
                        className="group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <label
                          htmlFor="message"
                          className="block mb-3 font-semibold text-lg flex items-center"
                        >
                          <FaComment className="mr-2 text-purple-500" />
                          Detailed Message
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <motion.textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="6"
                          className={`w-full px-6 py-4 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
                            isDark
                              ? "bg-gray-800/30 border-gray-600/50 text-white placeholder-gray-400 focus:bg-gray-800/50 focus:border-purple-400/70"
                              : "bg-white/50 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-purple-500/70"
                          } border-2 focus:outline-none focus:ring-4 focus:ring-purple-500/20 text-lg resize-none group-hover:border-purple-400/50`}
                          placeholder="Please provide detailed feedback about your experience, suggestions for improvement, or any issues you encountered..."
                          whileHover={{ scale: 1.01 }}
                          whileFocus={{ scale: 1.01 }}
                        />
                        <AnimatePresence>
                          {errors.message && (
                            <motion.p
                              className="mt-2 text-red-500 text-sm font-medium"
                              initial={{ opacity: 0, height: 0, y: -10 }}
                              animate={{ opacity: 1, height: "auto", y: 0 }}
                              exit={{ opacity: 0, height: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                            >
                              {errors.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Rating */}
                      <motion.div
                        className="group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <label className="block mb-3 font-semibold text-lg flex items-center">
                          <FaStar className="mr-2 text-purple-500" />
                          Overall Rating
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="flex space-x-2">
                          {getRatingStars()}
                        </div>
                        <AnimatePresence>
                          {errors.rating && (
                            <motion.p
                              className="mt-2 text-red-500 text-sm font-medium"
                              initial={{ opacity: 0, height: 0, y: -10 }}
                              animate={{ opacity: 1, height: "auto", y: 0 }}
                              exit={{ opacity: 0, height: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                            >
                              {errors.rating}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Submit Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="flex justify-center"
                      >
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          className={`group relative overflow-hidden px-12 py-5 rounded-2xl font-bold text-lg backdrop-blur-sm transition-all duration-300 ${
                            isSubmitting
                              ? "bg-gray-500/50 cursor-not-allowed border-gray-400/30"
                              : `bg-gradient-to-r ${
                                  isDark
                                    ? "from-purple-600/80 to-pink-600/80 hover:from-purple-500/90 hover:to-pink-500/90"
                                    : "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                } hover:shadow-2xl hover:shadow-purple-500/30`
                          } text-white border border-purple-400/30 shadow-xl min-w-[200px]`}
                          whileHover={
                            !isSubmitting ? { scale: 1.05, y: -3 } : {}
                          }
                          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                        >
                          {/* Button background animation */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                          />

                          <AnimatePresence mode="wait">
                            {isSubmitting ? (
                              <motion.div
                                className="flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <motion.svg
                                  className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </motion.svg>
                                <span>Submitting Feedback...</span>
                              </motion.div>
                            ) : (
                              <motion.div
                                className="flex items-center justify-center relative z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <motion.div
                                  animate={{ x: [0, 3, 0] }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                >
                                  <FaPaperPlane className="mr-3 text-xl" />
                                </motion.div>
                                <span>Submit Feedback</span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </motion.div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Floating decorative elements */}
        <motion.div
          className="fixed top-20 right-20 z-10 opacity-10"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className="w-24 h-24 border-2 border-purple-500 rounded-full" />
        </motion.div>

        <motion.div
          className="fixed bottom-40 left-20 z-10 opacity-10"
          animate={{
            rotate: -360,
            y: [0, -20, 0],
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className="w-16 h-16 border-2 border-pink-500 rounded-lg rotate-45" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Feedback;
