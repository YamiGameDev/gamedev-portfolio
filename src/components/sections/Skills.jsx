// src/components/sections/Skills.jsx
import React, { useState } from 'react';
import { FadeInUp, ScaleIn, FloatingCard } from '../animations/AnimatedComponents';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('technical');

  const skillCategories = {
    technical: [
      { name: "Unity", level: 90, icon: "🎮" },
      { name: "C#", level: 85, icon: "💻" },
      { name: "JavaScript", level: 80, icon: "🌐" },
      { name: "React", level: 75, icon: "⚛️" },
      { name: "Python", level: 70, icon: "🐍" },
      { name: "Node.js", level: 65, icon: "🟢" }
    ],
    creative: [
      { name: "Blender", level: 85, icon: "🎨" },
      { name: "Maya", level: 80, icon: "🎭" },
      { name: "Photoshop", level: 75, icon: "🖼️" },
      { name: "After Effects", level: 70, icon: "🎬" },
      { name: "UI/UX Design", level: 75, icon: "✨" },
      { name: "3D Modeling", level: 80, icon: "🗿" }
    ],
    tools: [
      { name: "Git/GitHub", level: 85, icon: "📚" },
      { name: "VS Code", level: 90, icon: "⚡" },
      { name: "Docker", level: 60, icon: "🐳" },
      { name: "Figma", level: 70, icon: "🎯" },
      { name: "Jira", level: 65, icon: "📋" },
      { name: "Slack", level: 95, icon: "💬" }
    ]
  };

  const categories = [
    { id: 'technical', label: 'Technical', icon: '💻' },
    { id: 'creative', label: 'Creative', icon: '🎨' },
    { id: 'tools', label: 'Tools', icon: '🛠️' }
  ];

  return (
    <section id="skills" className="py-20" style={{background: 'linear-gradient(to bottom right, #f8f9fa, #fff5e6)'}}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{color: '#222831'}}>
                My <span className="text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(to right, #FF9B17, #FFD63A)', WebkitBackgroundClip: 'text'}}>Skills</span>
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{color: '#666'}}>
                A comprehensive overview of my technical abilities and creative expertise
              </p>
            </div>
          </FadeInUp>

          {/* Category Tabs */}
          <ScaleIn delay={200}>
            <div className="flex justify-center mb-12">
              <div className="bg-white rounded-full p-2 shadow-lg">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 mx-1 transform hover:scale-105 ${
                      activeCategory === category.id 
                        ? 'text-white shadow-md scale-105' 
                        : 'hover:bg-gray-50'
                    }`}
                    style={{
                      background: activeCategory === category.id 
                        ? 'linear-gradient(to right, #FF9B17, #FFD63A)' 
                        : 'transparent',
                      color: activeCategory === category.id ? 'white' : '#222831'
                    }}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </ScaleIn>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories[activeCategory].map((skill, index) => (
              <FadeInUp key={index} delay={index * 100}>
                <FloatingCard className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">{skill.icon}</span>
                    <h3 className="text-lg font-bold" style={{color: '#222831'}}>{skill.name}</h3>
                  </div>
                  
                  <div className="mb-2 flex justify-between">
                    <span className="text-sm" style={{color: '#666'}}>Proficiency</span>
                    <span className="text-sm font-medium" style={{color: '#222831'}}>{skill.level}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div 
                      className="h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${skill.level}%`,
                        background: 'linear-gradient(to right, #FF9B17, #FFD63A)'
                      }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{color: '#666'}}>
                      {skill.level >= 85 ? 'Expert' : skill.level >= 70 ? 'Advanced' : skill.level >= 60 ? 'Intermediate' : 'Beginner'}
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`text-sm transition-all duration-300 ${i < Math.floor(skill.level / 20) ? 'opacity-100 scale-110' : 'opacity-30'}`}
                          style={{color: '#FFD63A'}}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </FloatingCard>
              </FadeInUp>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-4" style={{color: '#222831'}}>
              Ready to work together?
            </h3>
            <p className="mb-6" style={{color: '#666'}}>
              Let's create something amazing with these skills combined
            </p>
            <button 
              className="text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)'}}
            >
              Start a Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;