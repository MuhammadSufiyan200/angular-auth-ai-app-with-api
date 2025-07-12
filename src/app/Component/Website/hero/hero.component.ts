import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

@Component({
  selector: 'app-hero',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './hero.component.html'
})
export class HeroComponent implements AfterViewInit {
  slides = [
    {
      title: 'Delicious Meals Delivered',
      subtitle: 'Order your favorite food anytime, anywhere',
      image: 'assets/hero-1.jpg'
    },
    {
      title: 'Fresh & Tasty Burgers',
      subtitle: 'Delivered hot and fresh at your doorstep',
      image: 'assets/hero-2.jpg'
    },
    {
      title: 'Best Pizza in Town',
      subtitle: 'Cheesy and delightful',
      image: 'assets/hero-3.jpg'
    }
  ];

  ngAfterViewInit(): void {
    new Swiper('.mySwiper', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  }
  
}
