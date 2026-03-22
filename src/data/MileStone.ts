export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  category: 'education' | 'career' | 'certification' | 'project';
}

export const milestones: Milestone[] = [
  {
    id: 'degree',
    title: 'BCA — Osmania University',
    description: 'Pursuing Computer Applications with 8.5 CGPA, focusing on data structures and cloud computing.',
    date: '2023–2026',
    icon: 'GraduationCap',
    category: 'education',
  },
  {
    id: 'sam-internship',
    title: 'Web Developer Intern — Sam Data Services',
    description: 'Delivered frontend updates, chatbot integration, WordPress management, and SEO enhancements.',
    date: '2025',
    icon: 'Briefcase',
    category: 'career',
  },
  {
    id: 'deloitte-forage',
    title: 'Deloitte Technology Consulting (Forage)',
    description: 'Completed simulations in cloud infrastructure and data analysis for enterprise consulting.',
    date: '2025',
    icon: 'Building2',
    category: 'career',
  },
  {
    id: 'azure-fundamentals',
    title: 'Microsoft Azure Fundamentals',
    description: 'Cloud architecture and infrastructure-as-code with Terraform on Azure.',
    date: '2024',
    icon: 'Cloud',
    category: 'certification',
  },
  {
    id: 'mckinsey',
    title: 'McKinsey Forward Program',
    description: 'Selected for McKinsey\'s accelerator program for problem-solving and leadership.',
    date: '2025',
    icon: 'Award',
    category: 'career',
  },
  {
    id: 'hiffai-role',
    title: 'Software Engineer & Data Modeler — Hiffai Tech',
    description: 'Designing schema mapping tools using Erwin, developing STTM automation tool.',
    date: '2026–Present',
    icon: 'Database',
    category: 'career',
  },
  {
    id: 'aws-ml',
    title: 'AWS ML Engineer (In Progress)',
    description: 'Targeting AWS Certified Machine Learning Engineer – Associate by August 2026.',
    date: '2026',
    icon: 'Rocket',
    category: 'certification',
  },
  {
    id: 'sttm-launch',
    title: 'STTM Tool — In Production',
    description: 'Production automation tool for document processing with Python and cloud services.',
    date: '2026–Present',
    icon: 'Rocket',
    category: 'project',
  },
  {
    id: 'nids',
    title: 'Network Intrusion Detection System',
    description: 'Built an ML-based intrusion detection system using SVM and ANN on the NSL-KDD dataset for classifying network traffic as normal or malicious.',
    date: '2025',
    icon: 'Shield',
    category: 'project',
  },
];

export const skills = [
  { name: 'React / TypeScript', level: 90 },
  { name: 'Python', level: 85 },
  { name: 'Erwin Data Modeling', level: 85 },
  { name: 'AWS / Azure Cloud', level: 75 },
  { name: 'SQL / Databases', level: 80 },
  { name: 'Docker / Terraform', level: 60 },
  { name: 'Machine Learning', level: 65 },
  { name: 'UI/UX Design', level: 70 },
];
