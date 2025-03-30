import { 
    Home, 
    Bot, 
    CheckSquare, 
    Video, 
    FileText, 
    Wrench,
    GraduationCap,
    LogOut 
  } from 'lucide-react'
  
  export const navigationItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'ai-assistant', icon: Bot, label: 'AI Assistant' },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
    { id: 'youtube-help', icon: Video, label: 'Video Summarizer' },
    { id: 'notion-help', icon: FileText, label: 'Notion' },
    { id: 'saved-notions', icon: LogOut, label: 'Saved Notions' },
    { id: 'tools', icon: Wrench, label: 'Tools' },
    { id: 'career-path', icon: GraduationCap, label: 'Career Path' },
    { id: 'logout', icon: LogOut, label: 'Log out' }
  ]