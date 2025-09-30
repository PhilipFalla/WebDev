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
  
    const nav = document.getElementById('mainNav');
    nav?.classList.toggle('bg-dark', this.darkMode);
    nav?.classList.toggle('bg-light', !this.darkMode);
  
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
}
