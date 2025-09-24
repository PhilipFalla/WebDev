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
    const body = document.body;
    const nav = document.getElementById('mainNav');

    if (this.darkMode) {
      body.setAttribute('data-bs-theme', 'dark');
      nav?.classList.replace('bg-light', 'bg-dark');
      this.btnClass = 'btn-outline-light';
      this.themeText = 'Light Mode';
      this.themeIcon = '☀️';
    } else {
      body.setAttribute('data-bs-theme', 'light');
      nav?.classList.replace('bg-dark', 'bg-light');
      this.btnClass = 'btn-outline-dark';
      this.themeText = 'Dark Mode';
      this.themeIcon = '🌙';
    }
  }

  setGreeting() {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) this.greeting = '🌅 Good Morning, welcome to my CV!';
    else if (hour < 18) this.greeting = '☀️ Good Afternoon, welcome to my CV!';
    else this.greeting = '🌙 Good Evening, welcome to my CV!';
  }
}
