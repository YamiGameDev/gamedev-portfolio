// src/components/sections/Portfolio.jsx
import React, { useState, useMemo, memo } from 'react';
import { FadeInUp, ScaleIn, FloatingCard } from '../animations/AnimatedComponents';

const ProjectCard = memo(({ project, index }) => (
  <FadeInUp delay={index * 100}>
    <FloatingCard className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-4 right-4">
          <span 
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              project.status === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {project.status === 'completed' ? 'Completed' : 'In Progress'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2" style={{color: '#222831'}}>
          {project.title}
        </h3>
        <p className="mb-4" style={{color: '#666'}}>
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, techIndex) => (
            <span 
              key={techIndex}
              className="px-2 py-1 bg-gray-100 rounded text-xs font-medium transition-all duration-300 hover:scale-105"
              style={{color: '#222831'}}
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-2">
          <button 
            className="flex-1 py-2 px-4 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)'}}
          >
            View Project
          </button>
          <button 
            className="px-4 py-2 border-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            style={{borderColor: '#FFD63A', color: '#FFD63A'}}
            onMouseEnter={(e) => {e.target.style.backgroundColor = '#FFD63A'; e.target.style.color = '#222831'}}
            onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#FFD63A'}}
          >
            Code
          </button>
        </div>
      </div>
    </FloatingCard>
  </FadeInUp>
));

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "Space Adventure Game",
      category: "game",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop",
      description: "3D space exploration game built with Unity",
      tech: ["Unity", "C#", "Blender"],
      status: "completed"
    },
    {
      id: 2,
      title: "Character Animation Reel",
      category: "animation",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&h=300&fit=crop",
      description: "Character animation showcase using motion capture",
      tech: ["Maya", "Motion Capture", "Rigging"],
      status: "completed"
    },
    {
      id: 3,
      title: "Interactive Portfolio Site",
      category: "web",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop",
      description: "React-based portfolio with interactive elements",
      tech: ["React", "Tailwind", "Three.js"],
      status: "in-progress"
    },
    {
      id: 4,
      title: "2D Platformer Game",
      category: "game",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&h=300&fit=crop",
      description: "Retro-style 2D platformer with pixel art",
      tech: ["Unity", "C#", "Pixel Art"],
      status: "completed"
    },
    {
      id: 5,
      title: "VFX Animation",
      category: "animation",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop",
      description: "Particle effects and visual effects showcase",
      tech: ["After Effects", "Blender", "Houdini"],
      status: "completed"
    },
    {
      id: 6,
      title: "Game Analytics Dashboard",
      category: "web",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
      description: "Data visualization for game metrics",
      tech: ["React", "D3.js", "Node.js"],
      status: "in-progress"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'game', label: 'Games' },
    { id: 'animation', label: 'Animation' },
    { id: 'web', label: 'Web Dev' }
  ];

  const filteredProjects = useMemo(() => {
    return activeFilter === 'all' 
      ? projects 
      : projects.filter(project => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{color: '#222831'}}>
                My <span className="text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(to right, #FF9B17, #FFD63A)', WebkitBackgroundClip: 'text'}}>Portfolio</span>
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{color: '#666'}}>
                A collection of projects showcasing my skills in game development, animation, and web technologies
              </p>
            </div>
          </FadeInUp>

          {/* Filter Buttons */}
          <ScaleIn delay={200}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeFilter === filter.id 
                      ? 'text-white shadow-lg scale-105' 
                      : 'bg-gray-100 hover:shadow-md'
                  }`}
                  style={{
                    background: activeFilter === filter.id 
                      ? 'linear-gradient(to right, #FF9B17, #FFD63A)' 
                      : '#f3f4f6',
                    color: activeFilter === filter.id ? 'white' : '#222831'
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </ScaleIn>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;