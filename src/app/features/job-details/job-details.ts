import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs';

interface JobDetail {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  postedDate: string;
  logoInitials: string;
  logoColor: string;
  workingMode: string;
  vacancyCount: number;
  description: string;
  responsibilities: string[];
  skills: string[];
  qualifications: string[];
  benefits: string[];
  aboutCompany: string;
}

interface RelatedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  logoInitials: string;
  logoColor: string;
}

@Component({
  selector: 'app-job-details',
  imports: [RouterLink, MatIconModule],
  templateUrl: './job-details.html',
  styleUrl: './job-details.scss',
})
export class JobDetails {
  private readonly route = inject(ActivatedRoute);

  private readonly jobId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? '1')),
    { initialValue: '1' },
  );

  private readonly jobsCatalog: Record<string, JobDetail> = {
    '1': {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechNova Solutions',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '4–6 years',
      salary: '₹18L – ₹24L / year',
      postedDate: 'March 18, 2026',
      logoInitials: 'TN',
      logoColor: '#0d6efd',
      workingMode: 'Hybrid',
      vacancyCount: 3,
      description:
        'TechNova Solutions is looking for a Senior Frontend Developer to build scalable, high-performance web applications. You will collaborate with product, design, and backend teams to deliver exceptional user experiences using modern frontend technologies.',
      responsibilities: [
        'Design and develop responsive web applications using Angular and TypeScript.',
        'Collaborate with UX designers to implement pixel-perfect interfaces.',
        'Optimize application performance and ensure cross-browser compatibility.',
        'Conduct code reviews and mentor junior developers.',
        'Participate in agile ceremonies and contribute to technical decisions.',
      ],
      skills: ['Angular', 'TypeScript', 'RxJS', 'HTML5', 'SCSS', 'Bootstrap', 'REST APIs'],
      qualifications: [
        "Bachelor's degree in Computer Science or equivalent experience.",
        '4+ years of professional frontend development experience.',
        'Strong understanding of component-based architecture.',
        'Experience with unit testing and CI/CD workflows.',
      ],
      benefits: [
        'Health insurance for employee and dependents',
        'Flexible working hours and hybrid work model',
        'Annual learning budget of ₹50,000',
        'Performance bonuses and stock options',
        'Paid time off and festival holidays',
      ],
      aboutCompany:
        'TechNova Solutions is a fast-growing product company specializing in enterprise SaaS platforms. With 500+ employees across India, we empower businesses with innovative digital solutions and maintain a culture of continuous learning and innovation.',
    },
    '2': {
      id: '2',
      title: 'Data Scientist',
      company: 'Insight Analytics',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '3–5 years',
      salary: '₹20L – ₹28L / year',
      postedDate: 'March 20, 2026',
      logoInitials: 'IA',
      logoColor: '#6610f2',
      workingMode: 'On-site',
      vacancyCount: 2,
      description:
        'Join Insight Analytics to build predictive models and data-driven solutions that impact business outcomes. You will work with large datasets and deploy ML models into production environments.',
      responsibilities: [
        'Develop and deploy machine learning models for business use cases.',
        'Perform exploratory data analysis and feature engineering.',
        'Collaborate with engineering teams to integrate models into products.',
        'Present findings and recommendations to stakeholders.',
        'Maintain documentation and best practices for data science workflows.',
      ],
      skills: ['Python', 'TensorFlow', 'SQL', 'Pandas', 'Scikit-learn', 'Statistics'],
      qualifications: [
        "Master's degree in Data Science, Statistics, or related field.",
        '3+ years of experience in applied machine learning.',
        'Proficiency in Python and SQL.',
        'Strong communication and problem-solving skills.',
      ],
      benefits: [
        'Comprehensive medical coverage',
        'Conference and certification sponsorship',
        'Remote work options on Fridays',
        'Team offsites and hackathons',
      ],
      aboutCompany:
        'Insight Analytics partners with Fortune 500 companies to transform raw data into actionable insights. Our team of 200+ data professionals delivers cutting-edge analytics solutions across finance, healthcare, and retail.',
    },
    '3': {
      id: '3',
      title: 'UI/UX Designer',
      company: 'PixelCraft Studio',
      location: 'Remote',
      type: 'Contract',
      experience: '2–4 years',
      salary: '₹12L – ₹16L / year',
      postedDate: 'March 15, 2026',
      logoInitials: 'PC',
      logoColor: '#d63384',
      workingMode: 'Remote',
      vacancyCount: 1,
      description:
        'PixelCraft Studio seeks a creative UI/UX Designer to craft intuitive digital experiences for web and mobile products. You will own the design process from research to high-fidelity prototypes.',
      responsibilities: [
        'Create wireframes, prototypes, and high-fidelity designs.',
        'Conduct user research and usability testing.',
        'Maintain and evolve design systems and style guides.',
        'Collaborate closely with developers during implementation.',
        'Present design concepts to clients and internal stakeholders.',
      ],
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
      qualifications: [
        "Bachelor's degree in Design or equivalent portfolio.",
        '2+ years of UI/UX design experience.',
        'Strong portfolio demonstrating web and mobile projects.',
        'Excellent visual design and typography skills.',
      ],
      benefits: [
        'Fully remote work environment',
        'Flexible contract duration with extension options',
        'Creative tools and software licenses provided',
        'Referral bonuses',
      ],
      aboutCompany:
        'PixelCraft Studio is a boutique design agency serving startups and mid-size companies. We believe great design drives business growth and user satisfaction.',
    },
  };

  private readonly defaultJob: JobDetail = {
    id: '0',
    title: 'Software Engineer',
    company: 'Career Portal Partner',
    location: 'India',
    type: 'Full-time',
    experience: '2–5 years',
    salary: '₹10L – ₹18L / year',
    postedDate: 'March 1, 2026',
    logoInitials: 'CP',
    logoColor: '#0d6efd',
    workingMode: 'Hybrid',
    vacancyCount: 1,
    description:
      'We are seeking a talented Software Engineer to join our growing engineering team. You will contribute to building robust applications and work in a collaborative, agile environment.',
    responsibilities: [
      'Write clean, maintainable, and well-tested code.',
      'Collaborate with cross-functional teams to deliver features.',
      'Participate in code reviews and technical discussions.',
      'Troubleshoot and resolve production issues.',
    ],
    skills: ['JavaScript', 'TypeScript', 'Angular', 'Node.js', 'Git'],
    qualifications: [
      "Bachelor's degree in Computer Science or related field.",
      '2+ years of software development experience.',
      'Strong problem-solving abilities.',
    ],
    benefits: [
      'Competitive salary and benefits',
      'Professional development opportunities',
      'Collaborative team culture',
    ],
    aboutCompany:
      'Our partner companies are industry leaders committed to innovation, employee growth, and building products that make a difference.',
  };

  private readonly relatedJobsPool: RelatedJob[] = [
    {
      id: '4',
      title: 'DevOps Engineer',
      company: 'CloudBridge Systems',
      location: 'Pune, India',
      salary: '₹16L – ₹22L / year',
      logoInitials: 'CB',
      logoColor: '#198754',
    },
    {
      id: '5',
      title: 'Cloud Architect',
      company: 'SkyScale Technologies',
      location: 'Chennai, India',
      salary: '₹25L – ₹35L / year',
      logoInitials: 'SS',
      logoColor: '#0dcaf0',
    },
    {
      id: '6',
      title: 'Machine Learning Engineer',
      company: 'NeuralEdge AI',
      location: 'Mumbai, India',
      salary: '₹22L – ₹30L / year',
      logoInitials: 'NE',
      logoColor: '#fd7e14',
    },
    {
      id: '7',
      title: 'Junior Software Developer',
      company: 'CodeSpring Labs',
      location: 'Bangalore, India',
      salary: '₹6L – ₹10L / year',
      logoInitials: 'CS',
      logoColor: '#20c997',
    },
    {
      id: '10',
      title: 'Backend Developer',
      company: 'DataStream Corp',
      location: 'Hyderabad, India',
      salary: '₹14L – ₹20L / year',
      logoInitials: 'DS',
      logoColor: '#0d6efd',
    },
  ];

  protected readonly job = computed(() => {
    const id = this.jobId();
    const detail = this.jobsCatalog[id] ?? {
      ...this.defaultJob,
      id: id ?? '0',
    };
    return detail;
  });

  protected readonly relatedJobs = computed(() =>
    this.relatedJobsPool.filter((j) => j.id !== this.jobId()).slice(0, 3),
  );

  protected copyJobLink(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
  }
}
