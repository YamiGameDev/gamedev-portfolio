// src/components/courses/CoursePage.jsx
import React, { useState } from 'react';
import { useProgress } from '../../contexts/ProgressContext';
import AssignmentSubmission from '../assignments/AssignmentSubmission';

const CoursePage = ({ course, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [submissionModal, setSubmissionModal] = useState(null);
  const { 
    getCourseProgress, 
    getCompletedLessons, 
    getCompletedAssignments,
    toggleLessonComplete,
    markAssignmentComplete 
  } = useProgress();

  const completedLessons = getCompletedLessons(course.id);
  const completedAssignments = getCompletedAssignments(course.id);

  const handleSubmission = (submissionData) => {
    console.log('Assignment submitted:', submissionData);
    // Mark assignment as submitted/completed
    const assignmentIndex = course.assignments.findIndex(a => a.title === submissionData.assignmentTitle);
    if (assignmentIndex !== -1) {
      markAssignmentComplete(course.id, assignmentIndex);
    }
  };

  const lessons = [
    {
      id: 1,
      title: "Getting Started with Unity",
      duration: "45 min",
      type: "video",
      completed: true,
      resources: ["Unity Installation Guide", "Project Setup Checklist"]
    },
    {
      id: 2,
      title: "C# Basics for Game Development",
      duration: "60 min",
      type: "video",
      completed: true,
      resources: ["C# Cheat Sheet", "Practice Exercises"]
    },
    {
      id: 3,
      title: "Creating Your First 2D Scene",
      duration: "50 min",
      type: "hands-on",
      completed: false,
      resources: ["Scene Setup Guide", "Asset Pack"]
    },
    {
      id: 4,
      title: "Physics and Collision Detection",
      duration: "40 min",
      type: "video",
      completed: false,
      resources: ["Physics Examples", "Collision Scripts"]
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'lessons', label: 'Lessons', icon: '🎓' },
    { id: 'assignments', label: 'Assignments', icon: '📝' },
    { id: 'resources', label: 'Resources', icon: '📚' }
  ];

  const toggleLessonCompleteHandler = (lessonId) => {
    toggleLessonComplete(course.id, lessonId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <button 
              onClick={onBack}
              className="mb-4 flex items-center text-sm hover:underline"
              style={{color: '#FF9B17'}}
            >
              ← Back to Courses
            </button>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold mb-2" style={{color: '#222831'}}>
                  {course.title}
                </h1>
                <p className="text-lg mb-4" style={{color: '#666'}}>
                  {course.description}
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm" style={{color: '#666'}}>
                  <span>📅 {course.duration}</span>
                  <span>📊 {course.level}</span>
                  <span>👥 {course.enrolled} enrolled</span>
                  <span>🎯 {course.code}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold mb-4" style={{color: '#222831'}}>Course Progress</h3>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Completed</span>
                    <span>{getCourseProgress(course.id)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${getCourseProgress(course.id)}%`,
                        background: 'linear-gradient(to right, #FF9B17, #FFD63A)'
                      }}
                    ></div>
                  </div>
                </div>
                <button 
                  className="w-full mt-4 py-2 px-4 rounded-lg font-medium text-white"
                  style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)'}}
                >
                  Continue Learning
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="border-b">
              <nav className="flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-6 py-4 text-center font-medium transition-all ${
                      activeTab === tab.id ? 'border-b-2 text-white' : 'hover:bg-gray-50'
                    }`}
                    style={{
                      borderBottomColor: activeTab === tab.id ? '#FF9B17' : 'transparent',
                      background: activeTab === tab.id ? 'linear-gradient(to right, #FF9B17, #FFD63A)' : 'transparent',
                      color: activeTab === tab.id ? 'white' : '#222831'
                    }}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4" style={{color: '#222831'}}>Course Overview</h3>
                    <p style={{color: '#666'}}>
                      This comprehensive course will take you from beginner to confident game developer. 
                      You'll learn Unity fundamentals, C# programming, and build real projects.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-3" style={{color: '#222831'}}>What You'll Learn</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {course.syllabus.map((topic, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-green-500 mr-3">✓</span>
                          <span style={{color: '#222831'}}>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Lessons Tab */}
              {activeTab === 'lessons' && (
                <div>
                  <h3 className="text-xl font-bold mb-6" style={{color: '#222831'}}>Course Lessons</h3>
                  <div className="space-y-4">
                    {lessons.map((lesson) => (
                      <div key={lesson.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <button
                              onClick={() => toggleLessonCompleteHandler(lesson.id)}
                              className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                                completedLessons.includes(lesson.id) ? 'bg-green-500 border-green-500' : 'border-gray-300'
                              }`}
                            >
                              {completedLessons.includes(lesson.id) && <span className="text-white text-xs">✓</span>}
                            </button>
                            <div>
                              <h4 className="font-semibold" style={{color: '#222831'}}>{lesson.title}</h4>
                              <div className="flex gap-4 text-sm" style={{color: '#666'}}>
                                <span>⏱️ {lesson.duration}</span>
                                <span>📹 {lesson.type}</span>
                              </div>
                            </div>
                          </div>
                          <button 
                            className="px-4 py-2 rounded-lg font-medium"
                            style={{
                              background: completedLessons.includes(lesson.id) ? '#e5e7eb' : 'linear-gradient(to right, #FF9B17, #FFD63A)',
                              color: completedLessons.includes(lesson.id) ? '#666' : 'white'
                            }}
                          >
                            {completedLessons.includes(lesson.id) ? 'Completed' : 'Start Lesson'}
                          </button>
                        </div>
                        {lesson.resources.length > 0 && (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-sm font-medium mb-2" style={{color: '#222831'}}>Resources:</p>
                            <div className="flex flex-wrap gap-2">
                              {lesson.resources.map((resource, idx) => (
                                <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-xs" style={{color: '#666'}}>
                                  📎 {resource}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Assignments Tab */}
              {activeTab === 'assignments' && (
                <div>
                  <h3 className="text-xl font-bold mb-6" style={{color: '#222831'}}>Assignments</h3>
                  <div className="space-y-4">
                    {course.assignments.map((assignment, index) => {
                      const isCompleted = completedAssignments.includes(index);
                      return (
                        <div key={index} className="border rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-lg font-semibold" style={{color: '#222831'}}>{assignment.title}</h4>
                              <p className="text-sm" style={{color: '#666'}}>Due: {assignment.due}</p>
                            </div>
                            <span 
                              className="px-3 py-1 rounded-full text-sm font-medium"
                              style={{
                                backgroundColor: isCompleted ? '#dcfce7' : assignment.status === 'in-progress' ? '#fef3c7' : '#f3f4f6',
                                color: isCompleted ? '#166534' : assignment.status === 'in-progress' ? '#92400e' : '#666'
                              }}
                            >
                              {isCompleted ? 'submitted' : assignment.status.replace('-', ' ')}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              className="px-4 py-2 rounded-lg font-medium text-white"
                              style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)'}}
                            >
                              View Details
                            </button>
                            {!isCompleted && (
                              <button 
                                onClick={() => setSubmissionModal(assignment)}
                                className="px-4 py-2 border-2 rounded-lg font-medium" 
                                style={{borderColor: '#FFD63A', color: '#FFD63A'}}
                              >
                                Submit Work
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Resources Tab */}
              {activeTab === 'resources' && (
                <div>
                  <h3 className="text-xl font-bold mb-6" style={{color: '#222831'}}>Course Resources</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold" style={{color: '#222831'}}>📚 Reading Materials</h4>
                      <div className="space-y-2">
                        {['Unity Documentation', 'C# Programming Guide', 'Game Design Principles'].map((item, idx) => (
                          <a key={idx} href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                            📄 {item}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold" style={{color: '#222831'}}>🛠️ Tools & Assets</h4>
                      <div className="space-y-2">
                        {['Unity Hub Download', 'Free Asset Packs', 'Code Templates'].map((item, idx) => (
                          <a key={idx} href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                            🔗 {item}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Assignment Submission Modal */}
      {submissionModal && (
        <AssignmentSubmission
          assignment={submissionModal}
          courseId={course.id}
          onClose={() => setSubmissionModal(null)}
          onSubmit={handleSubmission}
        />
      )}
    </div>
  );
};

export default CoursePage;