// src/components/sections/home/HeroSection.jsx
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaDownload, FaArrowRight } from 'react-icons/fa';
import Typewriter from '../../ui/Typewriter';
import ubaidImg from '../../../assets/images/profile/ubaid-profile.jpg';
import ubaidWebp from '../../../assets/images/profile/ubaid-profile.webp';
import resumePdf from '../../../assets/docs/resume.pdf';

const HeroSection = () => {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">

      {/* Content */}
      <div className="relative z-10 w-full py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left - Text Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full mb-6 shadow-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Available for Work</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                Hi, I'm{' '}
                <span className="text-blue-600 dark:text-blue-400">
                  Ubaid Ullah
                </span>
              </h1>

              {/* Typewriter Animation */}
              <div className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 h-10">
                <Typewriter
                  strings={[
                    'Front-End Developer',
                    'React.js Specialist',
                    'UI/UX Enthusiast',
                    'Problem Solver'
                  ]}
                  typeSpeed={40}
                  backSpeed={50}
                  loop={true}
                  delay={2000}
                />
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 mb-8 text-lg">
                Crafting responsive, user-friendly web applications with modern technologies. 
                Passionate about creating clean code and exceptional user experiences.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  to="/projects"
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 flex items-center gap-2"
                >
                  View My Work <FaArrowRight />
                </Link>
                <a
                  href={resumePdf}
                  download="Ubaid-Ullah-Complete-Portfolio.pdf"
                  className="px-8 py-3 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-full font-medium transition-all duration-300 border border-gray-200 dark:border-gray-700 dark:hover:border-gray-600 shadow-sm flex items-center gap-2"
                >
                  <FaDownload />                   Download Portfolio PDF
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 justify-center lg:justify-start mt-8">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center justify-center transition-all duration-300 border border-gray-200 dark:border-gray-700 dark:hover:border-gray-600 shadow-sm">
                  <FaGithub size={20} />
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center justify-center transition-all duration-300 border border-gray-200 dark:border-gray-700 dark:hover:border-gray-600 shadow-sm">
                  <FaLinkedin size={20} />
                </a>
                <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center justify-center transition-all duration-300 border border-gray-200 dark:border-gray-700 dark:hover:border-gray-600 shadow-sm">
                  <FaTwitter size={20} />
                </a>
              </div>
            </div>

            {/* Right - Profile Image (FULL IMAGE - NOT ROUNDED) */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                {/* Profile Image - Full square/rectangle */}
                <div className="relative z-10">
                  <div className="w-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border-2 border-blue-500/20">
                    <picture>
                      {/* WebP for modern browsers */}
                      <source 
                        srcSet={ubaidWebp} 
                        type="image/webp" 
                      />
                      {/* Fallback JPG */}
                      <img
                        src={ubaidImg}
                        alt="Ubaid Ullah"
                        className="w-full h-auto object-cover"
                        style={{ maxHeight: '500px', objectFit: 'cover' }}
                      />
                    </picture>
                  </div>
                  {/* Status badge */}
                  <div className="absolute -bottom-3 right-4 bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-green-500/30">
                    Available
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-500 dark:bg-gray-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;