import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { reduce } from 'rxjs';
import { AuthService } from '../Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('AuthToken');

  if (!token) {
    router.navigate(['/Login']);
    return false;
  }
  const expectedRole = route.data?.['roles'];
  const userRole = authService.getRole();

  if (expectedRole && userRole !== expectedRole) {
    router.navigate(['/Login']); 
    return false;
  }

  
 return true;
};
