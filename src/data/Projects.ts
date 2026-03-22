export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  techStack: string[];
  tags: string[];
  icon: string;
  folder: string;
  links: {
    demo?: string;
    github?: string;
  };
  date: string;
  milestone?: boolean;
}

export const folders = ['Web Apps', 'Data & AI', 'Cloud & Infra'] as const;

export const projects: Project[] = [
  {
    id: 'sttm-tool',
    title: 'STTM Document Automation',
    shortDescription: 'Production tool for automated document processing',
    fullDescription: 'A full-scale automation tool that transforms manual document processing workflows into intelligent, schema-driven pipelines with scalability and reliability at its core.',
    problem: 'Manual document processing consumed hours of analyst time with high error rates and inconsistent outputs.',
    solution: 'Designed data schemas and automated pipelines using Python and cloud services, leveraging software engineering best practices for backend automation.',
    techStack: ['Python', 'AWS Lambda', 'Erwin', 'PostgreSQL'],
    tags: ['data', 'AI', 'backend', 'automation'],
    icon: 'FileText',
    folder: 'Data & AI',
    links: { github: 'https://github.com/FarheenSultana0615' },
    date: '2024–Present',
    milestone: true,
  },
  {
    id: 'chatbot-site',
    title: 'React + Chatbot Website',
    shortDescription: 'Full-stack site with integrated chatbot for startup client',
    fullDescription: 'Developed a full-stack website using React, TypeScript, and Vite with chatbot integration that exceeded client expectations and directly led to a job offer.',
    problem: 'Startup client needed a professional web presence with interactive engagement beyond a static site.',
    solution: 'Built a performant React+TypeScript website with chatbot functionality, delivered ahead of schedule, significantly enhancing user engagement.',
    techStack: ['React', 'TypeScript', 'Vite', 'Chatbot API'],
    tags: ['frontend', 'design', 'UX', 'AI'],
    icon: 'Bot',
    folder: 'Web Apps',
    links: { github: 'https://github.com/FarheenSultana0615' },
    date: '2025',
    milestone: true,
  },
  {
    id: 'cloud-network',
    title: 'Cloud Network Architecture',
    shortDescription: 'Secure Azure cloud network with Terraform IaC',
    fullDescription: 'Designed a secure cloud network on Azure using virtual networks, subnets, and security groups with infrastructure-as-code for automated provisioning.',
    problem: 'Needed to simulate and understand enterprise cloud networking with security-first architecture.',
    solution: 'Configured virtual networks, firewall rules, and routing using Terraform on Azure, simulating a real enterprise environment.',
    techStack: ['Azure', 'Terraform', 'Networking', 'Security Groups'],
    tags: ['backend', 'data', 'automation'],
    icon: 'Cloud',
    folder: 'Cloud & Infra',
    links: { github: 'https://github.com/FarheenSultana0615' },
    date: '2024',
  },
  {
    id: 'farheenos',
    title: 'FarheenOS Portfolio',
    shortDescription: 'Interactive desktop-environment portfolio site',
    fullDescription: 'A retro-futuristic desktop OS portfolio with draggable windows, a recommendation engine, and a 3D museum — the site you\'re exploring right now.',
    problem: 'Traditional portfolios fail to demonstrate system design and interactive engineering skills.',
    solution: 'Built a full desktop environment with Zustand state management, react-rnd windows, Three.js museum, and a recommendation quiz.',
    techStack: ['React', 'TypeScript', 'Three.js', 'Zustand', 'Tailwind'],
    tags: ['frontend', 'design', 'UX'],
    icon: 'Monitor',
    folder: 'Web Apps',
    links: { demo: '#', github: 'https://github.com/FarheenSultana0615' },
    date: '2025',
    milestone: true,
  },
  {
    id: 'erwin-schemas',
    title: 'Enterprise Data Modeling',
    shortDescription: 'Schema mapping tools using Erwin for enterprise data',
    fullDescription: 'Designing and implementing schema mapping tools using Erwin for enterprise data modeling, collaborating with engineering teams to optimize database structures.',
    problem: 'Fragmented database structures caused performance issues and inconsistent data across teams.',
    solution: 'Architected unified data schemas using Erwin, optimizing database structures for performance and consistency.',
    techStack: ['Erwin', 'SQL', 'PostgreSQL', 'Data Modeling'],
    tags: ['data', 'backend'],
    icon: 'Database',
    folder: 'Data & AI',
    links: {},
    date: '2026',
  },
  {
    id: 'nids',
    title: 'Network Intrusion Detection System',
    shortDescription: 'ML-based network intrusion detection using SVM & ANN',
    fullDescription: 'Built a machine learning model to detect network intrusions using the NSL-KDD dataset (a standard benchmark for intrusion detection). Implemented and compared two algorithms: Support Vector Machine (SVM) and Artificial Neural Network (ANN). Preprocessed data (normalization, encoding) and evaluated models using accuracy, precision, recall, and F1-score. Achieved 94% accuracy with ANN, demonstrating ability to apply ML to cybersecurity problems.',
    problem: 'Network security requires real-time detection of intrusions, but manual monitoring is impractical at scale. The NSL-KDD dataset contains imbalanced classes across DoS, Probe, R2L, and U2R attack categories.',
    solution: 'Built and compared SVM and ANN classifiers on the NSL-KDD dataset. Applied data preprocessing (normalization, one-hot encoding), feature selection, and hyperparameter tuning. ANN achieved superior accuracy with better generalization across attack types. Understood feature importance, model tuning, and challenges of imbalanced data in security applications.',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'TensorFlow'],
    tags: ['AI', 'data', 'backend', 'automation'],
    icon: 'Shield',
    folder: 'Data & AI',
    links: { github: 'https://github.com/FarheenSultana0615' },
    date: '2025',
    milestone: true,
  },
];
