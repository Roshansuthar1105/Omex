import React from 'react';
import { FaUsers, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Team = () => {
  const { isDark } = useTheme();
  
  // Team member data
  const teamMembers = [
    {
      id: 1,
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      bio: 'Alex has over 15 years of experience in software development and AI. Before founding OMEX, he led engineering teams at several tech giants and holds multiple patents in machine learning applications.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      social: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      id: 2,
      name: 'Sophia Chen',
      role: 'CTO',
      bio: 'Sophia is an AI researcher with a PhD in Computer Science from Stanford. She specializes in natural language processing and has published numerous papers on code analysis and generation.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      social: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      id: 3,
      name: 'Marcus Williams',
      role: 'Lead Developer',
      bio: 'Marcus brings a decade of full-stack development experience to OMEX. He\'s passionate about creating intuitive developer tools and has contributed to several open-source projects.',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      social: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      id: 4,
      name: 'Priya Patel',
      role: 'AI Engineer',
      bio: 'Priya specializes in machine learning models for code analysis. She previously worked at a leading research lab and holds a Master\'s in AI from MIT.',
      image: 'https://randomuser.me/api/portraits/women/29.jpg',
      social: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com'
      }
    },
    {
      id: 5,
      name: 'David Kim',
      role: 'UX/UI Designer',
      bio: 'David is passionate about creating beautiful, intuitive interfaces. With a background in both design and development, he ensures OMEX is not only powerful but also a joy to use.',
      image: 'https://randomuser.me/api/portraits/men/11.jpg',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      id: 6,
      name: 'Emma Rodriguez',
      role: 'Product Manager',
      bio: 'Emma bridges the gap between technical capabilities and user needs. She has a knack for identifying developer pain points and turning them into elegant product solutions.',
      image: 'https://randomuser.me/api/portraits/women/17.jpg',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com'
      }
    }
  ];
  
  // Advisors data
  const advisors = [
    {
      id: 1,
      name: 'Dr. James Wilson',
      role: 'Technical Advisor',
      bio: 'Former CTO of a major tech company and professor of Computer Science, Dr. Wilson provides strategic guidance on our technical roadmap and AI capabilities.',
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
      social: {
        linkedin: 'https://linkedin.com'
      }
    },
    {
      id: 2,
      name: 'Sarah Thompson',
      role: 'Industry Advisor',
      bio: 'With 20+ years in the developer tools industry, Sarah helps OMEX navigate market trends and build partnerships with key players in the ecosystem.',
      image: 'https://randomuser.me/api/portraits/women/64.jpg',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com'
      }
    }
  ];
  
  // Team member card component
  const MemberCard = ({ member }) => (
    <div className={`rounded-lg overflow-hidden shadow-lg ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="relative pb-2/3">
        <img 
          src={member.image} 
          alt={member.name} 
          className="absolute h-full w-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
        <p className={`text-blue-400 font-medium mb-4`}>{member.role}</p>
        <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {member.bio}
        </p>
        <div className="flex space-x-4">
          {member.social.linkedin && (
            <a 
              href={member.social.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition duration-200`}
            >
              <FaLinkedin size={20} />
            </a>
          )}
          {member.social.github && (
            <a 
              href={member.social.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition duration-200`}
            >
              <FaGithub size={20} />
            </a>
          )}
          {member.social.twitter && (
            <a 
              href={member.social.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition duration-200`}
            >
              <FaTwitter size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
  
  return (
    <div className={`min-h-screen w-full ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FaUsers className="text-blue-400 text-4xl" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Meet Our Team</h1>
          <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            We're a passionate group of developers, designers, and AI specialists dedicated to creating tools that make coding more efficient and enjoyable.
          </p>
        </div>
        
        {/* Team Members Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Core Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
        
        {/* Advisors */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Advisors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {advisors.map(advisor => (
              <MemberCard key={advisor.id} member={advisor} />
            ))}
          </div>
        </div>
        
        {/* Join Us Section */}
        <div className={`max-w-4xl mx-auto p-8 rounded-lg text-center ${
          isDark ? 'bg-gray-900' : 'bg-white'
        } shadow-lg`}>
          <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
          <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            We're always looking for talented individuals who are passionate about developer tools and AI. Check out our open positions and join us in our mission to revolutionize coding.
          </p>
          <a 
            href="/careers" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
          >
            View Open Positions
          </a>
        </div>
      </div>
    </div>
  );
};

export default Team;
