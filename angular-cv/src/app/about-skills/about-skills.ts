import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../capitalize-pipe';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DataService, SkillCategory } from '../data';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about-skills',
  standalone: true,
  imports: [CommonModule, CapitalizePipe, FormsModule],
  templateUrl: './about-skills.html',
  styleUrls: ['./about-skills.css']
})
export class AboutSkillsComponent implements OnInit {
  currentSection: 'about' | 'skills' = 'about';
  showAllSections = true;
  skills: SkillCategory[] = [];
  filteredSkills: SkillCategory[] = [];
  searchTerm: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.setSection();
    this.skills = this.dataService.getSkills();
    this.filteredSkills = this.skills;

    // Listen to route changes to update section dynamically
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.setSection());
  }

  filterSkills() {
    const searchTerm = this.searchTerm.toLowerCase();
    if (!searchTerm) {
      this.filteredSkills = this.skills;
      return;
    }

    this.filteredSkills = this.skills
      .map(category => {
        const filteredItems = category.items.filter(item =>
          item.toLowerCase().includes(searchTerm)
        );

        if (filteredItems.length > 0) {
          return { ...category, items: filteredItems };
        }
        return null;
      })
      .filter((category): category is SkillCategory => category !== null);
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
