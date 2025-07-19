// src/data/courses/gamedev101.js
export const gamedev101 = {
  id: 1,
  title: "Game Development Fundamentals",
  code: "GAMEDEV 101",
  duration: "18 sessions",
  level: "Beginner",
  enrolled: 45,
  progress: 78,
  description: "This course uses a component-based approach to developing a small game with features for rendering 2d graphics, animation and special effects. It also has the basic capabilities to manage input, audio and collision detection features with minimal optimization.",
  credits: "3 units (Lec - Lab)",
  instructor: {
    name: "Joshua C. Oriondo, MIT",
    email: "j.oriondo@university.edu"
  },
  schedule: {
    lecture: "Tuesday, 8:30 am – 10:30 am",
    laboratory: "Monday, 4:30 pm – 7:30 pm"
  },
  hours: {
    lecture: "18 sessions, 36 hours",
    lab: "18 sessions, 54 hours"
  },
  software: ["Unity Game Engine", "Adobe Photoshop", "Microsoft Visual Studio Community"],
  syllabus: [
    "Course orientation and syllabus overview",
    "Unity Interface & Project Setup", 
    "Scenes and GameObjects",
    "2D Graphics & Sprites",
    "Physics & Input systems",
    "Object-Oriented Programming in Games"
  ],
  assignments: [
    { title: "Pong Clone", due: "Week 3", status: "completed" },
    { title: "Platformer Mechanics", due: "Week 6", status: "in-progress" },
    { title: "UI Design", due: "Week 9", status: "upcoming" },
    { title: "Final Game Project", due: "Week 12", status: "upcoming" }
  ]
};