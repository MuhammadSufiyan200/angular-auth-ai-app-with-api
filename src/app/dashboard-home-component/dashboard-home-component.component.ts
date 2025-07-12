import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-home-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-home-component.component.html',
  styleUrl: './dashboard-home-component.component.css'
})
export class DashboardHomeComponentComponent {
  @Input() activeUsers: any[] = [];
  
  constructor(private router: Router) {}

  goToPage(page: string) {
    this.router.navigate(['/admin', page]);
  }
}
