// src/components/progress/ProgressDashboard.jsx
import React from 'react';
import { useProgress } from '../../contexts/ProgressContext';
import { courses } from '../../data/courses/index.js';

const ProgressDashboard = () => {
  const { getCourseProgress, getCompletedLessons, getCompletedAssignments } = useProgress();

  const overallProgress = Math.round(
    courses.reduce((sum, course) => sum + getCourseProgress(course.id), 0) / courses.length
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-6" style={{color: '#222831'}}>
        📊 Learning Progress
      </h3>
      
      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold" style={{color: '#222831'}}>Overall Progress</span>
          <span style={{color: '#666'}}>{overallProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="h-4 rounded-full transition-all duration-500"
            style={{ 
              width: `${overallProgress}%`,
              background: 'linear-gradient(to right, #FF9B17, #FFD63A)'
            }}
          ></div>
        </div>
      </div>

      {/* Course Progress */}
      <div className="space-y-4">
        {courses.map(course => {
          const progress = getCourseProgress(course.id);
          const completedLessons = getCompletedLessons(course.id).length;
          const completedAssignments = getCompletedAssignments(course.id).length;
          
          return (
            <div key={course.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium" style={{color: '#222831'}}>{course.title}</h4>
                <span className="text-sm" style={{color: '#666'}}>{progress}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${progress}%`,
                    background: 'linear-gradient(to right, #FF9B17, #FFD63A)'
                  }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs" style={{color: '#666'}}>
                <span>📚 {completedLessons}/4 lessons</span>
                <span>📝 {completedAssignments}/{course.assignments.length} assignments</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold" style={{color: '#FF9B17'}}>
            {courses.reduce((sum, course) => sum + getCompletedLessons(course.id).length, 0)}
          </div>
          <div className="text-xs" style={{color: '#666'}}>Lessons Done</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold" style={{color: '#FFD63A'}}>
            {courses.reduce((sum, course) => sum + getCompletedAssignments(course.id).length, 0)}
          </div>
          <div className="text-xs" style={{color: '#666'}}>Assignments</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold" style={{color: '#222831'}}>
            {courses.filter(course => getCourseProgress(course.id) === 100).length}
          </div>
          <div className="text-xs" style={{color: '#666'}}>Completed</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;