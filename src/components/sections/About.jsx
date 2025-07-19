// src/components/sections/About.jsx
import React from 'react';
import { FadeInUp, SlideInLeft, SlideInRight, CountUpNumber } from '../animations/AnimatedComponents';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const About = () => {
  const [statsRef, statsVisible] = useScrollAnimation();
  
  const stats = [
    { number: 3, label: "Years Learning", suffix: "+" },
    { number: 15, label: "Projects Completed", suffix: "+" },
    { number: 5, label: "Technologies", suffix: "+" },
    { number: 100, label: "Passion Driven", suffix: "%" }
  ];

  const skills = [
    { name: "Unity", level: 85 },
    { name: "C#", level: 80 },
    { name: "Blender", level: 75 },
    { name: "JavaScript", level: 70 },
    { name: "React", level: 65 }
  ];

  return (
    <section id="about" className="py-20" style={{background: 'linear-gradient(to bottom right, #f8f9fa, #fff5e6)'}}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{color: '#222831'}}>
                About <span className="text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(to right, #FF9B17, #FFD63A)', WebkitBackgroundClip: 'text'}}>Me</span>
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{color: '#666'}}>
                Passionate about bringing ideas to life through interactive experiences and stunning visuals
              </p>
            </div>
          </FadeInUp>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <SlideInLeft>
              <div>
                <h3 className="text-2xl font-bold mb-6" style={{color: '#222831'}}>
                  Creating Digital Worlds & Interactive Experiences
                </h3>
                
                <div className="space-y-4 mb-8" style={{color: '#666'}}>
                  <p>
                    I'm a dedicated game development and animation student with a passion for creating 
                    immersive digital experiences. My journey combines technical programming skills 
                    with creative design thinking.
                  </p>
                  <p>
                    From concept to execution, I enjoy every aspect of the development process - 
                    whether it's coding game mechanics, designing user interfaces, or crafting 
                    smooth animations that bring characters to life.
                  </p>
                  <p>
                    Currently expanding my skills in modern web technologies while maintaining 
                    a strong foundation in game engines and 3D animation tools.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8" ref={statsRef}>
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(to right, #FF9B17, #FFD63A)', WebkitBackgroundClip: 'text'}}>
                        <CountUpNumber end={stat.number} duration={2000} isVisible={statsVisible} suffix={stat.suffix} />
                      </div>
                      <div className="text-sm" style={{color: '#666'}}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                <button className="text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105" style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)'}}>
                  Download Resume
                </button>
              </div>
            </SlideInLeft>

            {/* Right Column - Skills */}
            <SlideInRight>
              <div>
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h4 className="text-xl font-bold mb-6" style={{color: '#222831'}}>Technical Skills</h4>
                  
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium" style={{color: '#222831'}}>{skill.name}</span>
                          <span style={{color: '#666'}}>{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ 
                              width: `${skill.level}%`,
                              background: 'linear-gradient(to right, #FF9B17, #FFD63A)'
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Additional Skills */}
                  <div className="mt-8">
                    <h5 className="text-lg font-semibold mb-4" style={{color: '#222831'}}>Also Experienced With</h5>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'Maya', 'Photoshop', 'Git', 'Node.js', 'MongoDB'].map((tech, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:transition-all duration-300 transform hover:scale-105"
                          style={{color: '#222831'}}
                          onMouseEnter={(e) => {e.target.style.background = 'linear-gradient(to right, #FFD63A, #FF9B17)'; e.target.style.color = 'white'}}
                          onMouseLeave={(e) => {e.target.style.background = '#f3f4f6'; e.target.style.color = '#222831'}}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SlideInRight>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;