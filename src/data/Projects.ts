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

export const folders = ['Analytics Engineering', 'Data Modeling', 'Machine Learning'] as const;

export const projects: Project[] = [
  {
    id: 'healthcare-pipeline',
    title: 'Healthcare Governance Pipeline',
    shortDescription: 'Bronze → Silver → Gold dbt pipeline on WHO + NDAP India data',
    fullDescription:
      'End-to-end dbt pipeline combining WHO Global Health Observatory data (180+ countries) with NDAP India disease incidence datasets. 8 dbt models and 31 automated tests (not_null, unique, accepted_values, referential integrity) — all passing. GitHub Actions CI/CD runs on every push. Gold layer surfaces malaria burden per health centre, state risk tiers, and year-over-year trends.',
    problem:
      'Two independent government datasets had systematic state-name corruption across 34 states, grain mismatches, and schema misalignment — blocking any credible cross-source analytics.',
    solution:
      'Designed a medallion (bronze/silver/gold) architecture in dbt with reference tables to normalise state names, resolved grain mismatches with intermediate models, and enforced correctness with 31 automated tests wired into GitHub Actions CI on every push.',
    techStack: ['dbt', 'DuckDB', 'Python', 'GitHub Actions', 'SQL'],
    tags: ['data', 'analytics', 'governance', 'automation'],
    icon: 'FileText',
    folder: 'Analytics Engineering',
    links: { github: 'https://github.com/FarheenSultana0615/healthcare-governance-pipeline' },
    date: '2025',
    milestone: true,
  },
  {
    id: 'sttm-tool',
    title: 'Auto STTM Engine',
    shortDescription: 'Live Snowflake & Databricks metadata → auto-generated STTM docs',
    fullDescription:
      'Production automation tool that queries live Snowflake and Databricks schema metadata via SQL to auto-generate Source-to-Target Mapping documentation. Actively used at Hiffai Tech Solutions, replacing a fully manual documentation workflow.',
    problem:
      'STTM documentation was maintained by hand across dozens of tables — slow, error-prone, and drifted out of sync with the actual warehouse schemas.',
    solution:
      'Built a Python engine that reads live metadata from Snowflake and Databricks (INFORMATION_SCHEMA, table + column lineage), normalises it, and emits structured STTM documents ready for review. Deployed to production and adopted by the data team.',
    techStack: ['Python', 'Snowflake', 'Databricks', 'SQL', 'Metadata APIs'],
    tags: ['data', 'automation', 'modeling', 'governance'],
    icon: 'Database',
    folder: 'Data Modeling',
    links: { github: 'https://github.com/FarheenSultana0615' },
    date: '2025–Present',
    milestone: true,
  },
  {
    id: 'naming-compliance',
    title: 'Naming Compliance Engine',
    shortDescription: 'Enterprise governance app enforcing data asset naming conventions',
    fullDescription:
      'Enterprise Node.js application that enforces data asset naming conventions with OAuth and secure licensing flows — a practical implementation of data governance controls used inside enterprise data platforms.',
    problem:
      'Naming conventions for data assets drifted across teams, breaking search, lineage, and downstream contracts.',
    solution:
      'Built a Node.js + MongoDB service with OAuth-secured APIs that validates asset names against configurable rules, surfaces violations in a review UI, and gates check-in through licensing flows.',
    techStack: ['Node.js', 'MongoDB', 'OAuth', 'REST API'],
    tags: ['backend', 'governance', 'data', 'automation'],
    icon: 'Shield',
    folder: 'Data Modeling',
    links: { github: 'https://github.com/FarheenSultana0615' },
    date: '2025',
  },
  {
    id: 'nids',
    title: 'Network Intrusion Detection System',
    shortDescription: 'ANN classifier hitting 98.46% on the NSL-KDD benchmark',
    fullDescription:
      'Artificial Neural Network classifier achieving 98.46% accuracy on the NSL-KDD benchmark dataset. Applied full data preprocessing (normalisation, one-hot encoding), feature selection, and model evaluation (precision, recall, F1) — foundation work in structured data analysis and model evaluation.',
    problem:
      'NSL-KDD has imbalanced classes across DoS, Probe, R2L, and U2R attack categories, so raw accuracy is misleading — the model needs to actually generalise across attack types.',
    solution:
      'Preprocessed the dataset (normalisation, one-hot encoding), evaluated SVM and ANN classifiers, tuned ANN hyperparameters, and validated with precision/recall/F1 per class — reaching 98.46% accuracy with strong per-class performance.',
    techStack: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy'],
    tags: ['AI', 'ML', 'data', 'security'],
    icon: 'Shield',
    folder: 'Machine Learning',
    links: { github: 'https://github.com/FarheenSultana0615' },
    date: '2025',
    milestone: true,
  },
];
