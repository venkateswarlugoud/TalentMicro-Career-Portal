import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface JobCategory {
  name: string;
  icon: string;
  jobCount: number;
}

interface FeaturedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  logoInitials: string;
  logoColor: string;
}

interface FeatureHighlight {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterLink, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected searchKeyword = '';
  protected searchLocation = '';

  protected readonly categories: JobCategory[] = [
    { name: 'Software Development', icon: 'code', jobCount: 245 },
    { name: 'Data Science', icon: 'analytics', jobCount: 128 },
    { name: 'UI/UX Design', icon: 'design_services', jobCount: 89 },
    { name: 'DevOps', icon: 'settings_suggest', jobCount: 76 },
    { name: 'Cloud', icon: 'cloud', jobCount: 112 },
    { name: 'AI / Machine Learning', icon: 'psychology', jobCount: 94 },
  ];

  protected readonly featuredJobs: FeaturedJob[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechNova Solutions',
      location: 'Bangalore, India',
      type: 'Full-time',
      salary: '₹18L – ₹24L / year',
      logoInitials: 'TN',
      logoColor: '#0d6efd',
    },
    {
      id: '2',
      title: 'Data Scientist',
      company: 'Insight Analytics',
      location: 'Hyderabad, India',
      type: 'Full-time',
      salary: '₹20L – ₹28L / year',
      logoInitials: 'IA',
      logoColor: '#6610f2',
    },
    {
      id: '3',
      title: 'UI/UX Designer',
      company: 'PixelCraft Studio',
      location: 'Remote',
      type: 'Contract',
      salary: '₹12L – ₹16L / year',
      logoInitials: 'PC',
      logoColor: '#d63384',
    },
    {
      id: '4',
      title: 'DevOps Engineer',
      company: 'CloudBridge Systems',
      location: 'Pune, India',
      type: 'Full-time',
      salary: '₹16L – ₹22L / year',
      logoInitials: 'CB',
      logoColor: '#198754',
    },
    {
      id: '5',
      title: 'Cloud Architect',
      company: 'SkyScale Technologies',
      location: 'Chennai, India',
      type: 'Full-time',
      salary: '₹25L – ₹35L / year',
      logoInitials: 'SS',
      logoColor: '#0dcaf0',
    },
    {
      id: '6',
      title: 'Machine Learning Engineer',
      company: 'NeuralEdge AI',
      location: 'Mumbai, India',
      type: 'Full-time',
      salary: '₹22L – ₹30L / year',
      logoInitials: 'NE',
      logoColor: '#fd7e14',
    },
  ];

  protected readonly features: FeatureHighlight[] = [
    {
      title: 'Verified Companies',
      description:
        'Every employer on our platform is verified so you can apply with confidence.',
      icon: 'verified',
    },
    {
      title: 'Easy Apply',
      description:
        'Submit applications in minutes with a streamlined, hassle-free process.',
      icon: 'touch_app',
    },
    {
      title: 'Career Growth',
      description:
        'Discover roles that match your skills and help you advance your career.',
      icon: 'trending_up',
    },
    {
      title: 'Thousands of Jobs',
      description:
        'Browse opportunities across industries, locations, and experience levels.',
      icon: 'work',
    },
  ];

  constructor(private readonly router: Router) {}

  protected onSearch(): void {
    this.router.navigate(['/jobs'], {
      queryParams: {
        keyword: this.searchKeyword.trim() || null,
        location: this.searchLocation.trim() || null,
      },
    });
  }
}
