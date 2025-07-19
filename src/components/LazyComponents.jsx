// src/components/LazyComponents.jsx
import { lazy } from 'react';

// Lazy load heavy components
export const LazyCoursePage = lazy(() => import('./courses/CoursePage'));
export const LazyStudentDashboard = lazy(() => import('./dashboard/StudentDashboard'));
export const LazyAssignmentSubmission = lazy(() => import('./assignments/AssignmentSubmission'));
export const LazyMiniGames = lazy(() => import('./sections/MiniGames'));
export const LazyMemoryGame = lazy(() => import('./games/MemoryGame'));
export const LazySnakeGame = lazy(() => import('./games/SnakeGame'));
export const LazyPongGame = lazy(() => import('./games/PongGame'));