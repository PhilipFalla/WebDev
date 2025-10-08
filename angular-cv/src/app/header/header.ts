import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HourAmPmPipe } from '../hour-am-pm.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HourAmPmPipe],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  darkMode = false;
  themeText = 'Dark Mode';
  themeIcon = '🌙';
  btnClass = 'btn-outline-dark';

  greeting = '';
  now: Date = new Date();

  private readonly platformId = inject(PLATFORM_ID);
  private readonly documentRef = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  ngOnInit() {
    this.setGreeting();
    // Capture current time for display
    this.now = new Date();
    // Ensure light mode on init if no theme is set (browser only)
    if (this.isBrowser) {
      const existing = this.documentRef.body.getAttribute('data-bs-theme');
      if (!existing) {
        this.documentRef.body.setAttribute('data-bs-theme', 'light');
        this.darkMode = false;
        this.updateButtonState();
      } else {
        this.darkMode = existing === 'dark';
        this.updateButtonState();
      }
    }
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    if (this.isBrowser) {
      this.documentRef.body.setAttribute(
        'data-bs-theme',
        this.darkMode ? 'dark' : 'light'
      );
    }
    this.updateButtonState();
  }

  private updateButtonState() {
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
    if (!this.isBrowser) return;
    const mapped: Record<string, string> = {
      about: 'header',
      skills: 'about',
      education: 'skills',
      experience: 'education',
      contact: 'experience',
      projects: 'projects'
    };

    const targetId = mapped[fragment] || fragment;
    const el = this.documentRef.getElementById(targetId);
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    try {
      if (this.isBrowser) {
        history.pushState(null, '', `#${fragment}`);
      }
    } catch {}
  }
}
