// src/contexts/ProgressContext.jsx
import React, { createContext, useContext, useState } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  // Mock initial progress data
  const [progressData, setProgressData] = useState({
    courses: {
      1: { progress: 78, completedLessons: [1, 2], completedAssignments: [1] },
      2: { progress: 45, completedLessons: [1, 2], completedAssignments: [1, 2] },
      3: { progress: 92, completedLessons: [1, 2, 3], completedAssignments: [1, 2, 3] },
      4: { progress: 25, completedLessons: [1], completedAssignments: [] }
    },
    lessons: {
      1: [1, 2], // Course 1 completed lessons
      2: [1, 2], // Course 2 completed lessons  
      3: [1, 2, 3], // Course 3 completed lessons
      4: [1] // Course 4 completed lessons
    }
  });

  const toggleLessonComplete = (courseId, lessonId) => {
    setProgressData(prev => {
      const courseKey = courseId.toString();
      const currentLessons = prev.lessons[courseKey] || [];
      const newLessons = currentLessons.includes(lessonId) 
        ? currentLessons.filter(id => id !== lessonId)
        : [...currentLessons, lessonId];
      
      // Calculate new progress percentage based on actual lesson count
      const getLessonCount = (courseId) => {
        switch(courseId) {
          case 1: return 40; // Game Development
          case 4: return 8;  // ETECH
          default: return 4; // Other courses
        }
      };
      
      const totalLessons = getLessonCount(courseId);
      const newProgress = Math.round((newLessons.length / totalLessons) * 100);
      
      return {
        ...prev,
        lessons: {
          ...prev.lessons,
          [courseKey]: newLessons
        },
        courses: {
          ...prev.courses,
          [courseKey]: {
            ...prev.courses[courseKey],
            progress: newProgress,
            completedLessons: newLessons
          }
        }
      };
    });
  };

  const markAssignmentComplete = (courseId, assignmentIndex) => {
    setProgressData(prev => {
      const courseKey = courseId.toString();
      const currentAssignments = prev.courses[courseKey]?.completedAssignments || [];
      const newAssignments = currentAssignments.includes(assignmentIndex)
        ? currentAssignments.filter(idx => idx !== assignmentIndex)
        : [...currentAssignments, assignmentIndex];

      return {
        ...prev,
        courses: {
          ...prev.courses,
          [courseKey]: {
            ...prev.courses[courseKey],
            completedAssignments: newAssignments
          }
        }
      };
    });
  };

  const getCourseProgress = (courseId) => {
    const courseKey = courseId.toString();
    return progressData.courses[courseKey]?.progress || 0;
  };

  const getCompletedLessons = (courseId) => {
    const courseKey = courseId.toString();
    return progressData.lessons[courseKey] || [];
  };

  const getCompletedAssignments = (courseId) => {
    const courseKey = courseId.toString();
    return progressData.courses[courseKey]?.completedAssignments || [];
  };

  const value = {
    progressData,
    toggleLessonComplete,
    markAssignmentComplete,
    getCourseProgress,
    getCompletedLessons,
    getCompletedAssignments
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};