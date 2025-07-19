// src/data/courses/gamedev101.js
export const gamedev101 = {
  id: 1,
  title: "Game Development Fundamentals",
  code: "GAMEDEV 101",
  duration: "12 weeks",
  level: "Beginner",
  enrolled: 45,
  progress: 78,
  description: "Learn the basics of game development using Unity and C#",
  syllabus: [
    "Introduction to Game Engines",
    "C# Programming Basics",
    "2D Game Development",
    "Physics and Collision",
    "UI/UX for Games",
    "Final Project"
  ],
  assignments: [
    { title: "Pong Clone", due: "Week 3", status: "completed" },
    { title: "Platformer Mechanics", due: "Week 6", status: "in-progress" },
    { title: "UI Design", due: "Week 9", status: "upcoming" },
    { title: "Final Game Project", due: "Week 12", status: "upcoming" }
  ]
};