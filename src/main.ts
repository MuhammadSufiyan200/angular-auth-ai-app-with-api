import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {
  register as registerSwiperElements
} from 'swiper/element/bundle';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

registerSwiperElements();
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideAnimations(),
    provideToastr(),
    ...(appConfig.providers || [])
  ]
}).catch((err) => console.error(err));
