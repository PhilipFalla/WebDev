import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-about-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-skills.html',
  styleUrls: ['./about-skills.css']
})
export class AboutSkillsComponent implements OnInit {
  currentSection: 'about' | 'skills' = 'about';
  showAllSections = true;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.setSection();

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