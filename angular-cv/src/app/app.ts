// app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header';
import { AboutSkillsComponent } from './about-skills/about-skills';
import { BackgroundComponent } from './background/background';
import { FooterComponent } from './footer/footer';
import { RandomCard } from './random-card/random-card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    AboutSkillsComponent,
    BackgroundComponent,
    FooterComponent,
    RandomCard
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'angular-cv';
}
