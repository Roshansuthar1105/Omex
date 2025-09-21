import emailjs from "@emailjs/browser";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhone, FaClock, FaStar } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Loader from "../components/Loader";
import toast from 'react-hot-toast';

const Contact = () => {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);

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

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if business is currently open
  const checkBusinessHours = () => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute; // Convert to minutes for easier comparison
    
    // Business hours: Monday-Friday (1-5), 9:00 AM - 6:00 PM
    const openTime = 9 * 60; // 9:00 AM in minutes
    const closeTime = 18 * 60; // 6:00 PM in minutes
    
    // Check if it's a weekday (Monday-Friday) and within business hours
    const isWeekday = currentDay >= 1 && currentDay <= 5;
    const isWithinHours = currentTime >= openTime && currentTime < closeTime;
    
    return isWeekday && isWithinHours;
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
        toast.success("Message sent successfully!");

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
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

  // Check business hours on component mount and update every minute
  useEffect(() => {
    // Initial check
    setIsBusinessOpen(checkBusinessHours());
    
    // Set up interval to check every minute
    const interval = setInterval(() => {
      setIsBusinessOpen(checkBusinessHours());
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-black" : "bg-gray-50"
        }`}
      >
        <Loader fullscreen size="xl" color="purple" text="Contact Us ..." />
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
                  ? "bg-gray-900/40 border border-gray-700/30 shadow-2xl shadow-blue-500/10"
                  : "bg-white/60 border border-white/60 shadow-2xl shadow-blue-500/20"
              }`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" />
              <FaEnvelope className="text-5xl text-blue-500 relative z-10" />
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaStar className="w-3 h-3 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Let's Connect
            </motion.h1>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"
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
            Ready to start your next project or have questions about our
            services? We're here to help bring your ideas to life. Reach out and
            let's create something amazing together.
          </motion.p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
            {/* Enhanced Contact Information */}
            <motion.div className="xl:col-span-2" variants={itemVariants}>
              <motion.div
                className={`rounded-3xl p-8 backdrop-blur-2xl ${
                  isDark
                    ? "bg-gray-900/40 border border-gray-700/30 shadow-2xl shadow-purple-500/10"
                    : "bg-white/60 border border-white/60 shadow-2xl shadow-purple-500/20"
                } relative overflow-hidden h-full`}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Modern animated background pattern */}
                <motion.div
                  className="absolute top-0 right-0 w-40 h-40 -mr-16 -mt-16 opacity-10"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="url(#grad1)"
                      d="M45.3,-51.2C58.3,-42.3,68.5,-27.2,73.8,-9.5C79.1,8.1,79.4,28.3,69.9,41.8C60.4,55.3,41.1,62.1,21.8,69.2C2.6,76.3,-16.6,83.7,-30.1,77.8C-43.6,71.9,-51.5,52.7,-59.3,34.9C-67.1,17.1,-74.9,0.7,-73.1,-15.2C-71.3,-31.1,-60,-46.4,-45.7,-55.3C-31.4,-64.2,-14.1,-66.7,1.3,-68.2C16.7,-69.7,32.3,-60.1,45.3,-51.2Z"
                      transform="translate(100 100)"
                    />
                    <defs>
                      <linearGradient
                        id="grad1"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>

                <div className="relative z-10">
                  <motion.h2
                    className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Get In Touch
                  </motion.h2>

                  <div className="space-y-8">
                    {/* Email */}
                    <motion.div
                      className="group flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      whileHover={{ x: 8 }}
                    >
                      <motion.div
                        className={`p-4 rounded-2xl ${
                          isDark
                            ? "bg-blue-500/20 group-hover:bg-blue-500/30 border border-blue-400/30"
                            : "bg-blue-100/80 group-hover:bg-blue-200/80 border border-blue-300/50"
                        } mr-5 transition-all duration-300`}
                        variants={pulseVariants}
                        animate="animate"
                      >
                        <FaEnvelope className="text-blue-500 text-xl" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                        <motion.a
                          href="mailto:contact@omex.com"
                          className="text-blue-500 hover:text-blue-400 font-medium transition-colors duration-200"
                          whileHover={{ scale: 1.05 }}
                        >
                          contact@omex.com
                        </motion.a>
                        <p
                          className={`text-sm mt-1 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          We'll respond within 24 hours
                        </p>
                      </div>
                    </motion.div>

                    {/* Phone */}
                    <motion.div
                      className="group flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      whileHover={{ x: 8 }}
                    >
                      <motion.div
                        className={`p-4 rounded-2xl ${
                          isDark
                            ? "bg-green-500/20 group-hover:bg-green-500/30 border border-green-400/30"
                            : "bg-green-100/80 group-hover:bg-green-200/80 border border-green-300/50"
                        } mr-5 transition-all duration-300`}
                        variants={pulseVariants}
                        animate="animate"
                      >
                        <FaPhone className="text-green-500 text-xl" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                        <p className="text-green-500 font-medium">
                          +1 (555) 123-4567
                        </p>
                        <p
                          className={`text-sm mt-1 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Mon-Fri, 9AM-6PM PST
                        </p>
                      </div>
                    </motion.div>

                    {/* Address */}
                    <motion.div
                      className="group flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      whileHover={{ x: 8 }}
                    >
                      <motion.div
                        className={`p-4 rounded-2xl ${
                          isDark
                            ? "bg-red-500/20 group-hover:bg-red-500/30 border border-red-400/30"
                            : "bg-red-100/80 group-hover:bg-red-200/80 border border-red-300/50"
                        } mr-5 transition-all duration-300`}
                        variants={pulseVariants}
                        animate="animate"
                      >
                        <FaMapMarkerAlt className="text-red-500 text-xl" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
                        <motion.a
                          href="https://www.google.com/maps?q=123+Tech+Street,+San+Francisco,+CA+94015,+United+States"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`hover:text-red-500 transition-colors duration-200 ${
                            isDark ? "text-gray-300" : "text-gray-600"
                          }`}
                          whileHover={{ scale: 1.02 }}
                        >
                          <p>123 Tech Street</p>
                          <p>San Francisco, CA 94105</p>
                          <p>United States</p>
                        </motion.a>
                      </div>
                    </motion.div>
                  </div>

                  {/* Business Hours Card */}
                  <motion.div
                    className={`mt-10 p-6 rounded-2xl backdrop-blur-sm ${
                      isDark
                        ? "bg-gray-800/30 border border-gray-600/30"
                        : "bg-white/50 border border-white/60"
                    } group`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    whileHover={{ scale: 1.02, y: -3 }}
                  >
                    <div className="flex items-center mb-4">
                      <motion.div
                        className={`p-3 rounded-xl ${
                          isDark
                            ? "bg-purple-500/20 border border-purple-400/30"
                            : "bg-purple-100/80 border border-purple-300/50"
                        } mr-4`}
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <FaClock className="text-purple-500 text-lg" />
                      </motion.div>
                      <h3 className="font-semibold text-xl">Business Hours</h3>
                    </div>
                    <div
                      className={`space-y-2 ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="font-medium">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weekend</span>
                        <span className="text-red-500 font-medium">Closed</span>
                      </div>
                      <div
                        className={`text-sm pt-2 border-t ${
                          isDark ? "border-gray-600" : "border-gray-200"
                        }`}
                      >
                        <span className={isBusinessOpen ? "text-green-500" : "text-red-500"}>●</span> {isBusinessOpen ? "Currently Open" : "Currently Closed"}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Contact Form */}
            <motion.div className="xl:col-span-3" variants={itemVariants}>
              <motion.div
                className={`rounded-3xl p-8 backdrop-blur-2xl ${
                  isDark
                    ? "bg-gray-900/40 border border-gray-700/30 shadow-2xl shadow-blue-500/10"
                    : "bg-white/60 border border-white/60 shadow-2xl shadow-blue-500/20"
                } relative overflow-hidden h-full`}
                whileHover={{ scale: 1.005, y: -3 }}
                transition={{ duration: 0.3 }}
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
                      fill="url(#grad2)"
                      d="M45.3,-51.2C58.3,-42.3,68.5,-27.2,73.8,-9.5C79.1,8.1,79.4,28.3,69.9,41.8C60.4,55.3,41.1,62.1,21.8,69.2C2.6,76.3,-16.6,83.7,-30.1,77.8C-43.6,71.9,-51.5,52.7,-59.3,34.9C-67.1,17.1,-74.9,0.7,-73.1,-15.2C-71.3,-31.1,-60,-46.4,-45.7,-55.3C-31.4,-64.2,-14.1,-66.7,1.3,-68.2C16.7,-69.7,32.3,-60.1,45.3,-51.2Z"
                      transform="translate(100 100)"
                    />
                    <defs>
                      <linearGradient
                        id="grad2"
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
                          Message Sent Successfully!
                        </motion.h2>
                        <motion.p
                          className={`max-w-md mx-auto mb-8 text-lg ${
                            isDark ? "text-gray-300" : "text-gray-600"
                          }`}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                        >
                          Thank you for reaching out! We've received your
                          message and our team will get back to you within 24
                          hours.
                        </motion.p>
                        <motion.button
                          onClick={() => setIsSubmitted(false)}
                          className={`backdrop-blur-sm bg-gradient-to-r ${
                            isDark
                              ? "from-blue-600/80 to-purple-600/80 hover:from-blue-500/90 hover:to-purple-500/90"
                              : "from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          } text-white font-semibold py-4 px-10 rounded-2xl transition-all duration-200 border border-blue-400/30 shadow-xl`}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Send Another Message
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
                            <svg
                              className="w-7 h-7 text-purple-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                          </motion.div>
                          <div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              Send Us a Message
                            </h2>
                            <p
                              className={`mt-2 ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              We'd love to hear from you. Fill out the form
                              below.
                            </p>
                          </div>
                        </motion.div>

                        <form onSubmit={handleSubmit} className="space-y-8">
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
                                className="block mb-3 font-semibold text-lg"
                              >
                                Your Name
                                <span className="text-red-500 ml-1">*</span>
                              </label>
                              <motion.input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-6 py-4 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
                                  isDark
                                    ? "bg-gray-800/30 border-gray-600/50 text-white placeholder-gray-400 focus:bg-gray-800/50 focus:border-blue-400/70"
                                    : "bg-white/50 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-blue-500/70"
                                } border-2 focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-lg group-hover:border-blue-400/50`}
                                placeholder="Enter your full name"
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
                                className="block mb-3 font-semibold text-lg"
                              >
                                Your Email
                                <span className="text-red-500 ml-1">*</span>
                              </label>
                              <motion.input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-6 py-4 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
                                  isDark
                                    ? "bg-gray-800/30 border-gray-600/50 text-white placeholder-gray-400 focus:bg-gray-800/50 focus:border-blue-400/70"
                                    : "bg-white/50 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-blue-500/70"
                                } border-2 focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-lg group-hover:border-blue-400/50`}
                                placeholder="your@email.com"
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

                          {/* Subject */}
                          <motion.div
                            className="group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                          >
                            <label
                              htmlFor="subject"
                              className="block mb-3 font-semibold text-lg"
                            >
                              Subject
                              <span className="text-red-500 ml-1">*</span>
                            </label>
                            <motion.input
                              type="text"
                              id="subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              className={`w-full px-6 py-4 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
                                isDark
                                  ? "bg-gray-800/30 border-gray-600/50 text-white placeholder-gray-400 focus:bg-gray-800/50 focus:border-blue-400/70"
                                  : "bg-white/50 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-blue-500/70"
                              } border-2 focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-lg group-hover:border-blue-400/50`}
                              placeholder="What can we help you with?"
                              whileHover={{ scale: 1.02 }}
                              whileFocus={{ scale: 1.02 }}
                            />
                            <AnimatePresence>
                              {errors.subject && (
                                <motion.p
                                  className="mt-2 text-red-500 text-sm font-medium"
                                  initial={{ opacity: 0, height: 0, y: -10 }}
                                  animate={{ opacity: 1, height: "auto", y: 0 }}
                                  exit={{ opacity: 0, height: 0, y: -10 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {errors.subject}
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
                              className="block mb-3 font-semibold text-lg"
                            >
                              Message
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
                                  ? "bg-gray-800/30 border-gray-600/50 text-white placeholder-gray-400 focus:bg-gray-800/50 focus:border-blue-400/70"
                                  : "bg-white/50 border-gray-300/50 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-blue-500/70"
                              } border-2 focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-lg resize-none group-hover:border-blue-400/50`}
                              placeholder="Tell us more about your project or inquiry..."
                              whileHover={{ scale: 1.01 }}
                              whileFocus={{ scale: 1.01 }}
                            ></motion.textarea>
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

                          {/* Submit Button */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
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
                                        ? "from-blue-600/80 to-purple-600/80 hover:from-blue-500/90 hover:to-purple-500/90"
                                        : "from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                    } hover:shadow-2xl hover:shadow-blue-500/30`
                              } text-white border border-blue-400/30 shadow-xl min-w-[200px]`}
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
                                    <span>Sending Message...</span>
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
                                    <span>Send Message</span>
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
            </motion.div>
          </div>
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

export default Contact;