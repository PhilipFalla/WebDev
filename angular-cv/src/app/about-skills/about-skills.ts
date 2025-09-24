import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about-skills.html',
  styleUrls: ['./about-skills.css']
})
export class AboutSkillsComponent {
  skillSearch = '';
  skills = [
    { category: 'Programming Languages', items: ['Python'] },
    { category: 'Technologies/Tools', items: ['Stagehand','Firebase','Arduino Uno & ESP32'] },
    { category: 'Soft Skills', items: ['Problem-solving','Leadership','Time Management','Independence'] }
  ];

  get filteredSkills() {
    const search = this.skillSearch.toLowerCase();
    return this.skills.map(skill => ({
      category: skill.category,
      items: skill.items.filter(item => item.toLowerCase().includes(search))
    })).filter(skill => skill.items.length > 0);
  }
}