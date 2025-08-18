import emailjs from "@emailjs/browser";
import { useState } from 'react';
import { FaCheck, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhone } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission with EmailJS integration
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
          import.meta.env.VITE_EMAILJS_USER_ID
        )
        .then(() => {
          setIsSubmitting(false);
          setIsSubmitted(true);
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
          setErrors({});
        })
        .catch(() => {
          setIsSubmitting(false);
          alert("Failed to send! Please try again.");
        });
    }
  };

  return (
    <div className={`min-h-screen w-full ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} relative overflow-hidden`}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-5"></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}></div>
      </div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-full ${isDark ? 'glass-dark' : 'glass'}`}>
              <FaEnvelope className="text-blue-400 text-4xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Have questions, feedback, or need assistance? We're here to help! Reach out to our team using the form below or through our contact information.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="md:col-span-1">
              <div className={`rounded-lg p-6 ${isDark ? 'glass-dark' : 'glass'} relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 -mr-10 -mt-10 opacity-10">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#3B82F6" d="M45.3,-51.2C58.3,-42.3,68.5,-27.2,73.8,-9.5C79.1,8.1,79.4,28.3,69.9,41.8C60.4,55.3,41.1,62.1,21.8,69.2C2.6,76.3,-16.6,83.7,-30.1,77.8C-43.6,71.9,-51.5,52.7,-59.3,34.9C-67.1,17.1,-74.9,0.7,-73.1,-15.2C-71.3,-31.1,-60,-46.4,-45.7,-55.3C-31.4,-64.2,-14.1,-66.7,1.3,-68.2C16.7,-69.7,32.3,-60.1,45.3,-51.2Z" transform="translate(100 100)" />
                  </svg>
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className={`p-3 rounded-full ${isDark ? 'bg-blue-500 bg-opacity-20' : 'bg-blue-100'} mr-4`}>
                        <FaEnvelope className="text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Email</h3>
                        <a href="mailto:contact@omex.com" className="text-blue-400 hover:underline">
                          contact@omex.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className={`p-3 rounded-full ${isDark ? 'bg-green-500 bg-opacity-20' : 'bg-green-100'} mr-4`}>
                        <FaPhone className="text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Phone</h3>
                        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                          +1 (555) 123-4567
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className={`p-3 rounded-full ${isDark ? 'bg-red-500 bg-opacity-20' : 'bg-red-100'} mr-4`}>
                        <FaMapMarkerAlt className="text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Office</h3>
                        <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                          123 Tech Street<br />
                          San Francisco, CA 94105<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 p-4 rounded-lg border border-opacity-20 border-blue-400">
                    <h3 className="font-medium mb-2 flex items-center">
                      <svg className="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      Business Hours
                    </h3>
                    <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                      Monday - Friday: 9:00 AM - 6:00 PM (PST)<br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className={`rounded-lg p-6 ${isDark ? 'glass-dark' : 'glass'} relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-64 h-64 -mr-20 -mt-20 opacity-5">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#8B5CF6" d="M45.3,-51.2C58.3,-42.3,68.5,-27.2,73.8,-9.5C79.1,8.1,79.4,28.3,69.9,41.8C60.4,55.3,41.1,62.1,21.8,69.2C2.6,76.3,-16.6,83.7,-30.1,77.8C-43.6,71.9,-51.5,52.7,-59.3,34.9C-67.1,17.1,-74.9,0.7,-73.1,-15.2C-71.3,-31.1,-60,-46.4,-45.7,-55.3C-31.4,-64.2,-14.1,-66.7,1.3,-68.2C16.7,-69.7,32.3,-60.1,45.3,-51.2Z" transform="translate(100 100)" />
                  </svg>
                </div>
                <div className="relative z-10">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="flex justify-center mb-4">
                        <div className={`p-4 rounded-full ${isDark ? 'bg-green-900 bg-opacity-50' : 'bg-green-100'}`}>
                          <FaCheck className="text-green-500 text-3xl" />
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
                      <p className={`max-w-md mx-auto mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Thank you for reaching out. We've received your message and will get back to you as soon as possible.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition duration-200 transform hover:scale-105"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center mb-6">
                        <div className={`p-3 rounded-full ${isDark ? 'bg-purple-500 bg-opacity-20' : 'bg-purple-100'} mr-3`}>
                          <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <h2 className="text-xl font-bold">Send Us a Message</h2>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          {/* Name */}
                          <div>
                            <label htmlFor="name" className="block mb-2 font-medium">
                              Your Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 rounded-md ${isDark
                                ? 'bg-gray-800 bg-opacity-50 border-gray-700 text-white'
                                : 'bg-white bg-opacity-70 border-gray-300 text-gray-900'
                                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                              placeholder="John Doe"
                            />
                            {errors.name && (
                              <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
                            )}
                          </div>
                          {/* Email */}
                          <div>
                            <label htmlFor="email" className="block mb-2 font-medium">
                              Your Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 rounded-md ${isDark
                                ? 'bg-gray-800 bg-opacity-50 border-gray-700 text-white'
                                : 'bg-white bg-opacity-70 border-gray-300 text-gray-900'
                                } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                              placeholder="john@example.com"
                            />
                            {errors.email && (
                              <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                            )}
                          </div>
                        </div>
                        {/* Subject */}
                        <div className="mb-6">
                          <label htmlFor="subject" className="block mb-2 font-medium">
                            Subject
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-md ${isDark
                              ? 'bg-gray-800 bg-opacity-50 border-gray-700 text-white'
                              : 'bg-white bg-opacity-70 border-gray-300 text-gray-900'
                              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="How can we help you?"
                          />
                          {errors.subject && (
                            <p className="mt-1 text-red-500 text-sm">{errors.subject}</p>
                          )}
                        </div>
                        {/* Message */}
                        <div className="mb-6">
                          <label htmlFor="message" className="block mb-2 font-medium">
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="5"
                            className={`w-full px-4 py-2 rounded-md ${isDark
                              ? 'bg-gray-800 bg-opacity-50 border-gray-700 text-white'
                              : 'bg-white bg-opacity-70 border-gray-300 text-gray-900'
                              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="Your message here..."
                          ></textarea>
                          {errors.message && (
                            <p className="mt-1 text-red-500 text-sm">{errors.message}</p>
                          )}
                        </div>
                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`flex items-center justify-center px-8 py-3 rounded-md font-medium ${isSubmitting
                            ? 'bg-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-105'
                            } text-white transition duration-200`}
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              <FaPaperPlane className="mr-2" />
                              Send Message
                            </>
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
