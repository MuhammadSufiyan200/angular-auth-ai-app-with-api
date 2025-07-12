import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/core/interceptors/auth.interceptor';
import { loaderInterceptor } from './loader.interceptor';
// import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from '@abacritt/angularx-social-login';
// import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

export const appConfig: ApplicationConfig = {
  
  providers: [
   //  importProvidersFrom(SocialLoginModule),

    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider('503215814046-5hooqt9lakmfi3ook4jchihk9347gdkh.apps.googleusercontent.com')
             
    //       },
    //       {
    //         id: FacebookLoginProvider.PROVIDER_ID,
    //         provider: new FacebookLoginProvider('YOUR_FACEBOOK_APP_ID'),
    //       }
    //     ]
    //   } as SocialAuthServiceConfig,
    // },

    provideHttpClient(withInterceptors([AuthInterceptor,loaderInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),]
};