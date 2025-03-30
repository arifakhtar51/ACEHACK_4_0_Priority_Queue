import { BookOpen, Calendar } from "lucide-react"

export const learningItems = [
  {
    title: "Medical Terminology",
    description: "Learn basic medical language for effective communication.",
    status: "completed"
  },
  {
    title: "Anatomy and Physiology",
    description: "Understand the structure and function of the human body.",
    status: "completed"
  },
  {
    title: "Medical Ethics and Professionalism",
    description: "Understand ethical principles and professionalism in healthcare.",
    status: "upcoming"
  }
]

export const events = [
  {
    type: "Webinar",
    description: "Understanding medical research, clinical protocols safe...",
    time: "Start at 12:30",
    date: "Tu, 25.03",
    icon: BookOpen,
    variant: "default"
  },
  {
    type: "Lesson",
    description: "Overview of healthcare delivery systems, health policy...",
    date: "We, 26.03",
    icon: BookOpen,
    variant: "purple"
  },
  {
    type: "Task",
    description: "Examination of major global health issues...",
    date: "Th, 27.03",
    icon: Calendar,
    variant: "yellow"
  }
]
