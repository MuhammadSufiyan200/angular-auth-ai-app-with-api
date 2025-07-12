  import { StringToken, Token } from '@angular/compiler';
  import { Component, ViewEncapsulation } from '@angular/core';
  import { FormsModule, NgModel } from '@angular/forms';
  import { Router, RouterModule, RouterOutlet } from '@angular/router';
  import { AuthService } from '../../Services/auth.service';
  import { CommonModule } from '@angular/common';
  import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';


  @Component({
    
    selector: 'app-dashboard',
    standalone: true,
    imports: [FormsModule,RouterOutlet,CommonModule,RouterModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    encapsulation: ViewEncapsulation.Emulated
    
  })
  export class DashboardComponent {

    
  userRole: string | null = '';
    Token: string | null = '';
    UserNames: string | null = '';
    activeUsers: any[] = [];



    constructor(private http: HttpClient,private router: Router,private authSer: AuthService){
    }
    ngOnInit() {
      this.Token = localStorage.getItem('AuthToken');
      this.userRole = localStorage.getItem('UserRole');
      this.UserNames = localStorage.getItem('UserName');
      this.authSer.getActiveUsers().subscribe(users => {
        this.activeUsers = users;
      });

      if (!this.Token) {
        this.router.navigate(['/Login']);
      }
    }

   
    logout(){
      debugger;
      this.authSer.logout().subscribe(
        (data) => {
          debugger;
          console.log("API Response:", data);
          localStorage.removeItem('AuthToken');
          localStorage.removeItem('UserRole');
          localStorage.removeItem('UserName');
          this.router.navigate(['/Login']);
        },
        (error) =>{
          console.error("API Error:", error); 
        }
      );
      // this.router.navigate(['/Login']);
    }
    inventoryDropdownOpen: boolean = false;

    toggleInventoryDropdown() {
      this.inventoryDropdownOpen = !this.inventoryDropdownOpen;
    }
  }
