export interface SkillCardItem {
  id: string;
  number: string;
  name: string;
  category: 'all' | 'backend' | 'frontend' | 'languages' | 'databases' | 'ai' | 'tools';
  categoryLabel: string;
  badge: string;
  version: string;
  description: string;
  architectureRole: string;
  keyCapabilities: string[];
  highlightMetric: string;
  highlightMetricLabel: string;
  relatedPills: string[];
}

export const SKILLS_DECK: SkillCardItem[] = [
  {
    id: 'spring-boot',
    number: '01',
    name: 'Spring Boot',
    category: 'backend',
    categoryLabel: 'Backend Engineering',
    badge: 'Core Specialization',
    version: '3.x / Java 21',
    description: 'Enterprise backend orchestration powering decoupled layered MVC microservices, dependency injection, and REST contracts.',
    architectureRole: 'Layered Service/Repository separation with strict DTO validation and transactional integrity.',
    keyCapabilities: [
      'Spring MVC REST controller architecture with standardized error envelopes',
      'Spring Data JPA repository abstraction with connection pooling',
      'Robust middleware error handling contracts and request telemetry',
      'Decoupled Service-Layer design for deterministic unit testability'
    ],
    highlightMetric: 'Sub-80ms',
    highlightMetricLabel: 'API Response Target',
    relatedPills: ['Java 21', 'Spring Data', 'Maven', 'REST', 'Hibernate', 'PostgreSQL']
  },
  {
    id: 'core-java',
    number: '02',
    name: 'Core Java & OOP',
    category: 'languages',
    categoryLabel: 'Programming Language',
    badge: 'Foundational Mastery',
    version: 'JDK 17 / 21 LTS',
    description: 'Rigorous object-oriented software design with modern Java constructs, concurrency primitives, and clean memory models.',
    architectureRole: 'SOLID design principles, design patterns, polymorphic domain modeling, and immutable record classes.',
    keyCapabilities: [
      'Clean inheritance, abstract classes, and decoupled interface contracts',
      'Java Collections Framework with high-throughput algorithmic pipelines',
      'Exception hierarchy modeling with structured fault recovery',
      'Multi-threading foundations and thread-safe data synchronization'
    ],
    highlightMetric: '8.51 CGPA',
    highlightMetricLabel: 'Engineering Honors',
    relatedPills: ['OOPs', 'SOLID', 'JVM', 'Collections', 'Design Patterns']
  },
  {
    id: 'react-js',
    number: '03',
    name: 'React.js',
    category: 'frontend',
    categoryLabel: 'Reactive Frontend',
    badge: 'Production Engine',
    version: 'v18.2+',
    description: 'Component-driven reactive web engineering with immutable state management, custom lifecycle hooks, and high-FPS UI rendering.',
    architectureRole: 'Zero-layout-shift UI architecture, client-side caching, and fluid responsive design systems.',
    keyCapabilities: [
      'Declarative component hierarchies with memoization (React.memo, useMemo)',
      'Custom reactive hook abstractions for decoupled state & API side-effects',
      'Apple Liquid Glass styling with frosted backdrops and specular reflections',
      'Integration with hardware-accelerated Canvas 2D & Framer Motion physics'
    ],
    highlightMetric: '60–120 FPS',
    highlightMetricLabel: 'Smooth Render Physics',
    relatedPills: ['Hooks', 'TypeScript', 'Tailwind', 'Canvas 2D', 'Framer Motion']
  },
  {
    id: 'typescript',
    number: '04',
    name: 'TypeScript',
    category: 'languages',
    categoryLabel: 'Programming Language',
    badge: 'Type Engineering',
    version: 'v5.4+',
    description: 'Strict end-to-end type safety eliminating runtime null dereferences and unifying frontend-to-backend API contract types.',
    architectureRole: 'Strict compiler configurations, disciminated unions, generic constraints, and schema sync.',
    keyCapabilities: [
      'Discriminated union type narrowing and strict exhaustiveness checking',
      'Advanced generics with keyof, typeof, and mapped interface utilities',
      'Synchronized frontend type definitions matching Spring Boot DTO schemas',
      'Zero `any` type policy across core domain logic and reactive state'
    ],
    highlightMetric: '100% Strict',
    highlightMetricLabel: 'Null-Safety Checks',
    relatedPills: ['Strict Mode', 'Generics', 'Type Guards', 'Utility Types', 'DTO Sync']
  },
  {
    id: 'postgresql',
    number: '05',
    name: 'PostgreSQL',
    category: 'databases',
    categoryLabel: 'Relational Database',
    badge: 'ACID Storage',
    version: 'v16.x',
    description: 'Enterprise relational database design featuring normalized schemas, foreign-key cascade integrity, and optimized query plans.',
    architectureRole: 'ACID transactional reliability, B-tree composite indexing, and sub-millisecond query execution.',
    keyCapabilities: [
      '3NF normalized schema design avoiding redundant data duplication',
      'Composite B-Tree indexing on high-frequency query lookup paths',
      'Transactional isolation boundaries preventing race conditions',
      'EXPLAIN ANALYZE query profiling to prevent sequential scan bottlenecks'
    ],
    highlightMetric: '15% Gain',
    highlightMetricLabel: 'Payload Flow Efficiency',
    relatedPills: ['SQL', 'ACID', 'Indexing', 'Transactions', 'Normalization', 'JPA']
  },
  {
    id: 'supabase',
    number: '06',
    name: 'Supabase Cloud',
    category: 'databases',
    categoryLabel: 'Cloud Database',
    badge: 'Cloud Postgres',
    version: 'v2.x Cloud',
    description: 'Managed PostgreSQL cloud infrastructure with instant REST endpoints, realtime subscriptions, and secure access policies.',
    architectureRole: 'Serverless PostgreSQL deployment with Row Level Security (RLS) and real-time state broadcasts.',
    keyCapabilities: [
      'Automated schema migrations and connection pool configuration',
      'Real-time WebSocket event triggers for live application sync',
      'Fine-grained Row Level Security (RLS) data governance policies',
      'Cloud database backups and automated indexing health monitoring'
    ],
    highlightMetric: '99.9% Uptime',
    highlightMetricLabel: 'Cloud SLA Reliability',
    relatedPills: ['PostgreSQL', 'RLS Policies', 'WebSockets', 'Cloud SQL', 'Realtime']
  },
  {
    id: 'rest-apis',
    number: '07',
    name: 'REST Architecture',
    category: 'backend',
    categoryLabel: 'API Engineering',
    badge: 'Contract Design',
    version: 'RESTful 2.0',
    description: 'Design and consumption of standard HTTP/REST endpoints with status code semantics, payload paging, and deterministic errors.',
    architectureRole: 'Stateless resource-oriented URI design, unified response envelopes, and pagination telemetry.',
    keyCapabilities: [
      'Semantic HTTP verbs (GET, POST, PUT, PATCH, DELETE) with idempotency',
      'Consistent JSON error payload schemas with field-level validation traces',
      'Query-parameter filtering, cursor pagination, and response chunking',
      'Decoupled client-side consumption via Axios with interceptor logging'
    ],
    highlightMetric: '100% REST',
    highlightMetricLabel: 'Idempotency Standard',
    relatedPills: ['HTTP/2', 'JSON', 'Axios', 'Swagger/OpenAPI', 'Interceptors']
  },
  {
    id: 'jpa-hibernate',
    number: '08',
    name: 'JPA & Hibernate',
    category: 'backend',
    categoryLabel: 'ORM Architecture',
    badge: 'Data Abstraction',
    version: 'Jakarta 3.1',
    description: 'Object-Relational Mapping bridge between Java entity models and SQL schemas with lazy-loading strategies and dirty checking.',
    architectureRole: 'Mitigating N+1 select queries via JOIN FETCH queries and controlling transaction boundaries.',
    keyCapabilities: [
      'Entity relationship mappings: @OneToMany, @ManyToOne, and @JoinTable',
      'JPQL query optimization preventing query explosion bottlenecks',
      'First & second-level caching for high-frequency reference lookups',
      'Auditing entity listeners with automatic created/updated timestamps'
    ],
    highlightMetric: 'Zero N+1',
    highlightMetricLabel: 'Optimized Fetch Plans',
    relatedPills: ['JPA', 'JPQL', 'Hibernate', 'Entity Graph', 'Connection Pools']
  },
  {
    id: 'python',
    number: '09',
    name: 'Python',
    category: 'languages',
    categoryLabel: 'Programming Language',
    badge: 'Analytical Computing',
    version: 'v3.11+',
    description: 'Versatile engineering language utilized for computer vision pipelines, machine learning model training, and microservice APIs.',
    architectureRole: 'Data transformation, image matrix computations with NumPy, and lightweight microservices.',
    keyCapabilities: [
      'NumPy multi-dimensional matrix operations for real-time video frames',
      'Object detection pipeline orchestration with OpenCV and model inference',
      'Lightweight backend service deployment with Flask API endpoints',
      'Clean functional scripts for dataset annotation and benchmark profiling'
    ],
    highlightMetric: '3 Full Stack',
    highlightMetricLabel: 'Internship Apps Built',
    relatedPills: ['NumPy', 'Flask', 'OpenCV', 'Pandas', 'OOPs Python']
  },
  {
    id: 'opencv-vision',
    number: '10',
    name: 'OpenCV Computer Vision',
    category: 'ai',
    categoryLabel: 'Applied AI & Vision',
    badge: 'Visual Analytics',
    version: 'v4.x',
    description: 'Computer vision framework for underwater object segmentation, adaptive color-space thresholding, and geometric contour analysis.',
    architectureRole: 'HSV color conversion, Gaussian blur filtering, morphological opening/closing, and bounding box computation.',
    keyCapabilities: [
      'Robust underwater color-space transformation (BGR to HSV/LAB)',
      'Noise attenuation via bilateral filtering and morphological kernels',
      'Real-time contour extraction and pixel-area geometric classification',
      'High-throughput video stream frame-by-frame processing'
    ],
    highlightMetric: '92% Accuracy',
    highlightMetricLabel: 'Tested on 500+ Images',
    relatedPills: ['HSV Space', 'Contours', 'Morphology', 'Thresholding', 'Video Stream']
  },
  {
    id: 'yolo-detection',
    number: '11',
    name: 'YOLO Object Tracking',
    category: 'ai',
    categoryLabel: 'Applied AI & Vision',
    badge: 'Neural Inference',
    version: 'YOLOv8',
    description: 'Deep learning real-time object detection and spatial tracking framework deployed for vehicle and maritime object identification.',
    architectureRole: 'Single-pass convolutional feature extraction, non-max suppression (NMS), and centroid spatial tracking.',
    keyCapabilities: [
      'Pretrained weight fine-tuning on domain-specific bounding box datasets',
      'Non-Maximum Suppression (NMS) confidence score optimization',
      'Centroid-based multi-frame temporal object tracking and counting',
      'Inference telemetry streaming to REST monitoring dashboards'
    ],
    highlightMetric: 'Realtime',
    highlightMetricLabel: 'Inference Velocity',
    relatedPills: ['Deep Learning', 'Bounding Boxes', 'NMS', 'Centroid Tracking', 'Inference']
  },
  {
    id: 'xgboost-ml',
    number: '12',
    name: 'XGBoost & Predictive ML',
    category: 'ai',
    categoryLabel: 'Applied AI & Vision',
    badge: 'Predictive Modeling',
    version: 'v2.x',
    description: 'Gradient boosted decision tree library engineered for structured tabular data classification and traffic congestion forecasting.',
    architectureRole: 'Feature engineering, hyperparameter cross-validation, and high-precision regression modeling.',
    keyCapabilities: [
      'Time-series feature extraction (lag variables, moving averages, rush hour tags)',
      'Regularized gradient boosting minimizing overfitting on sparse data',
      'K-fold cross-validation and hyperparameter grid tuning',
      'Model serialization and live prediction scoring integration'
    ],
    highlightMetric: 'High Precision',
    highlightMetricLabel: 'Traffic Forecasting',
    relatedPills: ['Gradient Boosting', 'Scikit-Learn', 'Feature Engineering', 'K-Fold']
  },
  {
    id: 'mysql',
    number: '13',
    name: 'MySQL',
    category: 'databases',
    categoryLabel: 'Relational Database',
    badge: 'Relational Store',
    version: 'v8.0',
    description: 'Enterprise relational database management system with InnoDB engine, primary key indexing, and relational schema normalization.',
    architectureRole: 'Structured relational storage, complex inner/outer join query execution, and foreign key cascades.',
    keyCapabilities: [
      'InnoDB storage engine table tuning with row-level locking',
      'Complex multi-table SQL queries with aggregated grouping operations',
      'Database connection pooling with HikariCP in Java backends',
      'Database user access privilege isolation and backup scripts'
    ],
    highlightMetric: 'InnoDB Engine',
    highlightMetricLabel: 'Row-Level Locking',
    relatedPills: ['SQL', 'Relational', 'InnoDB', 'HikariCP', 'Schemas']
  },
  {
    id: 'git-github',
    number: '14',
    name: 'Git & Version Control',
    category: 'tools',
    categoryLabel: 'Developer Tooling',
    badge: 'Workflow Standard',
    version: 'v2.4x',
    description: 'Distributed version control with feature branching, conventional commits, pull request peer reviews, and clean rebase merges.',
    architectureRole: 'Deterministic codebase version history, conflict resolution, and atomic feature branch releases.',
    keyCapabilities: [
      'Git feature branching workflows (git flow) for clean change isolation',
      'Atomic commits adhering to conventional commit specifications',
      'Interactive rebasing, stash management, and clean merge history',
      'GitHub repository management, issue tracking, and markdown documentation'
    ],
    highlightMetric: 'Clean History',
    highlightMetricLabel: 'Conventional Commits',
    relatedPills: ['Git Flow', 'Rebase', 'GitHub', 'Pull Requests', 'Version Control']
  },
  {
    id: 'docker-containers',
    number: '15',
    name: 'Docker & Containers',
    category: 'tools',
    categoryLabel: 'Developer Tooling',
    badge: 'DevOps & Sandbox',
    version: 'v26.x',
    description: 'Containerized application packaging ensuring identical local runtime environments for Spring Boot, PostgreSQL, and React services.',
    architectureRole: 'Multi-stage Dockerfile builds, port forwarding, and lightweight containerized database sandboxes.',
    keyCapabilities: [
      'Multi-stage Dockerfile configurations minimizing final production image sizes',
      'Containerized PostgreSQL and Supabase local testing instances',
      'Environment variable injection separating secrets from image binaries',
      'Host port binding and volume mounting for persistent database files'
    ],
    highlightMetric: 'Isolated',
    highlightMetricLabel: 'Zero Environment Drift',
    relatedPills: ['Containers', 'Dockerfile', 'Port Binding', 'Sandbox', 'Volumes']
  },
  {
    id: 'postman-api',
    number: '16',
    name: 'Postman & API Testing',
    category: 'tools',
    categoryLabel: 'Developer Tooling',
    badge: 'API Verification',
    version: 'v11.x',
    description: 'API testing platform used for automated contract verification, environment variable chaining, and payload load verification.',
    architectureRole: 'Automated test scripts for status assertions, JSON response schema verification, and authentication header chaining.',
    keyCapabilities: [
      'Automated JavaScript test assertions (pm.response.to.have.status(200))',
      'Environment collection variable propagation across multi-step API flows',
      'Mock server setups for decoupled frontend feature development',
      'Exportable Postman collection definitions for developer documentation'
    ],
    highlightMetric: '100% Passed',
    highlightMetricLabel: 'Endpoint Contracts',
    relatedPills: ['Collections', 'Test Scripts', 'Mock Servers', 'Environment Vars']
  }
];

export const SKILL_CATEGORIES_TABS = [
  { id: 'all', label: 'All Stack (16)' },
  { id: 'backend', label: 'Backend (3)' },
  { id: 'frontend', label: 'Frontend (1)' },
  { id: 'languages', label: 'Languages (3)' },
  { id: 'databases', label: 'Databases (3)' },
  { id: 'ai', label: 'AI & Vision (3)' },
  { id: 'tools', label: 'Tooling (3)' }
] as const;
