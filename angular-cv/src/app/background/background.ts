import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DataService, Job } from '../data';
import { ExperiencesService, Experience } from '../experience-service';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background.html',
  styleUrls: ['./background.css']
})
export class BackgroundComponent implements OnInit {
  showEducation = true;
  showExperience = true;
  
  // replace jobs with experiences array
  experiences: Experience[] = [];

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private dataService: DataService,
    private expService: ExperiencesService
  ) {}

  ngOnInit() {
    this.setSection();

    // fetch experiences dynamically from API
    this.expService.getExperiences().subscribe(data => {
      this.experiences = data;
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.setSection());
  }

  toggleEducation() {
    this.showEducation = !this.showEducation;
  }

  toggleExperience() {
    this.showExperience = !this.showExperience;
  }

  private setSection() {
    const section = this.route.snapshot.data['section'];
    this.showEducation = section !== 'experience';
    this.showExperience = section !== 'education';
  }
}
