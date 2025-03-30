import React, { useState } from 'react';
import BottomNav from "../components/Dashboard/BottomNav";
import { Header } from "../components/Dashboard/Header";

// Import all your page components
import Home from '../components/Dashboard/Home';
import AIAssistant from '../components/Dashboard/AIAssistant';
import Notion from '../components/Dashboard/Notion';

import VideoSummarizer from '../components/Dashboard/VideoSummarizer'
import MilestonePage from '../components/Dashboard/Milestones/MilestonePage';
import MainStudio from '../components/studio/MainStudio';
import WhiteBoard from '../components/Excal/WhiteBoard'

import { useSelector,useDispatch } from 'react-redux';
import { setActiveItem } from '../store/navigationSlice';

// Import icons
import { Home as HomeIcon, Cpu, Notebook, Briefcase, PlaySquare,Milestone, KeyboardMusic ,Pencil } from 'lucide-react';
import CarrerModule from '../components/Dashboard/CarrerModule';

const Dashboard = () => {
  // State to keep track of the current active page
  // const [activePage, setActivePage] = useState('home');
  const activePage = useSelector((state) => state.navigation.activeItem);
  const dispatch = useDispatch()

  // Navigation items with components
  const navItems = [
    { 
      id: "home", 
      icon: HomeIcon, 
      label: "Home", 
      component: Home 
    },
    { 
      id: "ai-assistant", 
      icon: Cpu, 
      label: "AI Assistant", 
      component: AIAssistant 
    },
    { 
      id: "notion", 
      icon: Notebook, 
      label: "Notion", 
      component: Notion 
    },
    { 
      id: "career-path", 
      icon: Briefcase, 
      label: "Career Path", 
      component: CarrerModule
    },
    { 
      id: "video-summarizer", 
      icon: PlaySquare, 
      label: "Video Summarizer", 
      component: VideoSummarizer 
    },
    { 
      id: "studio", 
      icon: KeyboardMusic, 
      label: "Studio", 
      component: MainStudio 
    },
    {
      id : "whiteboard",
      icon : Pencil,
      label : "whiteboard",
      component : WhiteBoard
    },
    {
      id : "Milestone",
      icon : Milestone,
      label : "Milestone",
      component : MilestonePage
    }
  ];

  // Find the current page component
  const ActivePageComponent = navItems.find(item => item.id === activePage)?.component || Home;

  return (
    <div className="min-h-screen bg-[#50A8FF] dark:bg-gray-900">
      {/* Header (Fixed at the Top) with page change functionality */}
      <nav className="fixed w-full top-0 z-50 ">
        <Header 
          onNavItemClick={(id) => dispatch(setActiveItem(id))} 
          // activePage={activePage} 
        />
      </nav>

      {/* Main Content Container */}
      <div className="pt-17 w-full px-4 rounded-3xl">
        {/* Scrollable content container */}
        <div className="h-[calc(100vh-80px)] overflow-y-auto scrollbar-hidden rounded-4xl bg-black dark:bg-gray-800">
          <div className="grid grid-cols-1 gap-8">
            <ActivePageComponent />
          </div>
        </div>
      </div>

      {/* Bottom Navigation (Fixed at Bottom) */}
      <BottomNav 
        // navItems={navItems} 
        // activePage={activePage} 
        // setActivePage={setActivePage} 
      />
    </div>
  );
};

export default Dashboard;

