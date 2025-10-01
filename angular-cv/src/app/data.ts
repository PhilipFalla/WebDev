// src/app/data.service.ts
import { Injectable } from '@angular/core';

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface Job {
  year: string | number;
  institution: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private skills: SkillCategory[] = [
    { name: 'Languages', items: ['Python'] },
    { name: 'Tools', items: ['Stagehand', 'Firebase', 'Arduino Uno & ESP32'] },
    { name: 'Soft Skills', items: ['Angular', 'TypeScript', 'Node.js'] }
  ];

  private jobs: Job[] = [
    { year: '2022 (80-hours)', institution: 'Hot Sounds Store', role: 'Marketing & Sales Internship' },
    { year: '2023', institution: 'TEDxActonAcademyGuatemala', role: 'Head of Budgeting & Sponsorship Committee' },
    { year: '2023-2024', institution: 'Krea Group', role: 'Accounts Receivable and Bookkeeping Assistant' },
    { year: '2025-Present', institution: 'Lettuce Financial Labs', role: 'Automation Engineer' }
  ];

  getSkills(): SkillCategory[] {
    return this.skills;
  }

  getJobs(): Job[] {
    return this.jobs;
  }
}