import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../capitalize-pipe';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DataService, SkillCategory } from '../data';

@Component({
  selector: 'app-about-skills',
  standalone: true,
  imports: [CommonModule, CapitalizePipe],
  templateUrl: './about-skills.html',
  styleUrls: ['./about-skills.css']
})
export class AboutSkillsComponent implements OnInit {
  currentSection: 'about' | 'skills' = 'about';
  showAllSections = true;
  skills: SkillCategory[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.setSection();
    this.skills = this.dataService.getSkills();

    // Listen to route changes to update section dynamically
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.setSection());
  }

  private setSection() {
    const section = this.route.snapshot.data['section'];
    if (section === 'about' || section === 'skills') {
      this.currentSection = section;
      this.showAllSections = false;
    } else {
      this.showAllSections = true;
    }
  }
}