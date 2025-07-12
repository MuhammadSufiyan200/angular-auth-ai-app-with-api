import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(NgxUiLoaderService);
  const token = localStorage.getItem('AuthToken');
  if (token) {
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
  loader.start();
  return next(req).pipe(
    finalize(() => loader.stop()) // Stop loader after request completes
  );
};
