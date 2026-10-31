import type { ExperienceItem, ProjectItem, SkillCategory, EducationItem, CertificationItem } from '../types';

export const personalInfo = {
  name: "Jershika C",
  title: "Full Stack Developer",
  tagline: "Engineering resilient backend architectures and immersive, intuitive frontend web experiences.",
  status: "Available for Full-Time Roles & Opportunities",
  email: "jershika2612@gmail.com",
  phone: "+91-6369190238",
  location: "Kanyakumari, Nagercoil, Tamil Nadu, India",
  linkedin: "https://www.linkedin.com/in/jershika-c-10bbb032b",
  github: "https://github.com/jershika26",
  resumePath: "/Jershika_C_Resume.pdf",
  bio: "Enthusiastic Computer Science Engineering student with Honors, specializing in Core Java, Spring Boot, React.js, and scalable full-stack web development. Passionate about architecting performant REST APIs, reliable database models, and elegant user interfaces.",
  extendedBio: "With proven internship and industry experience across enterprise full-stack development, Python backend services, and machine learning, I thrive at the intersection of robust backend engineering and modern frontend design. Dedicated to writing clean, maintainable code, solving complex architectural challenges, and delivering tangible business impact."
};

export const stats = [
  { label: "Engineering Honors CGPA", value: "8.51", suffix: "/10", detail: "Ponjesly College of Engineering" },
  { label: "Industry & Internship Roles", value: "4", suffix: "+", detail: "Full Stack & Machine Learning" },
  { label: "Key Projects Delivered", value: "5", suffix: "+", detail: "Enterprise, Web & AI/CV" },
  { label: "API Issue Reduction", value: "15", suffix: "%", detail: "Optimized data flow efficiency" },
  { label: "CV Model Accuracy", value: "92", suffix: "%", detail: "Tested on 500+ underwater images" }
];

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend Development",
    iconName: "Server",
    description: "Robust enterprise services, RESTful microservices, and object-oriented architectures",
    skills: [
      { name: "Core Java", highlight: true },
      { name: "OOPs Concepts", highlight: true },
      { name: "Spring Boot", highlight: true },
      { name: "REST APIs", highlight: true },
      { name: "JPA / Hibernate", highlight: true },
      { name: "Nest.js" },
      { name: "Axios API Integration" }
    ]
  },
  {
    id: "frontend",
    title: "Frontend Development",
    iconName: "Layout",
    description: "Responsive, accessible, and reactive user interfaces built with modern web standards",
    skills: [
      { name: "React.js", highlight: true },
      { name: "TypeScript", highlight: true },
      { name: "JavaScript (ES6+)", highlight: true },
      { name: "HTML5 & CSS3", highlight: true },
      { name: "Bootstrap & React Bootstrap" },
      { name: "Responsive UI/UX Design" },
      { name: "jQuery" }
    ]
  },
  {
    id: "languages",
    title: "Programming Languages",
    iconName: "Code2",
    description: "Strong foundation in typed object-oriented programming and scripting",
    skills: [
      { name: "Java", highlight: true },
      { name: "Python", highlight: true },
      { name: "TypeScript", highlight: true },
      { name: "JavaScript", highlight: true },
      { name: "SQL", highlight: true }
    ]
  },
  {
    id: "databases",
    title: "Databases & Storage",
    iconName: "Database",
    description: "Relational and document databases with optimized indexing and cloud hosting",
    skills: [
      { name: "PostgreSQL", highlight: true },
      { name: "MySQL", highlight: true },
      { name: "Supabase (Cloud PostgreSQL)", highlight: true },
      { name: "MongoDB" }
    ]
  },
  {
    id: "tools",
    title: "Development Tools & Platforms",
    iconName: "Wrench",
    description: "Industry-standard IDEs, version control systems, and API testing platforms",
    skills: [
      { name: "VS Code", highlight: true },
      { name: "IntelliJ IDEA", highlight: true },
      { name: "GitHub & Git", highlight: true },
      { name: "Postman", highlight: true },
      { name: "Eclipse IDE" },
      { name: "NetBeans IDE" }
    ]
  },
  {
    id: "softskills",
    title: "Soft Skills & Leadership",
    iconName: "Sparkles",
    description: "Professional interpersonal and project execution capabilities",
    skills: [
      { name: "Problem-Solving", highlight: true },
      { name: "Quick Learning Ability", highlight: true },
      { name: "Leadership", highlight: true },
      { name: "Team Collaboration" },
      { name: "Presentation Skills" },
      { name: "Time Management & Prioritization" },
      { name: "Debugging & Troubleshooting" }
    ]
  }
];

export const experiences: ExperienceItem[] = [
  {
    id: "exp-imperial",
    role: "Full Stack Developer",
    company: "Imperial Info System",
    location: "Chennai, Tamil Nadu",
    period: "Aug, 2026 – Present",
    isCurrent: true,
    type: "Professional Role",
    highlightBadge: "Current Role",
    techStack: ["React.js", "JavaScript", "REST APIs", "Modern Frontend UI", "Full Stack Workflow"],
    responsibilities: [
      "Developed responsive web applications using React.js and modern frontend technologies with a strong focus on user experience.",
      "Implemented REST API integrations and functional features, contributing to efficient application performance.",
      "Collaborated on feature planning, architectural enhancements, and interactive component design."
    ]
  },
  {
    id: "exp-agile",
    role: "Python Full Stack Intern",
    company: "Agile Infotech",
    location: "Kerala, India",
    period: "June, 2025 – July 23, 2025",
    type: "Internship",
    highlightBadge: "3 Full Stack Apps",
    techStack: ["Python", "MongoDB", "Backend Architecture", "Full Stack Integration"],
    responsibilities: [
      "Built three Python-based applications and integrated robust data storage mechanisms using MongoDB.",
      "Integrated frontend and backend functionalities to enable seamless data exchange and application reliability.",
      "Participated in agile sprints, code reviews, and schema optimization workflows."
    ]
  },
  {
    id: "exp-ak",
    role: "Full Stack Web Development Intern",
    company: "Ak Info Park",
    location: "Kanyakumari, Tamil Nadu",
    period: "Feb, 2025 – Feb 20, 2025",
    type: "Internship",
    highlightBadge: "15% Latency Improvement",
    techStack: ["HTML5", "CSS3", "JavaScript", "REST APIs", "Performance Tuning"],
    responsibilities: [
      "Developed five responsive webpages using semantic HTML, modern CSS styling, and interactive JavaScript.",
      "Integrated frontend and backend functionalities, improving data flow efficiency and reducing API response issues by 15%."
    ]
  },
  {
    id: "exp-srishti",
    role: "Python and Data Analysis Intern",
    company: "Srishti Innovative Computer Systems",
    location: "Kerala, India",
    period: "Feb, 2024 – Mar 3, 2024",
    type: "Internship",
    highlightBadge: "Data Visualization & Analytics",
    techStack: ["Python", "Data Analysis", "Data Cleaning", "Data Visualization", "Analytics Reporting"],
    responsibilities: [
      "Processed and cleaned three complex datasets using Python for comprehensive data analysis and reporting.",
      "Created interactive charts and visual reports using Python libraries to visualize project insights and trends."
    ]
  }
];

export const projects: ProjectItem[] = [
  {
    id: "proj-real-estate",
    title: "Real Estate Management System",
    subtitle: "Enterprise property, buyer & seller platform with Spring Boot & Supabase PostgreSQL",
    category: "java",
    categoryLabel: "Java / Spring Boot",
    description: "An enterprise backend and full-stack application built using Spring Boot to manage buyer, seller, and property portfolios with performant REST APIs for complete CRUD operations.",
    longDescription: "Developed an enterprise-grade backend and management application using Spring Boot and React.js. The system integrates Supabase-hosted PostgreSQL using JPA/Hibernate for seamless object-relational mapping, structured querying, and automated schema migrations. Features advanced multi-variable search and filtering based on geographic location, budget parameters, and property categories, alongside data validation and duplicate phone number resolution to ensure data fidelity.",
    features: [
      "Comprehensive CRUD REST APIs engineered with Spring Boot for buyers, sellers, and listings",
      "PostgreSQL database hosted on Supabase integrated via JPA and Hibernate ORM",
      "Dynamic multi-attribute filtering by location, price bracket, and property typology",
      "Strict data validation rules and duplicate phone number prevention logic for clean datasets",
      "Modular MVC architecture with clean service and repository decoupling"
    ],
    architecturePoints: [
      "Spring Boot REST Controllers with DTO validation",
      "JPA / Hibernate Entity Relationships & Custom Queries",
      "Cloud PostgreSQL on Supabase with connection pooling",
      "React.js frontend dashboard consuming REST endpoints"
    ],
    techStack: ["Java", "Spring Boot", "REST APIs", "JPA/Hibernate", "PostgreSQL", "Supabase", "React.js"],
    metrics: "Full CRUD & Search Engine",
    githubUrl: "https://github.com/jershika26",
    featured: true,
    gradient: "from-blue-600 via-indigo-600 to-purple-600"
  },
  {
    id: "proj-mydoo",
    title: "Mydoo – School Management Platform",
    subtitle: "Institutional administration platform with location-based admissions search",
    category: "frontend",
    categoryLabel: "React / TypeScript",
    description: "Developed and maintained a modern school management platform with highly responsive UI components and REST API integration for administrative workflows.",
    longDescription: "Engineered responsive, accessible user interface modules in React.js and TypeScript for institutional management. Implemented school profile administrative portals, admission detail tracking, and interactive location-based school search to streamline parental discovery and school registration.",
    features: [
      "Complete school profile management suite for administrators",
      "Student admission details processing and verification pipeline",
      "Location-based search and filter functionality for fast institutional discovery",
      "Type-safe component architecture built with TypeScript and React.js",
      "Optimized REST API consumption for rapid page loads and fluid state transitions"
    ],
    architecturePoints: [
      "TypeScript interfaces ensuring strict contract compliance",
      "Reusable UI components with modular design system",
      "RESTful API client with error boundaries and fallback states"
    ],
    techStack: ["React.js", "TypeScript", "REST APIs", "CSS Glassmorphism", "State Management"],
    metrics: "Type-Safe EdTech Architecture",
    githubUrl: "https://github.com/jershika26",
    featured: true,
    gradient: "from-purple-600 via-pink-600 to-rose-600"
  },
  {
    id: "proj-traffic-control",
    title: "Real-Time Traffic Forecasting & Congestion Control",
    subtitle: "Intelligent urban traffic prediction and dynamic signal regulation using Machine Learning",
    category: "ml",
    categoryLabel: "AI & Machine Learning",
    description: "An intelligent urban traffic management and forecasting system utilizing machine learning models to predict real-time congestion and dynamically optimize traffic signal timings.",
    longDescription: "Trained predictive models using XGBoost to forecast congestion patterns and urban bottlenecks in real time. Deployed computer vision using OpenCV and YOLO to detect and count vehicular volume across junctions. Formulated a dynamic adaptive signal timing algorithm that responds dynamically to forecast conditions, reducing urban transit delays.",
    features: [
      "Predictive machine learning pipeline powered by XGBoost for congestion forecasting",
      "Computer vision integration with YOLO and OpenCV for live vehicular tracking",
      "Dynamic traffic signal cycle optimization algorithm based on congestion thresholds",
      "Flask backend serving real-time analytics and predictive telemetry",
      "Responsive web dashboard designed with HTML5 and Bootstrap"
    ],
    architecturePoints: [
      "XGBoost regression and classification pipelines",
      "YOLO object detection inference pipeline",
      "Flask REST API microservices for prediction streaming"
    ],
    techStack: ["Python", "Flask", "XGBoost", "OpenCV", "YOLO", "HTML5", "Bootstrap"],
    metrics: "Real-Time Adaptive Signals",
    githubUrl: "https://github.com/jershika26",
    featured: true,
    gradient: "from-amber-500 via-orange-600 to-red-600"
  },
  {
    id: "proj-underwater-cv",
    title: "Underwater Object Recognition System",
    subtitle: "Computer vision model utilizing color-based HSV space segmentation",
    category: "ml",
    categoryLabel: "Computer Vision",
    description: "Designed a specialized computer-vision model to detect and highlight underwater objects using color-based segmentation in the HSV color space, achieving 92% detection accuracy.",
    longDescription: "Overcame underwater visual degradation challenges (such as light attenuation, turbidity, and color scattering) by implementing custom color-space thresholding in HSV coordinates. Benchmarked and validated across 500+ underwater image sets, achieving a 92% detection accuracy through precision threshold tuning and morphological contour filtering.",
    features: [
      "Robust color-based object segmentation implemented in HSV color space",
      "Calibrated across 500+ real-world underwater images with diverse clarity conditions",
      "Achieved 92% detection accuracy by fine-tuning HSV boundary thresholds",
      "Morphological operations for noise reduction and clear contour bounding",
      "NumPy matrix acceleration for high-speed batch image processing"
    ],
    architecturePoints: [
      "HSV color space conversion and dynamic thresholding",
      "OpenCV morphological transformations (dilation, erosion)",
      "NumPy vectorized image array manipulations"
    ],
    techStack: ["Python", "OpenCV", "NumPy", "Image Processing", "HSV Segmentation"],
    metrics: "92% Accuracy on 500+ Images",
    githubUrl: "https://github.com/jershika26",
    featured: false,
    gradient: "from-cyan-500 via-teal-600 to-emerald-600"
  },
  {
    id: "proj-house-of-greens",
    title: "House of Greens – Business Website",
    subtitle: "Vibrant botanical enterprise website with integrated WhatsApp commerce",
    category: "frontend",
    categoryLabel: "Frontend Web App",
    description: "Developed a modern, responsive business web presence for an eco-friendly brand, integrated with direct-to-WhatsApp communication for instant customer conversions.",
    longDescription: "Created an engaging digital storefront and brand showcase for House of Greens using React.js and React Bootstrap. Features responsive catalog browsing, botanical care recommendations, and seamless WhatsApp click-to-chat integration that routes enquiries straight into sales conversations.",
    features: [
      "Mobile-first responsive interface built with React.js and React Bootstrap",
      "Direct WhatsApp communication gateway for immediate customer inquiries",
      "Curated product showcases and dynamic gallery components",
      "Interactive customer enquiry forms with immediate client-side validation"
    ],
    architecturePoints: [
      "Component-driven layout with React Bootstrap grid system",
      "Custom WhatsApp API deep-linking integration",
      "Fast static rendering and client-side transitions"
    ],
    techStack: ["React.js", "React Bootstrap", "JavaScript", "WhatsApp API", "CSS3"],
    metrics: "Direct Customer Inquiries",
    githubUrl: "https://github.com/jershika26",
    featured: false,
    gradient: "from-emerald-500 via-teal-600 to-cyan-600"
  }
];

export const educationList: EducationItem[] = [
  {
    id: "edu-be",
    degree: "B.E. Computer Science Engineering (Honors)",
    institution: "Ponjesly College of Engineering",
    location: "Kanyakumari, Tamil Nadu",
    period: "Graduated with Honors",
    score: "8.51",
    scoreType: "CGPA",
    isHonors: true,
    details: [
      "Awarded Bachelor of Engineering with Honors distinction in Computer Science.",
      "Comprehensive coursework in Data Structures, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, and Full Stack Architecture.",
      "Actively led project teams in full-stack web and machine learning capstone systems."
    ]
  },
  {
    id: "edu-hsc",
    degree: "Higher Secondary Certificate (HSC) — Computer Science",
    institution: "St. Joseph’s Convent Higher Secondary School",
    location: "Nagercoil, Tamil Nadu",
    score: "73.17%",
    scoreType: "Percentage",
    details: [
      "Specialized in Computer Science, Mathematics, Physics, and Chemistry.",
      "Built early foundational programming skills in procedural and object-oriented fundamentals."
    ]
  },
  {
    id: "edu-sslc",
    degree: "Secondary School Leaving Certificate (SSLC)",
    institution: "St. Joseph’s Convent Higher Secondary School",
    location: "Nagercoil, Tamil Nadu",
    score: "74.6%",
    scoreType: "Percentage",
    details: [
      "Strong academic foundation across sciences, mathematics, and analytical reasoning."
    ]
  }
];

export const certifications: CertificationItem[] = [
  {
    id: "cert-fullstack",
    title: "Full Stack Web Development & Java Intensive Course",
    issuer: "Professional Software Training Program",
    period: "Feb 14, 2024 – Mar 3, 2024",
    highlights: [
      "Mastered practical full-stack application development from frontend rendering to backend persistence.",
      "Hands-on expertise in Core Java, OOPs paradigms, Spring Boot microservices, and JPA/Hibernate.",
      "Frontend mastery in HTML5, CSS3, Modern JavaScript, React.js, React Bootstrap, and Axios HTTP clients.",
      "Engineered full-stack architectures integrating RESTful APIs with relational databases."
    ],
    skills: ["Java", "Spring Boot", "React.js", "REST APIs", "JPA/Hibernate", "JavaScript", "Axios"]
  }
];
