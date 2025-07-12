import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-siginup',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './siginup.component.html',
  styleUrl: './siginup.component.css'
})
export class SiginupComponent {

  Siginup!: FormGroup;
  constructor(private fb: FormBuilder, private authser: AuthService, private router: Router ){
    this.Siginup = this.fb.group({
      FullName:['', Validators.required],
      Email:['', Validators.email],
      PasswordHash:['',Validators.required]
    })
  }

  onSubmit(){
    debugger;
    if(this.Siginup.valid)
    {
      this.authser.authnticatio('signup',this.Siginup.value).subscribe(
        (response) => {
          console.log("Login Successful:", response);
          alert('Sign up Successfully! Please Login.');
          this.router.navigate(['/Login']);
        },
        (error) =>{
          console.log("Sign up Failed:", error);
          alert('Sign up Failed');
        }
      )
    }
    else{
      console.warn("Form is invalid!");
    }
  }

  goToLogin(){
    this.router.navigate(['/Login']);
  }
}
