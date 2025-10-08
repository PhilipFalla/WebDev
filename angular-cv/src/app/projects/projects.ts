import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GithubService, GithubRepo } from '../git-service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})

export class ProjectsComponent implements OnInit {
  repos: GithubRepo[] = [];
  filteredRepos: GithubRepo[] = [];
  loading: boolean = true;
  error: string = '';
  searchTerm: string = '';
  currentIndex: number = 0;

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
        this.currentIndex = 0;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los repositorios';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  filterRepos(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredRepos = this.repos;
      return;
    }
    this.filteredRepos = this.repos.filter(repo => {
      const matchName = repo.name.toLowerCase().includes(term);
      const matchDescription = repo.description?.toLowerCase().includes(term);
      const matchLanguage = repo.language?.toLowerCase().includes(term);
      const matchTopics = repo.topics?.some(topic => topic.toLowerCase().includes(term));
      return matchName || matchDescription || matchLanguage || matchTopics;
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredRepos = this.repos;
  }
}


