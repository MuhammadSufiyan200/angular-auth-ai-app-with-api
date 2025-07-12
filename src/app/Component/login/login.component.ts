import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
// import { GoogleLoginProvider, SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { catchError, throwError } from 'rxjs';
declare const google: any;
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '503215814046-5hooqt9lakmfi3ook4jchihk9347gdkh.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
    });
    setTimeout(() => {
      google.accounts.id.renderButton(
        document.getElementById("google-custom-btn"),
        {
          type: 'icon',
          shape: 'circle',
          theme: 'filled_blue',
          size: 'large'
        }
      );
    }, 0);
  }

  constructor(private fb: FormBuilder, private authSer: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      Email: ['', Validators.email],
      PasswordHash: ['', Validators.required]

    });


  }
  handleCredentialResponse(response: any) {
    debugger;
    // const idToken = response.credential;
    const idToken = response.credential;
    const decodedToken: any = jwtDecode(idToken); // 👈 decode the token
    console.log("Decoded JWT Token", decodedToken);
    const email = decodedToken.email;
    const fullName = decodedToken.name;
    const providerUserId = decodedToken.sub;
    const deviceInfo = navigator.userAgent;
    this.authSer.getClientLocation().then(locationData => {
      const loginData = {
        email: email,
        fullName: fullName,
        provider: 'Google',
        providerUserId: providerUserId,
        ipAddress: locationData?.ip || 'Unknown',
        deviceInfo: deviceInfo,
        location: `${locationData?.city}, ${locationData?.country_name}` || 'Unknown'
      };

      this.authSer.authnticatio('SocialLogin', loginData).pipe(
        catchError(err => {
          debugger;
          console.error('🚨 Social Login API Error:', err);
          alert('Something went wrong.');
          return throwError(() => err);
        })
      ).subscribe(res => {
        debugger;
        localStorage.setItem('jwtToken', res.Token);
        localStorage.setItem('userName', res.UserName);
        localStorage.setItem('role', res.Roles);

        if (res.Roles === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user-home']);
        }
      },
        err => {
          console.error('Login Failed:', err);
          alert('Social Login Failed');
        }
      );
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      const deviceInfo = navigator.userAgent;

      this.authSer.getClientLocation().then(locationData => {
        const loginData = {
          ...formValue,
          deviceInfo: deviceInfo,
          ipAddress: locationData?.ip || 'Unknown',
          location: `${locationData?.city}, ${locationData?.country_name}` || 'Unknown'
        };

        this.authSer.authnticatio('Login', loginData).subscribe(
          (response) => {
            const role = this.authSer.getRole();
            if (role === 'Admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/user-home']);
            }
          },
          (error) => {
            console.error("Login Failed:", error);
            alert('Login Failed');
          }
        );
      });
    } else {
      console.warn("Form is invalid!");
    }
  }
  goToSignup() {
    this.router.navigate(['/Siginup']);
  }
}
