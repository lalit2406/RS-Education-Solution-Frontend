const programsData = [
  // ================= ENGINEERING =================
  {
    id: 1,
    title: "B.Tech in Computer Science",
    category: "Engineering",
    image: "/images/home/Computer_Science.webp",
    description:
      "Build software, apps, and scalable systems.\nWork in AI, web, and cloud technologies.\nHigh demand across tech industries worldwide.",
  },
  {
    id: 2,
    title: "B.Tech in Electronics & Communication",
    category: "Engineering",
    image: "/images/home/Electronics_Communication.webp",
    description:
      "Design communication and electronic systems.\nWork with circuits, signals, and embedded tech.\nOpportunities in telecom and core industries.",
  },
  {
    id: 3,
    title: "B.Tech in Mechanical Engineering",
    category: "Engineering",
    image: "/images/home/Mechanical.webp",
    description:
      "Understand machines, engines, and manufacturing.\nWork in automotive, robotics, and production.\nCore engineering field with wide applications.",
  },
  {
    id: 4,
    title: "B.Tech in Civil Engineering",
    category: "Engineering",
    image: "/images/home/Civil.webp",
    description:
      "Design buildings, roads, and infrastructure.\nWork on construction and urban development.\nEssential role in nation-building projects.",
  },
  {
    id: 5,
    title: "B.Tech in Information Technology",
    category: "Engineering",
    image: "/images/home/Information_Technology.webp",
    description:
      "Focus on software systems and networking.\nWork in IT services, cybersecurity, and cloud.\nStrong career growth in digital industries.",
  },
  {
    id: 6,
    title: "B.Tech in Electrical Engineering",
    category: "Engineering",
    image: "/images/home/Electrical.webp",
    description:
      "Study power systems and electrical machines.\nWork in energy, automation, and electronics.\nCore field with stable career opportunities.",
  },
  {
    id: 7,
    title: "B.Tech in AI & ML",
    category: "Engineering",
    image: "/images/home/AI_ML.webp",
    description:
      "Work on artificial intelligence and machine learning.\nBuild smart systems and predictive models.\nOne of the fastest-growing tech domains.",
  },
  {
    id: 8,
    title: "B.Tech in Data Science",
    category: "Engineering",
    image: "/images/home/Data_Science.webp",
    description:
      "Analyze data to drive business decisions.\nWork with analytics, statistics, and AI tools.\nHigh demand across industries worldwide.",
  },
  {
    id: 9,
    title: "B.Tech in Cyber Security",
    category: "Engineering",
    image: "/images/home/Cyber_Security.webp",
    description:
      "Protect systems from cyber threats and attacks.\nWork in ethical hacking and data protection.\nCritical role in digital security ecosystem.",
  },


  // ================= MEDICAL =================
  {
    id: 10,
    title: "MBBS",
    category: "Medical",
    image: "/images/home/medical.webp",
    description:
      "Become a doctor and treat patients.\nLearn clinical skills and medical science.\nHighly respected and impactful profession.",
  },
  {
    id: 11,
    title: "BDS (Dental)",
    category: "Medical",
    image: "/images/home/medical.webp",
    description:
      "Specialize in dental care and oral health.\nPerform surgeries and treatments for patients.\nCareer in clinics or private practice.",
  },
  {
    id: 12,
    title: "B.Pharma",
    category: "Medical",
    image: "/images/home/medical.webp",
    description:
      "Study medicines and drug formulations.\nWork in pharma companies and research labs.\nGrowing industry with global opportunities.",
  },
  {
    id: 13,
    title: "M.Pharma",
    category: "Medical",
    image: "/images/home/medical.webp",
    description:
      "Advanced study in pharmaceutical sciences.\nFocus on research and drug development.\nIdeal for specialization and higher roles.",
  },
  {
    id: 14,
    title: "Pharm.D",
    category: "Medical",
    image: "/images/home/medical.webp",
    description:
      "Clinical-focused pharmacy program.\nWork directly with patients and doctors.\nBlend of healthcare and pharmaceutical practice.",
  },
  {
  id: 201,
  title: "B.Sc Nursing",
  category: "Medical",
  image: "/images/home/medical.webp",
  description:
    "Provide patient care and medical support.\nWork in hospitals and healthcare centers.\nStable and respected healthcare career.",
},
{
  id: 202,
  title: "BAMS (Ayurveda)",
  category: "Medical",
  image: "/images/home/medical.webp",
  description:
    "Study traditional Indian medicine.\nWork in holistic healthcare and clinics.\nGrowing demand in alternative medicine.",
},
{
  id: 203,
  title: "BHMS (Homeopathy)",
  category: "Medical",
  image: "/images/home/medical.webp",
  description:
    "Treat patients using homeopathic methods.\nFocus on natural and holistic healing.\nCareer in clinics and private practice.",
},
{
  id: 204,
  title: "BPT (Physiotherapy)",
  category: "Medical",
  image: "/images/home/medical.webp",
  description:
    "Help patients recover from injuries.\nWork in rehabilitation and therapy centers.\nGrowing demand in sports and healthcare.",
},
{
  id: 205,
  title: "BMLT (Medical Lab Technology)",
  category: "Medical",
  image: "/images/home/medical.webp",
  description:
    "Conduct lab tests and diagnostics.\nWork in hospitals and pathology labs.\nEssential role in medical analysis.",
},
{
  id: 206,
  title: "B.Sc Radiology",
  category: "Medical",
  image: "/images/home/medical.webp",
  description:
    "Operate imaging technologies like X-ray and MRI.\nWork in hospitals and diagnostic centers.\nHigh demand technical healthcare role.",
},

 // ================= SCIENCE =================
  {
    id: 22,
    title: "B.Sc in Biotechnology",
    category: "Others",
    image: "/images/home/B.Sc_Biotechnology.webp",
    description:
      "Study biology with technology applications.\nWork in labs, pharma, and research.\nGrowing field in healthcare and science.",
  },
  {
    id: 23,
    title: "B.Sc in Physics",
    category: "Others",
    image: "/images/home/B_Sc_Physics.webp",
    description:
      "Understand laws of nature and universe.\nWork in research, teaching, or tech fields.\nStrong base for advanced studies.",
  },
  {
    id: 24,
    title: "B.Sc in Mathematics",
    category: "Others",
    image: "/images/home/B_Sc_Mathematics.webp",
    description:
      "Develop analytical and problem-solving skills.\nUseful in finance, data, and research.\nCore subject with wide applications.",
  },
  {
    id: 25,
    title: "M.Sc",
    category: "Others",
    image: "/images/home/M_Sc.webp",
    description:
      "Advanced specialization in science subjects.\nFocus on research and academic careers.\nOpens opportunities in higher studies.",
  },

  // ================= MANAGEMENT =================
  {
    id: 15,
    title: "MBA in Finance",
    category: "Others",
    image: "/images/home/MBA_Finance.webp",
    description:
      "Learn financial management and investments.\nWork in banking, finance, and consulting.\nHigh-paying roles in corporate sector.",
  },
  {
    id: 16,
    title: "MBA in Marketing",
    category: "Others",
    image: "/images/home/MBA_Marketing.webp",
    description:
      "Master branding, sales, and market strategy.\nWork in advertising and business growth roles.\nDynamic field with creative opportunities.",
  },
  {
    id: 17,
    title: "MBA in Human Resources",
    category: "Others",
    image: "/images/home/MBA_HR.webp",
    description:
      "Manage hiring, training, and employee relations.\nWork in corporate HR and talent management.\nKey role in organizational success.",
  },
  {
    id: 18,
    title: "MBA in Business Analytics",
    category: "Others",
    image: "/images/home/MBA_BusinessAnalytics.webp",
    description:
      "Use data to guide business decisions.\nWork with analytics tools and insights.\nHigh demand in data-driven companies.",
  },
  {
    id: 19,
    title: "BBA",
    category: "Others",
    image: "/images/home/BBA.webp",
    description:
      "Foundation in business and management.\nLearn marketing, finance, and operations.\nGreat start for MBA or corporate roles.",
  },

  // ================= LAW =================
  {
    id: 20,
    title: "LLB",
    category: "Others",
    image: "/images/home/LLB.webp",
    description:
      "Study legal systems and laws.\nPractice as a lawyer or legal advisor.\nCareer in courts, firms, or corporate law.",
  },
  {
    id: 21,
    title: "B.A. LLB",
    category: "Others",
    image: "/images/home/B.A.LLB.webp",
    description:
      "Integrated law program with arts.\nStrong foundation in legal and social subjects.\nDirect path to legal profession.",
  },

 

  // ================= ARTS =================
  {
    id: 26,
    title: "B.A",
    category: "Others",
    image: "/images/home/BA.webp",
    description:
      "Study humanities and social sciences.\nBuild skills in communication and analysis.\nFlexible career options across fields.",
  },
  {
    id: 27,
    title: "M.A",
    category: "Others",
    image: "/images/home/MA.webp",
    description:
      "Advanced study in arts and humanities.\nFocus on research and specialization.\nIdeal for teaching and academic careers.",
  },
  {
    id: 28,
    title: "Psychology",
    category: "Others",
    image: "/images/home/Phsychology.webp",
    description:
      "Study human behavior and mental processes.\nWork in counselling and therapy.\nGrowing demand in healthcare sector.",
  },

  // ================= COMMERCE =================
  {
    id: 29,
    title: "B.Com",
    category: "Others",
    image: "/images/home/B_Com.webp",
    description:
      "Learn accounting, finance, and business laws.\nWork in finance, auditing, and taxation.\nPopular choice for commerce students.",
  },

  // ================= TECH =================
  {
    id: 30,
    title: "BCA",
    category: "Others",
    image: "/images/home/online.webp",
    description:
      "Focus on computer applications and coding.\nWork in software and IT industries.\nGreat alternative to engineering.",
  },
  {
    id: 31,
    title: "MCA",
    category: "Others",
    image: "/images/home/online.webp",
    description:
      "Advanced computer application program.\nSpecialize in software development.\nStrong career in IT sector.",
  },

  // ================= DESIGN =================
  {
    id: 33,
    title: "B.Arch",
    category: "Others",
    image: "/images/home/B.Arch.webp",
    description:
      "Design buildings and architectural spaces.\nWork in construction and urban planning.\nBlend of creativity and engineering.",
  },

  // ================= EDUCATION =================
  {
    id: 34,
    title: "B.Ed",
    category: "Others",
    image: "/images/home/B.Ed.webp",
    description:
      "Train to become a professional teacher.\nLearn teaching methods and classroom skills.\nRequired for teaching careers.",
  },

  // ================= DIPLOMA =================
  {
    id: 35,
    title: "PGDM",
    category: "Others",
    image: "/images/home/PGDM.webp",
    description:
      "Industry-focused management program.\nLearn practical business skills.\nStrong placement opportunities in corporates.",
  },

  // ================= DOCTORAL =================
  {
    id: 36,
    title: "Ph.D",
    category: "Others",
    image: "/images/home/Ph.D.webp",
    description:
      "Highest level of academic qualification.\nFocus on research and innovation.\nCareer in academia and advanced research.",
  },

];

export default programsData;