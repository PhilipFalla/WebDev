import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DataService, Job } from '../data';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background.html',
  styleUrls: ['./background.css']
})
export class BackgroundComponent implements OnInit {
  currentSection: 'education' | 'experience' = 'education';
  showAllSections = true;
  jobs: Job[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.setSection();
    this.jobs = this.dataService.getJobs();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.setSection());
  }

  private setSection() {
    const section = this.route.snapshot.data['section'];
    if (section === 'education' || section === 'experience') {
      this.currentSection = section;
      this.showAllSections = false;
    } else {
      this.showAllSections = true;
    }
  }
}
