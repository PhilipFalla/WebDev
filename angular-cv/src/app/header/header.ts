import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  darkMode = false;
  themeText = 'Dark Mode';
  themeIcon = '🌙';
  btnClass = 'btn-outline-dark';

  greeting = '';

  ngOnInit() {
    this.setGreeting();
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;

    document.body.setAttribute(
      'data-bs-theme',
      this.darkMode ? 'dark' : 'light'
    );

    this.btnClass = this.darkMode ? 'btn-outline-light' : 'btn-outline-dark';
    this.themeText = this.darkMode ? 'Light Mode' : 'Dark Mode';
    this.themeIcon = this.darkMode ? '☀️' : '🌙';
  }

  setGreeting() {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) this.greeting = '🌅 Good Morning, welcome to my CV!';
    else if (hour < 18) this.greeting = '☀️ Good Afternoon, welcome to my CV!';
    else this.greeting = '🌙 Good Evening, welcome to my CV!';
  }

  scrollTo(fragment: string, event: Event) {
    event.preventDefault();
    const mapped: Record<string, string> = {
      about: 'header',
      skills: 'about',
      education: 'skills',
      experience: 'education',
      contact: 'experience'
    };

    const targetId = mapped[fragment] || fragment;
    const el = document.getElementById(targetId);
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    try {
      history.pushState(null, '', `#${fragment}`);
    } catch {}
  }
}
