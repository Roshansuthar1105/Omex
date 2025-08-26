import React, { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import { useTheme } from '../context/ThemeContext';
import { FaStar } from 'react-icons/fa';

const testimonialsData = [
  {
    id: 1,
    text: "OMEX has completely transformed my coding workflow. The code optimization tool helped me improve performance by 40% on a critical project. Highly recommended!",
    name: "Michael Chen",
    position: "Senior Developer, TechCorp",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    id: 2,
    text: "The code generation feature is a game-changer. It saves me hours of work by creating boilerplate code and helping with complex algorithms. OMEX is now an essential part of my toolkit.",
    name: "Sarah Johnson",
    position: "Freelance Developer",
    image: "https://randomuser.me/api/portraits/portraits/women/44.jpg",
    rating: 5
  },
  {
    id: 3,
    text: "As a team lead, I've implemented OMEX across our development department. The consistency in code quality and the time saved on reviews has been invaluable. A must-have for any dev team.",
    name: "David Rodriguez",
    position: "Lead Developer, StartupX",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5
  },
  {
    id: 4,
    text: "The debugging assistant in OMEX is phenomenal! It helped me identify and fix complex issues in minutes that would have taken hours to debug manually. The AI suggestions are spot-on.",
    name: "Emily Watson",
    position: "Full Stack Developer, InnovateLab",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5
  },
  {
    id: 5,
    text: "OMEX's code review feature has elevated our entire team's coding standards. The automated suggestions and best practice recommendations have made our codebase more maintainable than ever.",
    name: "Alex Thompson",
    position: "Software Architect, CloudTech",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5
  },
  {
    id: 6,
    text: "The integration capabilities of OMEX with our existing IDE is seamless. It feels like a natural extension of my development environment. The productivity boost is incredible!",
    name: "Lisa Park",
    position: "Backend Developer, DataFlow Systems",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
    rating: 5
  }
];


const TestimonialCard = ({ text, name, position, image, rating }) => {
  const { isDark } = useTheme();
  
  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, index) => (
      <FaStar key={index} className="text-yellow-400" />
    ));
  };

  return (
    <div className={`flex-none w-72 sm:w-80 md:w-96 p-4 sm:p-6 md:p-8 h-auto min-h-[280px] sm:min-h-[300px] md:min-h-[320px] rounded-xl shadow-lg bg-gradient-to-br ${
      isDark 
        ? 'from-gray-800 to-gray-900 text-white border-gray-700' 
        : 'from-blue-50 to-indigo-50 text-gray-900 border-blue-100'
    } flex flex-col justify-between relative transition-all duration-300 transform hover:scale-105 hover:shadow-xl mx-2 sm:mx-3 border`}>
      
      {/* Top accent bar */}
      <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-12 bg-gradient-to-r ${
        isDark 
          ? 'from-blue-400 to-purple-400' 
          : 'from-blue-500 to-indigo-500'
      } rounded-t-lg shadow-sm`} />
      
      {/* Quote icon */}
      <div className={`absolute top-3 right-3 ${isDark ? 'text-gray-600' : 'text-blue-200'}`}>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
        </svg>
      </div>
      
      {/* Star rating */}
      <div className="flex mb-4">
        {renderStars(rating)}
      </div>
      
      {/* Testimonial text */}
      <p className={`mb-4 sm:mb-6 text-sm sm:text-base md:text-lg flex-grow leading-relaxed break-words ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      } font-medium pr-8`}>
        "{text}"
      </p>
      
      {/* User info */}
      <div className={`flex flex-col xs:flex-row items-center xs:items-center gap-3 xs:gap-4 mt-auto pt-4 border-t ${
        isDark ? 'border-gray-700' : 'border-blue-100'
      }`}>
        <img
          src={image}
          alt={name}
          className={`h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full border-4 ${
            isDark ? 'border-gray-600' : 'border-white'
          } flex-shrink-0 shadow-md object-cover`}
        />
        <div className="text-center sm:text-left">
          <h5 className={`font-bold text-sm sm:text-base md:text-lg ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {name}
          </h5>
          <p className={`text-xs sm:text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {position}
          </p>
        </div>
      </div>
    </div>
  );
};

TestimonialCard.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  isDark: PropTypes.bool.isRequired,
};

const Testimonials = forwardRef((props, ref) => {
  const { isDark } = useTheme();
  const [isPaused, setIsPaused] = useState(false);
  const duplicatedTestimonials = [...testimonialsData, ...testimonialsData, ...testimonialsData];


  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% / 3)); }
          }
          @media (max-width: 640px) {
            .scroll-container { animation-duration: 30s !important; }
          }
          @media (min-width: 641px) and (max-width: 1024px) {
            .scroll-container { animation-duration: 25s !important; }
          }
          @media (min-width: 1025px) {
            .scroll-container { animation-duration: 22s !important; }
          }
        `
      }} />

      <section ref={ref} className={`py-16 px-4 ${isDark ? "bg-gray-900" : "bg-gray-50"} relative overflow-hidden`}>
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-5"></div>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-5"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            }}
          ></div>
        </div>
        
        <div className="w-full max-w-full mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="flex justify-center mb-4">
              <div className={`p-4 rounded-full ${isDark ? "glass-dark" : "glass"}`}>
                <FaStar className="text-yellow-400 text-3xl" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:bg-gradient-to-r dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              What Developers Say
            </h2>
            <p className={`text-sm sm:text-base md:text-lg ${
              isDark ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto`}>
              Trusted by developers around the world to improve their coding workflow
            </p>
          </div>
          
          {/* Scrolling testimonials */}
          <div className="relative">
            {/* Left fade gradient */}
            <div className={`absolute -left-2 top-0 w-8 sm:w-16 md:w-24 h-full bg-gradient-to-r ${
              isDark ? 'from-gray-900' : 'from-gray-50'
            } to-transparent z-10 pointer-events-none`} />
            
            {/* Right fade gradient */}
            <div className={`absolute -right-2 top-0 w-8 sm:w-16 md:w-24 h-full bg-gradient-to-l ${
              isDark ? 'from-gray-900' : 'from-gray-50'
            } to-transparent z-10 pointer-events-none`} />
            
            <div className="overflow-hidden">
              <div
                className="flex scroll-container"
                style={{
                  animation: "scrollLeft 22s linear infinite",
                  animationPlayState: isPaused ? "paused" : "running",
                  width: "max-content"
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {duplicatedTestimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={`${testimonial.id}-${index}`}
                    {...testimonial}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default Testimonials;