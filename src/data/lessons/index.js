// src/data/lessons/index.js
import { gamedev101Lessons } from './gamedev101.js';

// ETECH lessons data
export const etechLessons = [
  {
    id: 1,
    title: "Introduction to Information and Communication Technology",
    duration: "60 min",
    type: "lecture",
    completed: true,
    quarter: "First Quarter",
    resources: ["ICT Overview Slides", "Digital Literacy Guide"]
  },
  {
    id: 2,
    title: "Ethics on the Internet",
    duration: "45 min",
    type: "discussion",
    completed: false,
    quarter: "First Quarter",
    resources: ["Digital Ethics Handbook", "Case Studies"]
  },
  {
    id: 3,
    title: "Advance Spreadsheet Skills",
    duration: "90 min",
    type: "hands-on",
    completed: false,
    quarter: "First Quarter",
    resources: ["Excel Templates", "Practice Exercises"]
  },
  {
    id: 4,
    title: "Advanced Word Processing Application",
    duration: "75 min",
    type: "hands-on",
    completed: false,
    quarter: "First Quarter",
    resources: ["Word Templates", "Formatting Guide"]
  },
  {
    id: 5,
    title: "Advanced Presentation Application",
    duration: "60 min",
    type: "hands-on",
    completed: false,
    quarter: "First Quarter",
    resources: ["PowerPoint Templates", "Design Principles"]
  },
  {
    id: 6,
    title: "Online Platforms as tools for ICT Content",
    duration: "50 min",
    type: "lecture",
    completed: false,
    quarter: "2nd Quarter",
    resources: ["Platform Comparison", "Content Strategy Guide"]
  },
  {
    id: 7,
    title: "Introduction to HTML",
    duration: "90 min",
    type: "coding",
    completed: false,
    quarter: "2nd Quarter",
    resources: ["HTML Cheat Sheet", "Code Examples"]
  },
  {
    id: 8,
    title: "Introduction to CSS",
    duration: "90 min",
    type: "coding",
    completed: false,
    quarter: "2nd Quarter",
    resources: ["CSS Reference", "Styling Examples"]
  }
];

// Default lessons for other courses
const defaultLessons = [
  {
    id: 1,
    title: "Course Introduction",
    duration: "45 min",
    type: "video",
    completed: true,
    resources: ["Course Overview", "Getting Started"]
  },
  {
    id: 2,
    title: "Basic Concepts",
    duration: "60 min",
    type: "video",
    completed: true,
    resources: ["Fundamentals Guide", "Practice Exercises"]
  },
  {
    id: 3,
    title: "Hands-on Workshop",
    duration: "90 min",
    type: "hands-on",
    completed: false,
    resources: ["Workshop Guide", "Sample Files"]
  },
  {
    id: 4,
    title: "Advanced Topics",
    duration: "75 min",
    type: "video",
    completed: false,
    resources: ["Advanced Examples", "Reference Materials"]
  }
];

export const getLessonsByCourseId = (courseId) => {
  switch (courseId) {
    case 1:
      return gamedev101Lessons;
    case 4:
      return etechLessons;
    default:
      return defaultLessons;
  }
};