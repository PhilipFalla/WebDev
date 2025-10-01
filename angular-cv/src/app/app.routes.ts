import { Routes } from '@angular/router';
import { AboutSkillsComponent } from './about-skills/about-skills';
import { BackgroundComponent } from './background/background';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AboutSkillsComponent, BackgroundComponent],
  template: `
    <app-about-skills></app-about-skills>
    <app-background></app-background>
  `
})
export class HomeComponent {}

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    {
      path: 'profile',
      children: [
        { path: 'about', component: AboutSkillsComponent, data: { section: 'about' } },
        { path: 'skills', component: AboutSkillsComponent, data: { section: 'skills' } },
        { path: '', redirectTo: 'about', pathMatch: 'full' }
      ]
    },
    {
      path: 'background',
      component: BackgroundComponent, // parent container
    //   children: [
    //     { path: 'education', component: BackgroundComponent, data: { section: 'education' } },
    //     { path: 'experience', component: BackgroundComponent, data: { section: 'experience' } },
    //     { path: '', redirectTo: 'education', pathMatch: 'full' } // default child
    //   ]
    },
    { path: '**', redirectTo: '' }
  ];  