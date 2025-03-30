import { motion } from "framer-motion";
import React, { useState } from "react";
import BookShell from "./BookShell";
import Center from "./Center";
import Calendar from "./Calendar";
import Checklist from "./Checklist";
import FocusTimer from "./FocusTimer";
import VideosURLs from '../../assets/VideosURL.json';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function MainStudio() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="relative overflow-hidden">
      <motion.div 
        className="border bg-white border-gray-200 dark:border-gray-800 rounded-2xl p-3 grid grid-cols-11 grid-rows-2 gap-3 dark:bg-gray-800"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Bookshelf Section */}
        <motion.div 
          className="col-span-3 row-span-1 bg-gray-200 dark:bg-gray-900 rounded-3xl shadow-lg transition-all hover:shadow-xl"
          variants={itemVariants}
          transition={{ duration: 0.5 }}
        >
          <BookShell />
        </motion.div>

        {/* Center Section */}
        <motion.div 
          className="col-span-5 row-span-2 bg-gray-200 dark:bg-gray-900 rounded-3xl shadow-lg "
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Center playlist={VideosURLs} />
        </motion.div>

        {/* Checklist Section */}
        <motion.div 
          className="col-span-3 row-span-1 bg-gradient-to-br bg-white dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-lg transition-all hover:shadow-xl relative overflow-hidden group"
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
          <Checklist />
        </motion.div>

        {/* Focus Timer Section */}
        <motion.div 
          className="col-span-3 row-span-1 bg-gray-200 dark:bg-gray-900 flex justify-center items-center rounded-3xl shadow-lg transition-all hover:shadow-xl"
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <FocusTimer />
        </motion.div>

        {/* Calendar Section */}
        <motion.div 
          className="col-span-3 row-span-1 bg-gray-200 flex justify-center items-center dark:bg-gray-900 rounded-3xl shadow-lg transition-all hover:shadow-xl"
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Calendar date={date} setDate={setDate} />
        </motion.div>

        {/* Overlay gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/10 dark:via-gray-900/0 dark:to-gray-900/10 pointer-events-none"
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 1 }}
        />
      </motion.div>
    </div>
  );
}

export default MainStudio;