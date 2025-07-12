import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-system-log',
  imports: [CommonModule],
  templateUrl: './system-log.component.html',
  styleUrl: './system-log.component.css'
})
export class SystemLogComponent {
  Syslog: any[] = [];
  filteredUsers: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    debugger;
    this.authService.getSystemLogs().subscribe(
      (data) => {
        console.log("API Response:", data);
        const arrayData = Array.isArray(data) ? data : [data];
        this.Syslog = arrayData;
        this.filteredUsers = this.Syslog;
      },
      (error) => {
        console.error("API Error:", error); 
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredUsers = this.Syslog.filter(user =>
      
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
