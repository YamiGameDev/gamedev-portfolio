// src/components/sections/Courses.jsx
import React, { useState } from 'react';
import { courses } from '../../data/courses/index.js';
import { useProgress } from '../../contexts/ProgressContext';
import { useAuth } from '../../contexts/AuthContext';
import CoursePage from '../courses/CoursePage.jsx';
import StudentDashboard from '../dashboard/StudentDashboard.jsx';

const Courses = ({ onAuthRequired }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [viewingCourse, setViewingCourse] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const { getCourseProgress } = useProgress();
  const { isAuthenticated, user } = useAuth();

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'in-progress': return '#F59E0B';
      case 'upcoming': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '⏳';
      case 'upcoming': return '📅';
      default: return '📅';
    }
  };

  const handleViewCourse = (course) => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }
    setViewingCourse(course);
  };

  const handleShowDashboard = () => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }
    setShowDashboard(true);
  };

  const handleBackToCourses = () => {
    setViewingCourse(null);
    setShowDashboard(false);
  };

  // If showing dashboard, render StudentDashboard
  if (showDashboard) {
    return <StudentDashboard onBack={handleBackToCourses} />;
  }

  // If viewing a specific course, show the course page
  if (viewingCourse) {
    return <CoursePage course={viewingCourse} onBack={handleBackToCourses} />;
  }

  return (
    <section id="courses" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-4 mb-6">
              <h2 className="text-4xl md:text-5xl font-bold" style={{color: '#222831'}}>
                My <span className="text-transparent bg-clip-text" style={{backgroundImage: 'linear-gradient(to right, #FF9B17, #FFD63A)', WebkitBackgroundClip: 'text'}}>Courses</span>
              </h2>
              <button 
                onClick={handleShowDashboard}
                className="px-4 py-2 rounded-lg font-medium text-white"
                style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)'}}
              >
                📊 Dashboard
              </button>
            </div>
            <p className="text-lg max-w-2xl mx-auto" style={{color: '#666'}}>
              Comprehensive curriculum designed to build industry-ready skills in game development and animation
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                style={{
                  borderColor: selectedCourse === course.id ? '#FF9B17' : '#f3f4f6'
                }}
              >
                {/* Course Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1" style={{color: '#222831'}}>
                      {course.title}
                    </h3>
                    <p className="text-sm" style={{color: '#666'}}>{course.code}</p>
                  </div>
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: course.level === 'Beginner' ? '#E0F2FE' : course.level === 'Intermediate' ? '#FEF3C7' : '#F3E8FF',
                      color: course.level === 'Beginner' ? '#0369A1' : course.level === 'Intermediate' ? '#92400E' : '#6B21A8'
                    }}
                  >
                    {course.level}
                  </span>
                </div>

                {/* Course Info */}
                <p className="mb-4" style={{color: '#666'}}>{course.description}</p>
                
                <div className="flex justify-between text-sm mb-4" style={{color: '#666'}}>
                  <span>📅 {course.duration}</span>
                  <span>👥 {course.enrolled} students</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span style={{color: '#222831'}}>Progress</span>
                    <span style={{color: '#666'}}>{getCourseProgress(course.id)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${getCourseProgress(course.id)}%`,
                        background: 'linear-gradient(to right, #FF9B17, #FFD63A)'
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleViewCourse(course)}
                    className="flex-1 py-2 px-4 rounded-lg font-medium text-white transition-all duration-300"
                    style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)'}}
                  >
                    {isAuthenticated ? 'View Course' : '🔒 Login to Access'}
                  </button>
                  <button 
                    onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
                    className="px-4 py-2 border-2 rounded-lg font-medium transition-all duration-300"
                    style={{borderColor: '#FFD63A', color: '#FFD63A'}}
                    onMouseEnter={(e) => {e.target.style.backgroundColor = '#FFD63A'; e.target.style.color = '#222831'}}
                    onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#FFD63A'}}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Course Details */}
          {selectedCourse && (
            <div className="bg-gray-50 rounded-xl p-8 animate-fadeIn">
              {courses.filter(course => course.id === selectedCourse).map(course => (
                <div key={course.id} className="grid lg:grid-cols-2 gap-8">
                  {/* Syllabus */}
                  <div>
                    <h4 className="text-xl font-bold mb-4" style={{color: '#222831'}}>
                      📚 Course Syllabus
                    </h4>
                    <div className="space-y-3">
                      {course.syllabus.map((topic, index) => (
                        <div key={index} className="flex items-center p-3 bg-white rounded-lg">
                          <span 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3"
                            style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)'}}
                          >
                            {index + 1}
                          </span>
                          <span style={{color: '#222831'}}>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Assignments */}
                  <div>
                    <h4 className="text-xl font-bold mb-4" style={{color: '#222831'}}>
                      📝 Assignments & Projects
                    </h4>
                    <div className="space-y-3">
                      {course.assignments.map((assignment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div className="flex items-center">
                            <span className="mr-3 text-lg">{getStatusIcon(assignment.status)}</span>
                            <div>
                              <p className="font-medium" style={{color: '#222831'}}>{assignment.title}</p>
                              <p className="text-sm" style={{color: '#666'}}>Due: {assignment.due}</p>
                            </div>
                          </div>
                          <span 
                            className="px-2 py-1 rounded text-xs font-medium"
                            style={{color: getStatusColor(assignment.status)}}
                          >
                            {assignment.status.replace('-', ' ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Courses;