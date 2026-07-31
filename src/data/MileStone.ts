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
    description: 'Bachelor of Computer Applications, CGPA 8.5/10. Graduated June 2026.',
    date: '2023–2026',
    icon: 'GraduationCap',
    category: 'education',
  },
  {
    id: 'sam-internship',
    title: 'Web Developer Intern — Sam Data Services',
    description: 'Led QA and regression testing across a full release cycle. Delivered an SEO-optimised .NET site and a WooCommerce store with payment gateway integration.',
    date: 'Jan 2025 – Nov 2025',
    icon: 'Briefcase',
    category: 'career',
  },
  {
    id: 'deloitte-forage',
    title: 'Deloitte Technology Consulting (Forage)',
    description: 'Virtual internship in cloud infrastructure and data analysis for enterprise consulting.',
    date: '2025',
    icon: 'Building2',
    category: 'career',
  },
  {
    id: 'mckinsey',
    title: 'McKinsey Forward Program — Alumni',
    description: 'Selected for McKinsey\'s global accelerator program focused on problem-solving, leadership, and communication.',
    date: '2025',
    icon: 'Award',
    category: 'career',
  },
  {
    id: 'hiffai-role',
    title: 'Data Modeler & Analytics Engineer — Hiffai Tech Solutions',
    description: 'Designing enterprise Erwin data models across bronze → silver → gold layers. Built and deployed the production STTM automation tool for Snowflake and Databricks. Promoted from freelance to full-time after shipping a React + TypeScript app.',
    date: 'Nov 2025 – Present',
    icon: 'Database',
    category: 'career',
  },
  {
    id: 'healthcare-pipeline',
    title: 'Healthcare Governance Pipeline — Shipped',
    description: 'End-to-end Bronze → Silver → Gold pipeline on WHO + NDAP India data. 8 dbt models, 31 automated tests, GitHub Actions CI/CD — all passing.',
    date: '2025',
    icon: 'Rocket',
    category: 'project',
  },
  {
    id: 'sttm-launch',
    title: 'Auto STTM Engine — In Production',
    description: 'Python tool that queries live Snowflake and Databricks metadata to auto-generate Source-to-Target Mapping docs. Replaced a fully manual workflow.',
    date: '2025–Present',
    icon: 'Rocket',
    category: 'project',
  },
];

export const skills = [
  { name: 'dbt / SQL', level: 90 },
  { name: 'Data Modeling (Erwin)', level: 88 },
  { name: 'Snowflake / Databricks', level: 82 },
  { name: 'Python', level: 85 },
  { name: 'GitHub Actions CI/CD', level: 80 },
  { name: 'Data Quality & Testing', level: 85 },
  { name: 'Azure / AWS Cloud', level: 72 },
  { name: 'Node.js / TypeScript', level: 78 },
];
