import {
  FaBookOpen,
  FaMoneyBill,
  FaBrain,
  FaUserGraduate,
  FaIdCard,
  FaUniversity,
  FaFileAlt,
  FaBriefcase,
  FaCalendar,
  FaGraduationCap,
} from "react-icons/fa";

export const servicesData = [
  {
    id: "career-counseling",
    icon: <FaGraduationCap />,
    title: "Career Counseling",
    desc: "Expert guidance to identify your strengths and align them with the most promising career paths in today's market.",
    benefits: [
      "Personalized career roadmap",
      "Skill gap analysis",
      "Industry trend insights",
      "Career switch guidance",
    ],
    why: [
      "Expert career mentors",
      "Data-driven guidance",
      "1:1 personalized sessions",
      "Proven success results",
    ],
    faqs: [
      {
        q: "Who is career counselling for?",
        a: "Students or professionals unsure about their career path or looking to switch fields.",
      },
      {
        q: "How long does a session last?",
        a: "Typically 45–60 minutes depending on your needs.",
      },
      {
        q: "Is it conducted online or offline?",
        a: "Sessions are conducted online for flexibility.",
      },
    ],
  },
  {
    id: "admission-counseling",
    icon: <FaUniversity />,
    title: "Admission Counseling",
    desc: "End-to-end support for college admissions, from university selection to successful enrollment strategies.",
    benefits: [
      "University shortlisting",
      "Application strategy",
      "Profile evaluation",
      "Deadline tracking",
    ],
    why: [
      "High acceptance success rate",
      "Top university partnerships",
      "Expert documentation support",
      "End-to-end assistance",
    ],
    faqs: [
      {
        q: "Do you help with international admissions?",
        a: "Yes, we assist with both domestic and international universities.",
      },
      {
        q: "What documents are required?",
        a: "Typically transcripts, SOP, LORs, and test scores.",
      },
      {
        q: "Can you guarantee admission?",
        a: "We improve your chances significantly but cannot guarantee admission.",
      },
    ],
  },
  {
    id: "entrance-exam-prep",
    icon: <FaBookOpen />,
    title: "Entrance Exam Prep",
    desc: "Targeted coaching for competitive entrance exams with personalized study plans and performance tracking.",
    benefits: [
      "Personalized study plans",
      "Mock tests & analysis",
      "Concept clarity sessions",
      "Performance tracking",
    ],
    why: [
      "Experienced educators",
      "Smart preparation strategies",
      "Regular performance feedback",
      "Proven exam results",
    ],
    faqs: [
      {
        q: "Which exams do you cover?",
        a: "We cover major entrance exams like JEE, NEET, SAT, and more.",
      },
      {
        q: "Do you provide mock tests?",
        a: "Yes, regular mock tests with detailed analysis are included.",
      },
      {
        q: "Is it suitable for beginners?",
        a: "Yes, we design plans for both beginners and advanced students.",
      },
    ],
  },
  {
    id: "scholarship-guidance",
    icon: <FaMoneyBill />,
    title: "Scholarship Guidance",
    desc: "Maximize your funding opportunities through our database of scholarships and expert application reviews.",
    benefits: [
      "Scholarship matching",
      "Application review",
      "Essay guidance",
      "Funding strategy planning",
    ],
    why: [
      "Wide scholarship database",
      "High success rate",
      "Expert application review",
      "Personalized support",
    ],
    faqs: [
      {
        q: "How do you find scholarships?",
        a: "We use a curated database tailored to your profile.",
      },
      {
        q: "Do you help with essays?",
        a: "Yes, we assist in drafting and reviewing scholarship essays.",
      },
      {
        q: "Are scholarships guaranteed?",
        a: "No, but we maximize your chances with strong applications.",
      },
    ],
  },
  {
    id: "ai-skill-assessment",
    icon: <FaBrain />,
    title: "AI Skill Assessment",
    desc: "Leverage advanced AI tools to evaluate your cognitive skills and discover hidden academic potential.",
    benefits: [
      "AI-based skill analysis",
      "Cognitive performance insights",
      "Career alignment suggestions",
      "Detailed assessment reports",
    ],
    why: [
      "Advanced AI technology",
      "Accurate skill mapping",
      "Instant insights",
      "Future-ready approach",
    ],
    faqs: [
      {
        q: "How does AI assessment work?",
        a: "We use AI-driven tools to evaluate your cognitive and analytical skills.",
      },
      {
        q: "Is it accurate?",
        a: "Yes, it provides highly reliable insights based on data.",
      },
      {
        q: "Will I get a report?",
        a: "Yes, a detailed performance report is provided.",
      },
    ],
  },
  {
    id: "student-mentorship",
    icon: <FaUserGraduate />,
    title: "Student Mentorship",
    desc: "Connect with experienced industry professionals for one-on-one sessions to navigate academic challenges.",
    benefits: [
      "1:1 mentor sessions",
      "Career guidance",
      "Academic support",
      "Industry insights",
    ],
    why: [
      "Experienced mentors",
      "Real-world guidance",
      "Personalized attention",
      "Long-term support",
    ],
    faqs: [
      {
        q: "Who are the mentors?",
        a: "Industry professionals and experienced educators.",
      },
      {
        q: "How often are sessions conducted?",
        a: "Sessions are scheduled weekly or as needed.",
      },
      {
        q: "Can I choose my mentor?",
        a: "Yes, based on your preferences and goals.",
      },
    ],
  },
  {
    id: "profile-building",
    icon: <FaIdCard />,
    title: "Profile Building",
    desc: "Strategic advice on extracurriculars and internships to make your academic profile stand out.",
    benefits: [
      "Profile evaluation",
      "Internship guidance",
      "Extracurricular planning",
      "Portfolio building",
    ],
    why: [
      "Strong profile strategies",
      "Industry-backed approach",
      "Personalized roadmap",
      "Higher admission chances",
    ],
    faqs: [
      {
        q: "What is profile building?",
        a: "It involves enhancing your academic and extracurricular profile.",
      },
      {
        q: "Do you help with internships?",
        a: "Yes, we guide you in finding relevant internships.",
      },
      {
        q: "How long does it take?",
        a: "It depends on your current profile and goals.",
      },
    ],
  },
  {
    id: "sop-support",
    icon: <FaFileAlt />,
    title: "Statement of Purpose",
    desc: "Professional editing and drafting assistance for your SOPs, LORs, and university application essays.",
    benefits: [
      "SOP drafting support",
      "LOR guidance",
      "Essay editing",
      "Content improvement",
    ],
    why: [
      "Expert writers",
      "High-quality editing",
      "Personalized storytelling",
      "Strong admission impact",
    ],
    faqs: [
      {
        q: "Do you write SOP from scratch?",
        a: "Yes, we assist from drafting to final editing.",
      },
      {
        q: "How many revisions are included?",
        a: "Multiple revisions until satisfaction.",
      },
      {
        q: "Is it personalized?",
        a: "Yes, every SOP is tailored to your profile.",
      },
    ],
  },
  {
    id: "placement-support",
    icon: <FaBriefcase />,
    title: "Placement Support",
    desc: "Career readiness workshops, mock interviews, and direct placement assistance with our corporate partners.",
    benefits: [
      "Mock interviews",
      "Resume building",
      "Job placement support",
      "Career workshops",
    ],
    why: [
      "Industry connections",
      "Placement assistance",
      "Career-focused training",
      "Higher job success rate",
    ],
    faqs: [
      {
        q: "Do you guarantee placement?",
        a: "We assist strongly but cannot guarantee placement.",
      },
      {
        q: "Do you provide interview training?",
        a: "Yes, mock interviews and feedback sessions are included.",
      },
      {
        q: "Which companies are included?",
        a: "We have partnerships with multiple companies across industries.",
      },
    ],
  },
  {
    id: "webinars-events",
    icon: <FaCalendar />,
    title: "Webinars & Events",
    desc: "Exclusive access to university fairs and academic seminars featuring international faculty members.",
    benefits: [
      "Live webinars",
      "University fairs",
      "Expert sessions",
      "Networking opportunities",
    ],
    why: [
      "Global exposure",
      "Direct university interaction",
      "Latest academic insights",
      "Career networking",
    ],
    faqs: [
      {
        q: "Are webinars free?",
        a: "Some are free while others may be premium.",
      },
      {
        q: "Can I interact with speakers?",
        a: "Yes, live Q&A sessions are included.",
      },
      {
        q: "Will recordings be available?",
        a: "Yes, recordings are shared after sessions.",
      },
    ],
  },
];