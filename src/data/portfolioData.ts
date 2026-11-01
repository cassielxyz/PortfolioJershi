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
    techStack: ["React.js", "TypeScript", "REST APIs", "Modern Frontend UI", "Full Stack Workflow"],
    responsibilities: [
      "Engineered high-performance enterprise interface modules in React.js with modular component design and zero-regression state management.",
      "Integrated microservice REST APIs with robust error boundaries, request throttling, and optimistic client-side cache layers.",
      "Spearheaded UI design-to-code implementations with fluid spring physics, accessible keyboard navigation, and pixel-perfect design fidelity."
    ],
    architectureDetails: {
      summary: "Leading production full-stack engineering across client-facing portals, focusing on low-latency state orchestration, responsive layouts, and clean API consumption.",
      outcomes: [
        "Architected reusable design system modules reducing cross-team frontend feature rollout cycle time.",
        "Implemented standardized Axios interceptor layers for token lifecycle, session telemetry, and graceful error alerts.",
        "Delivered 98+ Lighthouse scores across responsive accessibility and performance."
      ],
      keyDeliverable: "Enterprise Client Portal Suite & Scalable UI Foundation"
    }
  },
  {
    id: "exp-agile",
    role: "Python Full Stack Intern",
    company: "Agile Infotech",
    location: "Kerala, India",
    period: "June, 2025 – July 23, 2025",
    type: "Internship",
    highlightBadge: "3 Full Stack Apps",
    techStack: ["Python", "MongoDB", "Backend Architecture", "Full Stack Integration", "REST APIs"],
    responsibilities: [
      "Built three production-ready Python web applications integrating asynchronous request flows and MongoDB document persistence.",
      "Created resilient backend validation pipelines ensuring data integrity across high-frequency transactional payloads.",
      "Participated in agile sprints, code reviews, and schema indexing optimizations for fast query retrieval."
    ],
    architectureDetails: {
      summary: "End-to-end engineering of multi-tier Python services paired with NoSQL persistence models, RESTful endpoints, and intuitive dashboard interfaces.",
      outcomes: [
        "Designed and deployed 3 end-to-end full stack web platforms on schedule.",
        "Indexed MongoDB document collections to guarantee sub-50ms query turnaround under concurrent reads.",
        "Wrote structured unit tests covering core business logic and API contracts."
      ],
      keyDeliverable: "3 Production-Grade Python & MongoDB Web Applications"
    }
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
      "Engineered five responsive web interfaces using semantic HTML5, modern CSS3 animations, and reactive vanilla JavaScript.",
      "Diagnosed and eliminated redundant network calls, reducing client-server data exchange latency by 15%.",
      "Standardized mobile-first breakpoint logic ensuring flawless cross-device layout consistency."
    ],
    architectureDetails: {
      summary: "Focused on frontend performance engineering, DOM render budget optimization, and asynchronous REST API integration.",
      outcomes: [
        "Achieved a verified 15% reduction in API response bottlenecks via debounced query execution.",
        "Delivered 5 cross-browser responsive web properties with zero horizontal overflow issues.",
        "Optimized asset pipelines and CSS reflow triggers for stable 60fps scrolling."
      ],
      keyDeliverable: "5 High-Speed Responsive Web Properties & 15% Latency Optimization"
    }
  },
  {
    id: "exp-srishti",
    role: "Python and Data Analysis Intern",
    company: "Srishti Innovative Computer Systems",
    location: "Kerala, India",
    period: "Feb, 2024 – Mar 3, 2024",
    type: "Internship",
    highlightBadge: "Data Visualization & Analytics",
    techStack: ["Python", "Data Analysis", "Data Cleaning", "Data Visualization", "Pandas", "Matplotlib"],
    responsibilities: [
      "Ingested, sanitized, and transformed three multi-variate datasets using Python and scientific computing libraries.",
      "Generated analytical reporting dashboards and visual trend plots translating complex raw metrics into strategic takeaways.",
      "Documented statistical modeling methodologies and reproducible data processing pipelines."
    ],
    architectureDetails: {
      summary: "Statistical data processing, outlier normalization, and automated visual analytics reporting for project stakeholder presentations.",
      outcomes: [
        "Cleaned and restructured 3 large-scale operational datasets with zero data loss.",
        "Generated multi-dimensional visual scatter, distribution, and trend dashboards.",
        "Established automated data ingestion scripts eliminating manual spreadsheet cleanup."
      ],
      keyDeliverable: "Automated Data Analytics Pipeline & Comprehensive Visual Reports"
    }
  }
];

export const projects: ProjectItem[] = [
  {
    id: "proj-london-star",
    title: "London Star Education",
    subtitle: "International education platform and academic portal with dynamic enrollment",
    category: "web",
    categoryLabel: "Educational Portal",
    description: "Comprehensive institutional web platform delivering interactive curriculum access, student portal services, and dynamic program enrollment.",
    longDescription: "Engineered a high-performance international academic platform for London Star Education. Designed with responsive, accessible web architecture delivering real-time course discovery, program requirements, and streamlined student application workflows.",
    features: [
      "Interactive curriculum and international course discovery catalog",
      "Student enrollment portal with verified credential validation",
      "Responsive academic interface designed with modern UI standards"
    ],
    architecturePoints: [
      "Component-driven layout with fluid accessibility standards",
      "Optimized static asset delivery and sub-second load times",
      "Clean client-side routing and structured navigation flow"
    ],
    techStack: ["React.js", "TypeScript", "REST APIs", "Modern Web", "Tailwind CSS"],
    metrics: "Live Institutional Portal",
    liveUrl: "https://lse.rkitest.com/",
    githubUrl: "https://github.com/jershika26",
    featured: true,
    gradient: "from-blue-600 via-indigo-600 to-purple-600"
  },
  {
    id: "proj-mydoo",
    title: "Mydoo – School Management Platform",
    subtitle: "Institutional administration platform with location-based admissions search",
    category: "web",
    categoryLabel: "School Management",
    description: "Modern school administration system featuring parental discovery tools, admissions tracking, and institutional workflow automation.",
    longDescription: "Engineered responsive user interface modules in React.js and TypeScript for institutional management. Implemented school profile administrative portals, admission detail tracking, and interactive location-based school search to streamline parental discovery and school registration.",
    features: [
      "Complete school profile management suite for administrators",
      "Student admission details processing and verification pipeline",
      "Location-based search and filter functionality for fast institutional discovery"
    ],
    architecturePoints: [
      "TypeScript interfaces ensuring strict contract compliance",
      "Reusable UI components with modular design system",
      "RESTful API client with error boundaries and fallback states"
    ],
    techStack: ["React.js", "TypeScript", "REST APIs", "CSS Glassmorphism", "State Management"],
    metrics: "Admissions & Student ERP",
    liveUrl: "https://mydoo.in",
    githubUrl: "https://github.com/jershika26",
    featured: true,
    gradient: "from-purple-600 via-pink-600 to-rose-600"
  },
  {
    id: "proj-house-of-greens",
    title: "House of Greens – Botanical Storefront",
    subtitle: "Eco-friendly botanical enterprise platform with direct WhatsApp commerce",
    category: "web",
    categoryLabel: "E-Commerce & WhatsApp",
    description: "Botanical enterprise e-commerce storefront with curated plant catalogs and integrated direct-to-WhatsApp order dispatch.",
    longDescription: "Created an engaging digital storefront and brand showcase for House of Greens using React.js. Features responsive catalog browsing, botanical care recommendations, and seamless WhatsApp click-to-chat integration that routes enquiries straight into sales conversations.",
    features: [
      "Mobile-first responsive interface with species-specific care guides",
      "Direct WhatsApp communication gateway for immediate customer inquiries",
      "Curated product showcases and dynamic gallery components"
    ],
    architecturePoints: [
      "Component-driven layout with fluid grid system",
      "Custom WhatsApp API deep-linking integration",
      "Fast static rendering and client-side transitions"
    ],
    techStack: ["React.js", "JavaScript", "WhatsApp API", "Tailwind CSS"],
    metrics: "Direct WhatsApp Inquiries",
    liveUrl: "https://houseofgreens.co.in",
    githubUrl: "https://github.com/jershika26",
    featured: true,
    gradient: "from-emerald-500 via-teal-600 to-cyan-600"
  },
  {
    id: "proj-underwater-cv",
    title: "Underwater Object Detection System",
    subtitle: "Marine study computer vision pipeline utilizing HSV space color segmentation",
    category: "cv",
    categoryLabel: "Marine Computer Vision",
    description: "Computer vision marine pipeline utilizing color-based HSV space segmentation for real-time aquatic organism and object identification.",
    longDescription: "Overcame underwater visual degradation challenges (such as light attenuation, turbidity, and color scattering) by implementing custom color-space thresholding in HSV coordinates. Benchmarked and validated across 500+ underwater image sets, achieving a 92% detection accuracy through precision threshold tuning and morphological contour filtering.",
    features: [
      "Robust color-based object segmentation implemented in HSV color space",
      "Calibrated across 500+ real-world underwater images with diverse clarity conditions",
      "Achieved 92% detection accuracy by fine-tuning HSV boundary thresholds"
    ],
    architecturePoints: [
      "HSV color space conversion and dynamic thresholding",
      "OpenCV morphological transformations for clean contours",
      "NumPy vectorized image array manipulations"
    ],
    techStack: ["Python", "OpenCV", "NumPy", "Image Processing", "HSV Segmentation"],
    metrics: "92% Accuracy on 500+ Images",
    liveUrl: "https://github.com/jershika26/underwater-object-detection-of-marine-study",
    githubUrl: "https://github.com/jershika26/underwater-object-detection-of-marine-study",
    featured: true,
    gradient: "from-cyan-500 via-teal-600 to-emerald-600"
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
