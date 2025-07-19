// src/components/courses/CoursePage.jsx
import React, { useState } from 'react';
import { useProgress } from '../../contexts/ProgressContext';
import { getLessonsByCourseId } from '../../data/lessons/index';
import AssignmentSubmission from '../assignments/AssignmentSubmission';

// Weekly Lessons Component for Game Development
const WeeklyLessons = ({ lessons, completedLessons, toggleLessonCompleteHandler }) => {
  const [expandedWeeks, setExpandedWeeks] = useState([1, 2]); // First 2 weeks expanded by default
  
  const toggleWeek = (weekNumber) => {
    setExpandedWeeks(prev => 
      prev.includes(weekNumber) 
        ? prev.filter(w => w !== weekNumber)
        : [...prev, weekNumber]
    );
  };

  const weekNumbers = [...new Set(lessons.map(lesson => lesson.week))].sort((a, b) => a - b);

  return (
    <div className="space-y-4">
      {weekNumbers.map(weekNumber => {
        const weekLessons = lessons.filter(lesson => lesson.week === weekNumber);
        const completedCount = weekLessons.filter(lesson => completedLessons.includes(lesson.id)).length;
        const isExpanded = expandedWeeks.includes(weekNumber);
        
        return (
          <div key={weekNumber} className="border rounded-lg">
            <button
              onClick={() => toggleWeek(weekNumber)}
              className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold" style={{color: '#222831'}}>
                    Week {weekNumber}
                  </h4>
                  <p className="text-sm" style={{color: '#666'}}>
                    {completedCount}/{weekLessons.length} lessons completed
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(completedCount / weekLessons.length) * 100}%`,
                        background: 'linear-gradient(to right, #FF9B17, #FFD63A)'
                      }}
                    ></div>
                  </div>
                  <span className="text-gray-500">
                    {isExpanded ? '▼' : '▶'}
                  </span>
                </div>
              </div>
            </button>
            
            {isExpanded && (
              <div className="border-t p-4 space-y-3">
                {weekLessons.map((lesson) => (
                  <div key={lesson.id} className="border rounded-lg p-3 hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleLessonCompleteHandler(lesson.id)}
                          className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            completedLessons.includes(lesson.id) ? 'bg-green-500 border-green-500' : 'border-gray-300'
                          }`}
                        >
                          {completedLessons.includes(lesson.id) && <span className="text-white text-xs">✓</span>}
                        </button>
                        <div>
                          <h5 className="font-medium text-sm" style={{color: '#222831'}}>{lesson.title}</h5>
                          <div className="flex gap-3 text-xs" style={{color: '#666'}}>
                            <span>⏱️ {lesson.duration}</span>
                            <span>📚 {lesson.type}</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        className="px-3 py-1 rounded text-xs font-medium"
                        style={{
                          background: completedLessons.includes(lesson.id) ? '#e5e7eb' : 'linear-gradient(to right, #FF9B17, #FFD63A)',
                          color: completedLessons.includes(lesson.id) ? '#666' : 'white'
                        }}
                      >
                        {completedLessons.includes(lesson.id) ? 'Done' : 'Start'}
                      </button>
                    </div>
                    
                    {lesson.resources && lesson.resources.length > 0 && (
                      <div className="mt-2 pt-2 border-t">
                        <div className="flex flex-wrap gap-1">
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
            )}
          </div>
        );
      })}
    </div>
  );
};

// Quarterly Lessons Component for ETECH
const QuarterlyLessons = ({ lessons, completedLessons, toggleLessonCompleteHandler }) => {
  return (
    <div className="space-y-6">
      {/* First Quarter */}
      <div>
        <h4 className="text-lg font-semibold mb-4 text-blue-600">First Quarter</h4>
        <div className="space-y-4">
          {lessons.filter(lesson => lesson.quarter === "First Quarter").map((lesson) => (
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
                      <span>📝 {lesson.type}</span>
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
              {lesson.resources && lesson.resources.length > 0 && (
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

      {/* 2nd Quarter */}
      <div>
        <h4 className="text-lg font-semibold mb-4 text-orange-600">2nd Quarter</h4>
        <div className="space-y-4">
          {lessons.filter(lesson => lesson.quarter === "2nd Quarter").map((lesson) => (
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
                      <span>💻 {lesson.type}</span>
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
              {lesson.resources && lesson.resources.length > 0 && (
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


    </div>
  );
};

// Default Lessons Component
const DefaultLessons = ({ lessons, completedLessons, toggleLessonCompleteHandler }) => {
  // Add fallback for empty lessons
  if (!lessons || lessons.length === 0) {
    return (
      <div className="text-center py-8">
        <p style={{color: '#666'}}>No lessons available for this course yet.</p>
      </div>
    );
  }

  return (
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
          {lesson.resources && lesson.resources.length > 0 && (
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
  );
};

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

  // Add error handling
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p style={{color: '#666'}}>Course not found.</p>
            <button 
              onClick={onBack}
              className="mt-4 px-4 py-2 rounded-lg text-white"
              style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)'}}
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  const completedLessons = getCompletedLessons(course.id) || [];
  const completedAssignments = getCompletedAssignments(course.id) || [];
  const lessons = getLessonsByCourseId(course.id) || [];

  // Debug logging
  console.log('Course:', course);
  console.log('Course ID:', course.id);
  console.log('Lessons found:', lessons);
  console.log('Completed lessons:', completedLessons);

  const handleSubmission = (submissionData) => {
    console.log('Assignment submitted:', submissionData);
    const assignmentIndex = course.assignments?.findIndex(a => a.title === submissionData.assignmentTitle);
    if (assignmentIndex !== -1) {
      markAssignmentComplete(course.id, assignmentIndex);
    }
  };

  const toggleLessonCompleteHandler = (lessonId) => {
    toggleLessonComplete(course.id, lessonId);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'lessons', label: 'Lessons', icon: '🎓' },
    { id: 'assignments', label: 'Assignments', icon: '📝' },
    { id: 'resources', label: 'Resources', icon: '📚' }
  ];

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
                      {course.description}
                    </p>
                  </div>

                  {/* Course Details Section */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column - Course Information */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold" style={{color: '#222831'}}>Course Information</h4>
                      
                      {/* Instructor */}
                      {course.instructor && (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-blue-500 mr-3">👨‍🏫</span>
                          <div>
                            <span className="font-medium" style={{color: '#222831'}}>Instructor: </span>
                            <span style={{color: '#666'}}>{String(course.instructor)}</span>
                          </div>
                        </div>
                      )}

                      {/* Schedule */}
                      {course.schedule && (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-green-500 mr-3">📅</span>
                          <div>
                            <span className="font-medium" style={{color: '#222831'}}>Schedule: </span>
                            <span style={{color: '#666'}}>{String(course.schedule)}</span>
                          </div>
                        </div>
                      )}

                      {/* Credits */}
                      {course.credits && (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-purple-500 mr-3">🎓</span>
                          <div>
                            <span className="font-medium" style={{color: '#222831'}}>Credits: </span>
                            <span style={{color: '#666'}}>{String(course.credits)}</span>
                          </div>
                        </div>
                      )}

                      {/* Hours */}
                      {course.hours && (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-orange-500 mr-3">⏰</span>
                          <div>
                            <span className="font-medium" style={{color: '#222831'}}>Hours: </span>
                            <span style={{color: '#666'}}>{String(course.hours)}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column - Technical Requirements */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold" style={{color: '#222831'}}>Technical Requirements</h4>
                      
                      {/* Software */}
                      {course.software && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center mb-2">
                            <span className="text-red-500 mr-3">💻</span>
                            <span className="font-medium" style={{color: '#222831'}}>Software: </span>
                          </div>
                          <div className="ml-8">
                            {typeof course.software === 'string' ? (
                              <span style={{color: '#666'}}>{course.software}</span>
                            ) : Array.isArray(course.software) ? (
                              <div className="space-y-1">
                                {course.software.map((software, idx) => (
                                  <div key={idx} style={{color: '#666'}}>• {software}</div>
                                ))}
                              </div>
                            ) : (
                              <span style={{color: '#666'}}>{String(course.software)}</span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Prerequisites */}
                      {course.prerequisites && course.prerequisites.length > 0 && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center mb-2">
                            <span className="text-yellow-500 mr-3">📋</span>
                            <span className="font-medium" style={{color: '#222831'}}>Prerequisites: </span>
                          </div>
                          <div className="ml-8 space-y-1">
                            {course.prerequisites.map((prereq, idx) => (
                              <div key={idx} style={{color: '#666'}}>• {prereq}</div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Course Level & Difficulty */}
                      {course.level && (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-indigo-500 mr-3">📊</span>
                          <div>
                            <span className="font-medium" style={{color: '#222831'}}>Level: </span>
                            <span style={{color: '#666'}}>{String(course.level)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* What You'll Learn Section */}
                  {course.syllabus && course.syllabus.length > 0 && (
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
                  )}

                  {/* Learning Objectives */}
                  {course.objectives && course.objectives.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold mb-3" style={{color: '#222831'}}>Learning Objectives</h4>
                      <div className="space-y-2">
                        {course.objectives.map((objective, index) => (
                          <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                            <span className="text-blue-500 mr-3 mt-1">🎯</span>
                            <span style={{color: '#222831'}}>{objective}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Lessons Tab */}
              {activeTab === 'lessons' && (
                <div>
                  <h3 className="text-xl font-bold mb-6" style={{color: '#222831'}}>Course Lessons</h3>
                  
                  {course.id === 1 ? (
                    <WeeklyLessons lessons={lessons} completedLessons={completedLessons} toggleLessonCompleteHandler={toggleLessonCompleteHandler} />
                  ) : course.id === 4 ? (
                    <QuarterlyLessons lessons={lessons} completedLessons={completedLessons} toggleLessonCompleteHandler={toggleLessonCompleteHandler} />
                  ) : (
                    <DefaultLessons lessons={lessons} completedLessons={completedLessons} toggleLessonCompleteHandler={toggleLessonCompleteHandler} />
                  )}
                </div>
              )}

              {/* Assignments Tab */}
              {activeTab === 'assignments' && (
                <div>
                  <h3 className="text-xl font-bold mb-6" style={{color: '#222831'}}>Assignments</h3>
                  {course.assignments && course.assignments.length > 0 ? (
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
                  ) : (
                    <div className="text-center py-8">
                      <p style={{color: '#666'}}>No assignments available for this course yet.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Resources Tab */}
              {activeTab === 'resources' && (
                <div>
                  <h3 className="text-xl font-bold mb-6" style={{color: '#222831'}}>Course Resources</h3>
                  {course.resources ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Reading Materials */}
                      {course.resources.reading && course.resources.reading.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold" style={{color: '#222831'}}>📚 Reading Materials</h4>
                          <div className="space-y-2">
                            {course.resources.reading.map((item, idx) => (
                              <a key={idx} href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                📄 {item}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Tools & Assets */}
                      {course.resources.tools && course.resources.tools.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold" style={{color: '#222831'}}>🛠️ Tools & Assets</h4>
                          <div className="space-y-2">
                            {course.resources.tools.map((item, idx) => (
                              <a key={idx} href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                🔗 {item}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Videos */}
                      {course.resources.videos && course.resources.videos.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold" style={{color: '#222831'}}>🎥 Video Resources</h4>
                          <div className="space-y-2">
                            {course.resources.videos.map((item, idx) => (
                              <a key={idx} href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                🎬 {item}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Links */}
                      {course.resources.links && course.resources.links.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold" style={{color: '#222831'}}>🌐 External Links</h4>
                          <div className="space-y-2">
                            {course.resources.links.map((item, idx) => (
                              <a key={idx} href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                🔗 {item}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    // Default resources for courses without specific resource data
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold" style={{color: '#222831'}}>📚 Reading Materials</h4>
                        <div className="space-y-2">
                          {course.id === 1 ? (
                            // Game Development resources
                            <>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                📄 Unity Documentation
                              </a>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                📄 C# Programming Guide
                              </a>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                📄 Game Design Principles
                              </a>
                            </>
                          ) : course.id === 2 ? (
                            // Web Development resources
                            <>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                📄 HTML5 & CSS3 Guide
                              </a>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                📄 JavaScript ES6+ Documentation
                              </a>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                📄 React.js Official Docs
                              </a>
                            </>
                          ) : course.id === 3 ? (
                            // Mobile App Development resources
                            <>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                📄 React Native Documentation
                              </a>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                📄 Flutter Development Guide
                              </a>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                📄 Mobile UI/UX Best Practices
                              </a>
                            </>
                          ) : course.id === 4 ? (
                            // ETECH resources
                            <>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                📄 ICT Fundamentals
                              </a>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                📄 Digital Citizenship Guide
                              </a>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                📄 Computer Hardware Basics
                              </a>
                            </>
                          ) : (
                            // Default resources
                            <>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                📄 Course Handbook
                              </a>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                📄 Study Guide
                              </a>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                📄 Reference Materials
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold" style={{color: '#222831'}}>🛠️ Tools & Assets</h4>
                        <div className="space-y-2">
                          {course.id === 1 ? (
                            // Game Development tools
                            <>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                🔗 Unity Hub Download
                              </a>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                🔗 Free Asset Packs
                              </a>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                🔗 Code Templates
                              </a>
                            </>
                          ) : course.id === 2 ? (
                            // Web Development tools
                            <>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                🔗 VS Code Download
                              </a>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                🔗 GitHub Student Pack
                              </a>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                🔗 Web Dev Tools
                              </a>
                            </>
                          ) : course.id === 3 ? (
                            // Mobile App Development tools
                            <>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                🔗 Android Studio
                              </a>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                🔗 Xcode (iOS)
                              </a>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                🔗 Figma Design Tool
                              </a>
                            </>
                          ) : course.id === 4 ? (
                            // ETECH tools
                            <>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                🔗 Microsoft Office Suite
                              </a>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                🔗 Google Workspace
                              </a>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                🔗 Online Learning Platforms
                              </a>
                            </>
                          ) : (
                            // Default tools
                            <>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                🔗 Course Software
                              </a>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                🔗 Online Resources
                              </a>
                              <a href="#" className="block p-3 bg-gray-50 rounded hover:bg-gray-100" style={{color: '#222831'}}>
                                🔗 Practice Platforms
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
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