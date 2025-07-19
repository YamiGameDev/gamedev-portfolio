// src/components/dashboard/StudentDashboard.jsx
import React, { useState } from 'react';
import { useProgress } from '../../contexts/ProgressContext';
import { courses } from '../../data/courses/index.js';
import CoursePage from '../courses/CoursePage.jsx';

const StudentDashboard = ({ onBack }) => {
  const [viewingCourse, setViewingCourse] = useState(null);
  const { getCourseProgress, getCompletedLessons, getCompletedAssignments } = useProgress();

  if (viewingCourse) {
    return <CoursePage course={viewingCourse} onBack={() => setViewingCourse(null)} />;
  }

  const overallProgress = Math.round(
    courses.reduce((sum, course) => sum + getCourseProgress(course.id), 0) / courses.length
  );

  const upcomingAssignments = courses.flatMap(course => 
    course.assignments
      .map((assignment, index) => ({
        ...assignment,
        courseTitle: course.title,
        courseId: course.id,
        assignmentIndex: index,
        isCompleted: getCompletedAssignments(course.id).includes(index)
      }))
      .filter(assignment => !assignment.isCompleted)
  ).slice(0, 5);

  const recentActivity = [
    { type: 'lesson', action: 'Completed "Unity Basics"', course: 'Game Development', time: '2 hours ago' },
    { type: 'assignment', action: 'Submitted "Pong Clone"', course: 'Game Development', time: '1 day ago' },
    { type: 'lesson', action: 'Started "Rigging Setup"', course: '3D Animation', time: '2 days ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button 
              onClick={onBack}
              className="mb-4 flex items-center text-sm hover:underline"
              style={{color: '#FF9B17'}}
            >
              ← Back to Portfolio
            </button>
            <h1 className="text-3xl font-bold" style={{color: '#222831'}}>
              Student Dashboard
            </h1>
            <p style={{color: '#666'}}>Welcome back! Here's your learning progress</p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold mb-2" style={{color: '#FF9B17'}}>
                {overallProgress}%
              </div>
              <div className="text-sm" style={{color: '#666'}}>Overall Progress</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold mb-2" style={{color: '#FFD63A'}}>
                {courses.length}
              </div>
              <div className="text-sm" style={{color: '#666'}}>Enrolled Courses</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold mb-2" style={{color: '#222831'}}>
                {courses.reduce((sum, course) => sum + getCompletedLessons(course.id).length, 0)}
              </div>
              <div className="text-sm" style={{color: '#666'}}>Lessons Completed</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold mb-2" style={{color: '#FF9B17'}}>
                {upcomingAssignments.length}
              </div>
              <div className="text-sm" style={{color: '#666'}}>Pending Tasks</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* My Courses */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold mb-6" style={{color: '#222831'}}>
                  📚 My Courses
                </h2>
                <div className="space-y-4">
                  {courses.map(course => {
                    const progress = getCourseProgress(course.id);
                    const completedLessons = getCompletedLessons(course.id).length;
                    
                    return (
                      <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold" style={{color: '#222831'}}>{course.title}</h3>
                            <p className="text-sm" style={{color: '#666'}}>{course.code}</p>
                          </div>
                          <span 
                            className="px-2 py-1 rounded text-xs font-medium"
                            style={{
                              backgroundColor: course.level === 'Beginner' ? '#E0F2FE' : course.level === 'Intermediate' ? '#FEF3C7' : '#F3E8FF',
                              color: course.level === 'Beginner' ? '#0369A1' : course.level === 'Intermediate' ? '#92400E' : '#6B21A8'
                            }}
                          >
                            {course.level}
                          </span>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${progress}%`,
                                background: 'linear-gradient(to right, #FF9B17, #FFD63A)'
                              }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm" style={{color: '#666'}}>
                            {completedLessons}/4 lessons • {course.duration}
                          </span>
                          <button 
                            onClick={() => setViewingCourse(course)}
                            className="px-4 py-2 rounded-lg font-medium text-white text-sm"
                            style={{background: 'linear-gradient(to right, #FF9B17, #FFD63A)'}}
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Assignments */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-bold mb-4" style={{color: '#222831'}}>
                  📝 Upcoming Assignments
                </h3>
                <div className="space-y-3">
                  {upcomingAssignments.map((assignment, index) => (
                    <div key={index} className="border-l-4 pl-3" style={{borderColor: '#FFD63A'}}>
                      <h4 className="font-medium text-sm" style={{color: '#222831'}}>
                        {assignment.title}
                      </h4>
                      <p className="text-xs" style={{color: '#666'}}>
                        {assignment.courseTitle} • Due {assignment.due}
                      </p>
                    </div>
                  ))}
                  {upcomingAssignments.length === 0 && (
                    <p className="text-sm text-center" style={{color: '#666'}}>
                      🎉 All caught up!
                    </p>
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-bold mb-4" style={{color: '#222831'}}>
                  🕒 Recent Activity
                </h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <span className="mr-2 mt-1">
                        {activity.type === 'lesson' ? '📖' : '📝'}
                      </span>
                      <div>
                        <p className="text-sm" style={{color: '#222831'}}>
                          {activity.action}
                        </p>
                        <p className="text-xs" style={{color: '#666'}}>
                          {activity.course} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-bold mb-4" style={{color: '#222831'}}>
                  ⚡ Quick Actions
                </h3>
                <div className="space-y-2">
                  <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 text-sm">
                    📊 View All Progress
                  </button>
                  <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 text-sm">
                    📅 Assignment Calendar
                  </button>
                  <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 text-sm">
                    💬 Discussion Forums
                  </button>
                  <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 text-sm">
                    📞 Contact Instructor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;