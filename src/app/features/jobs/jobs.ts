import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  experienceLevel: string;
  salary: number;
  salaryLabel: string;
  type: string;
  skills: string[];
  postedDate: string;
  postedDaysAgo: number;
  logoInitials: string;
  logoColor: string;
}

interface JobFilters {
  keyword: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  salaryRange: string;
}

type ViewMode = 'grid' | 'list';
type SortOption = 'newest' | 'oldest' | 'salary-high' | 'salary-low' | 'title';

@Component({
  selector: 'app-jobs',
  imports: [FormsModule, RouterLink, MatIconModule],
  templateUrl: './jobs.html',
  styleUrl: './jobs.scss',
})
export class Jobs {
  protected readonly pageSize = 6;
  protected readonly currentPage = signal(1);
  protected readonly viewMode = signal<ViewMode>('grid');
  protected readonly sortBy = signal<SortOption>('newest');
  protected readonly savedJobIds = signal<Set<string>>(new Set());

  protected filterForm: JobFilters = {
    keyword: '',
    location: '',
    employmentType: '',
    experienceLevel: '',
    salaryRange: '',
  };

  private readonly activeFilters = signal<JobFilters>({
    keyword: '',
    location: '',
    employmentType: '',
    experienceLevel: '',
    salaryRange: '',
  });

  protected readonly employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Remote'];
  protected readonly experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Lead'];
  protected readonly salaryRanges = [
    { value: '0-10', label: 'Up to ₹10L' },
    { value: '10-20', label: '₹10L – ₹20L' },
    { value: '20-30', label: '₹20L – ₹30L' },
    { value: '30+', label: '₹30L+' },
  ];
  protected readonly sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'salary-high', label: 'Salary: High to Low' },
    { value: 'salary-low', label: 'Salary: Low to High' },
    { value: 'title', label: 'Title: A to Z' },
  ];

  private readonly allJobs: JobListing[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechNova Solutions',
      location: 'Bangalore, India',
      experience: '4–6 years',
      experienceLevel: 'Senior Level',
      salary: 2200000,
      salaryLabel: '₹18L – ₹24L / year',
      type: 'Full-time',
      skills: ['Angular', 'TypeScript', 'RxJS', 'Bootstrap'],
      postedDate: 'Mar 18, 2026',
      postedDaysAgo: 4,
      logoInitials: 'TN',
      logoColor: '#0d6efd',
    },
    {
      id: '2',
      title: 'Data Scientist',
      company: 'Insight Analytics',
      location: 'Hyderabad, India',
      experience: '3–5 years',
      experienceLevel: 'Mid Level',
      salary: 2400000,
      salaryLabel: '₹20L – ₹28L / year',
      type: 'Full-time',
      skills: ['Python', 'TensorFlow', 'SQL', 'Pandas'],
      postedDate: 'Mar 20, 2026',
      postedDaysAgo: 2,
      logoInitials: 'IA',
      logoColor: '#6610f2',
    },
    {
      id: '3',
      title: 'UI/UX Designer',
      company: 'PixelCraft Studio',
      location: 'Remote',
      experience: '2–4 years',
      experienceLevel: 'Mid Level',
      salary: 1400000,
      salaryLabel: '₹12L – ₹16L / year',
      type: 'Contract',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      postedDate: 'Mar 15, 2026',
      postedDaysAgo: 7,
      logoInitials: 'PC',
      logoColor: '#d63384',
    },
    {
      id: '4',
      title: 'DevOps Engineer',
      company: 'CloudBridge Systems',
      location: 'Pune, India',
      experience: '3–6 years',
      experienceLevel: 'Senior Level',
      salary: 1900000,
      salaryLabel: '₹16L – ₹22L / year',
      type: 'Full-time',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      postedDate: 'Mar 19, 2026',
      postedDaysAgo: 3,
      logoInitials: 'CB',
      logoColor: '#198754',
    },
    {
      id: '5',
      title: 'Cloud Architect',
      company: 'SkyScale Technologies',
      location: 'Chennai, India',
      experience: '7+ years',
      experienceLevel: 'Lead',
      salary: 3000000,
      salaryLabel: '₹25L – ₹35L / year',
      type: 'Full-time',
      skills: ['Azure', 'AWS', 'Terraform', 'Microservices'],
      postedDate: 'Mar 21, 2026',
      postedDaysAgo: 1,
      logoInitials: 'SS',
      logoColor: '#0dcaf0',
    },
    {
      id: '6',
      title: 'Machine Learning Engineer',
      company: 'NeuralEdge AI',
      location: 'Mumbai, India',
      experience: '3–5 years',
      experienceLevel: 'Mid Level',
      salary: 2600000,
      salaryLabel: '₹22L – ₹30L / year',
      type: 'Full-time',
      skills: ['PyTorch', 'NLP', 'MLOps', 'Python'],
      postedDate: 'Mar 17, 2026',
      postedDaysAgo: 5,
      logoInitials: 'NE',
      logoColor: '#fd7e14',
    },
    {
      id: '7',
      title: 'Junior Software Developer',
      company: 'CodeSpring Labs',
      location: 'Bangalore, India',
      experience: '0–2 years',
      experienceLevel: 'Entry Level',
      salary: 800000,
      salaryLabel: '₹6L – ₹10L / year',
      type: 'Full-time',
      skills: ['JavaScript', 'React', 'Git', 'REST APIs'],
      postedDate: 'Mar 14, 2026',
      postedDaysAgo: 8,
      logoInitials: 'CS',
      logoColor: '#20c997',
    },
    {
      id: '8',
      title: 'Product Manager',
      company: 'LaunchPad Inc',
      location: 'Delhi, India',
      experience: '5–8 years',
      experienceLevel: 'Senior Level',
      salary: 2800000,
      salaryLabel: '₹24L – ₹32L / year',
      type: 'Full-time',
      skills: ['Agile', 'Roadmapping', 'Analytics', 'Stakeholder Mgmt'],
      postedDate: 'Mar 16, 2026',
      postedDaysAgo: 6,
      logoInitials: 'LP',
      logoColor: '#6f42c1',
    },
    {
      id: '9',
      title: 'QA Automation Engineer',
      company: 'QualityFirst Tech',
      location: 'Remote',
      experience: '2–4 years',
      experienceLevel: 'Mid Level',
      salary: 1200000,
      salaryLabel: '₹10L – ₹14L / year',
      type: 'Remote',
      skills: ['Selenium', 'Cypress', 'Java', 'Test Planning'],
      postedDate: 'Mar 12, 2026',
      postedDaysAgo: 10,
      logoInitials: 'QF',
      logoColor: '#dc3545',
    },
    {
      id: '10',
      title: 'Backend Developer',
      company: 'DataStream Corp',
      location: 'Hyderabad, India',
      experience: '3–5 years',
      experienceLevel: 'Mid Level',
      salary: 1700000,
      salaryLabel: '₹14L – ₹20L / year',
      type: 'Full-time',
      skills: ['Node.js', 'PostgreSQL', 'Redis', 'GraphQL'],
      postedDate: 'Mar 13, 2026',
      postedDaysAgo: 9,
      logoInitials: 'DS',
      logoColor: '#0d6efd',
    },
    {
      id: '11',
      title: 'Technical Lead',
      company: 'InnovateX',
      location: 'Pune, India',
      experience: '8+ years',
      experienceLevel: 'Lead',
      salary: 3500000,
      salaryLabel: '₹30L – ₹40L / year',
      type: 'Full-time',
      skills: ['Architecture', 'Angular', '.NET', 'Team Leadership'],
      postedDate: 'Mar 20, 2026',
      postedDaysAgo: 2,
      logoInitials: 'IX',
      logoColor: '#6610f2',
    },
    {
      id: '12',
      title: 'Part-time Content Writer',
      company: 'CareerHub Media',
      location: 'Remote',
      experience: '1–3 years',
      experienceLevel: 'Entry Level',
      salary: 500000,
      salaryLabel: '₹4L – ₹6L / year',
      type: 'Part-time',
      skills: ['SEO', 'Copywriting', 'Blogging', 'Research'],
      postedDate: 'Mar 11, 2026',
      postedDaysAgo: 11,
      logoInitials: 'CH',
      logoColor: '#ffc107',
    },
  ];

  protected readonly filteredJobs = computed(() => {
    let jobs = [...this.allJobs];
    const f = this.activeFilters();

    if (f.keyword.trim()) {
      const keyword = f.keyword.toLowerCase();
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(keyword) ||
          job.company.toLowerCase().includes(keyword) ||
          job.skills.some((s) => s.toLowerCase().includes(keyword)),
      );
    }

    if (f.location.trim()) {
      const location = f.location.toLowerCase();
      jobs = jobs.filter((job) => job.location.toLowerCase().includes(location));
    }

    if (f.employmentType) {
      jobs = jobs.filter((job) => job.type === f.employmentType);
    }

    if (f.experienceLevel) {
      jobs = jobs.filter((job) => job.experienceLevel === f.experienceLevel);
    }

    if (f.salaryRange) {
      jobs = jobs.filter((job) => this.matchesSalaryRange(job.salary, f.salaryRange));
    }

    switch (this.sortBy()) {
      case 'oldest':
        jobs.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
        break;
      case 'salary-high':
        jobs.sort((a, b) => b.salary - a.salary);
        break;
      case 'salary-low':
        jobs.sort((a, b) => a.salary - b.salary);
        break;
      case 'title':
        jobs.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        jobs.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    }

    return jobs;
  });

  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredJobs().length / this.pageSize)),
  );

  protected readonly paginatedJobs = computed(() => {
    const page = this.currentPage();
    const start = (page - 1) * this.pageSize;
    return this.filteredJobs().slice(start, start + this.pageSize);
  });

  protected readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1),
  );

  protected applyFilters(): void {
    this.activeFilters.set({ ...this.filterForm });
    this.currentPage.set(1);
  }

  protected clearFilters(): void {
    this.filterForm = {
      keyword: '',
      location: '',
      employmentType: '',
      experienceLevel: '',
      salaryRange: '',
    };
    this.activeFilters.set({ ...this.filterForm });
    this.currentPage.set(1);
  }

  protected setViewMode(mode: ViewMode): void {
    this.viewMode.set(mode);
  }

  protected onSortChange(value: SortOption): void {
    this.sortBy.set(value);
    this.currentPage.set(1);
  }

  protected goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  protected toggleSaveJob(jobId: string): void {
    this.savedJobIds.update((ids) => {
      const updated = new Set(ids);
      if (updated.has(jobId)) {
        updated.delete(jobId);
      } else {
        updated.add(jobId);
      }
      return updated;
    });
  }

  protected isJobSaved(jobId: string): boolean {
    return this.savedJobIds().has(jobId);
  }

  private matchesSalaryRange(salary: number, range: string): boolean {
    const lakhs = salary / 100000;
    switch (range) {
      case '0-10':
        return lakhs <= 10;
      case '10-20':
        return lakhs > 10 && lakhs <= 20;
      case '20-30':
        return lakhs > 20 && lakhs <= 30;
      case '30+':
        return lakhs > 30;
      default:
        return true;
    }
  }
}
