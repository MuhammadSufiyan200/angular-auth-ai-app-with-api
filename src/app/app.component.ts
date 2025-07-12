import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Router, RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { LoaderComponent } from './shared/loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  blocks = Array(9);
  title = 'auth-ai-app';
  constructor(private router: Router) {
  }
  ngOnInit() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }
  // ngAfterViewInit(): void {
  //   new Swiper('.mySwiper', {
  //     loop: true,
  //     autoplay: {
  //       delay: 3000,
  //       disableOnInteraction: false
  //     },
  //     navigation: {
  //       nextEl: '.swiper-button-next',
  //       prevEl: '.swiper-button-prev',
  //     }
  //   });
  // }
}
