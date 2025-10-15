import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService, GithubRepo } from '../git-service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})

export class ProjectsComponent implements OnInit {
  repos: GithubRepo[] = [];
  filteredRepos: GithubRepo[] = [];
  currentIndex = 0;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.githubService.getRepos().subscribe({
      next: (data) => {
        this.repos = data;
        const featured = new Set(['webdev', 'customrng', 'rccar', 'stagehand-test']);
        this.filteredRepos = data
          .filter(repo => featured.has(repo.name.toLowerCase()))
          .sort((a, b) => {
            const order = ['webdev', 'customrng', 'rccar', 'stagehand-test'];
            return order.indexOf(a.name.toLowerCase()) - order.indexOf(b.name.toLowerCase());
          });
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}


