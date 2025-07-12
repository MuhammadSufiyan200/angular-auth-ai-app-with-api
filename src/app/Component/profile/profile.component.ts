import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  Profile: any[] = [];
  filteredUsers: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    
    debugger;
    this.authService.getProfile().subscribe(
      (data) => {
        debugger;
        console.log("API Response:", data);
        const arrayData = Array.isArray(data) ? data : [data];
        this.Profile = arrayData;
        this.filteredUsers = this.Profile;
      },
      (error) => {
        debugger;
        console.error("API Error:", error); 
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredUsers = this.Profile.filter(user => Object.values(user).some(v => {
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
