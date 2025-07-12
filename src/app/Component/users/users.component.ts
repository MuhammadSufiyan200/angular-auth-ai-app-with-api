import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  Users: any[] = [];
  filteredUsers: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    debugger;
    this.authService.getActiveUsers().subscribe(
      (data) => {
        console.log("API Response:", data);
        const arrayData = Array.isArray(data) ? data : [data];
        this.Users = arrayData;
        this.filteredUsers = this.Users;
      },
      (error) => {
        console.error("API Error:", error); 
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredUsers = this.Users.filter(user =>
      Object.values(user).some(v => {
        if (typeof v === 'string') {
          return v.toLowerCase().includes(filterValue);
        } else if (typeof v === 'number') {
          return v.toString().includes(filterValue);
        }
        return false;
      })
    );
  }
}
