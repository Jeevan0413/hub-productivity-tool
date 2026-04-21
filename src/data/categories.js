import { 
  LayoutDashboard, 
  History, 
  ListTodo, 
  Target, 
  Clock, 
  StickyNote, 
  Briefcase, 
  Hourglass, 
  Users, 
  PenTool 
} from 'lucide-react';

export const categories = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'recent', name: 'Recent', icon: History },
  { id: 'todo', name: 'To-Do Lists', icon: ListTodo, description: 'Manage your tasks and daily activities efficiently.' },
  { id: 'habit', name: 'Habit Tracker', icon: Target, description: 'Build good habits and break bad ones with daily tracking.' },
  { id: 'pomodoro', name: 'Pomodoro Timer', icon: Clock, description: 'Stay focused with timed work sessions and short breaks.' },
  { id: 'notes', name: 'Quick Notes', icon: StickyNote, description: 'Capture your thoughts, ideas, and important information quickly.' },
  { id: 'project', name: 'Project Management', icon: Briefcase, description: 'Organize and track complex projects and workflows.' },
  { id: 'time', name: 'Time Tracking', icon: Hourglass, description: 'Monitor exactly where your time goes each day.' },
  { id: 'team', name: 'Team Collaboration', icon: Users, description: 'Work seamlessly with your team members in real-time.' },
  { id: 'notetaking', name: 'Note-Taking Apps', icon: PenTool, description: 'Comprehensive tools for deep note-taking and knowledge building.' }
];
