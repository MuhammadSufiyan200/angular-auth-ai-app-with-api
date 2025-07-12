import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FoodService } from '../../../Services/food.service';
import * as AOS from 'aos';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-cart-component',
  imports: [CommonModule,NavbarComponent,RouterModule,FooterComponent],
  templateUrl: './cart-component.component.html',
  styleUrl: './cart-component.component.css'
})
export class CartComponentComponent implements AfterViewInit {

  cartItems: any[] = [];
  total: number = 0;

    @ViewChild('cartSection') cartSection!: ElementRef;
    @ViewChild('cartSummary') cartSummary!: ElementRef;
    @ViewChild('cartcontainer') cartcontainer!: ElementRef;

  private hasGlowed = false;

  ngAfterViewInit(): void {
    if (this.cartSection) {
      setTimeout(() => {
        this.cartSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
      window.addEventListener('scroll', this.handleScrollGlow.bind(this), { once: true });
      if(this.cartItems.length === 0){
        this.checkCartEmpty();
      }
    }
  }
  handleScrollGlow() {
    if (!this.hasGlowed) {
      this.hasGlowed = true;

      // Add glow effect
      this.renderer.addClass(this.cartcontainer.nativeElement, 'glow-effect');
      this.renderer.addClass(this.cartSummary.nativeElement, 'glow-effect');

      // Remove after 2 seconds
      setTimeout(() => {
        this.renderer.removeClass(this.cartcontainer.nativeElement, 'glow-effect');
        this.renderer.removeClass(this.cartSummary.nativeElement, 'glow-effect');
      }, 2000);
    }
  }
  showCartEmptyPopup: boolean = false;
  popupTimeout: any;

  checkCartEmpty() {
    if (this.cartItems.length === 0) {
      this.showCartEmptyPopup = true;

      // Auto close after 3 seconds
      this.popupTimeout = setTimeout(() => {
        this.showCartEmptyPopup = false;
      }, 3000);
    }
  }

  closeCartEmptyPopup() {
    this.showCartEmptyPopup = false;
    clearTimeout(this.popupTimeout);
  }
  constructor(private cartService: FoodService,private location: Location, private renderer: Renderer2) {}

  ngOnInit(): void {
    
    this.loadCart();
  }
  goBack() {
    this.location.back();
  }
  loadCart() {
    this.cartItems = this.cartService.getCartItems();
    this.updateTotal();
  }

  increaseQty(item: any) {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
    this.loadCart();
  }

  decreaseQty(item: any) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
      this.loadCart();
    }
  }

  remove(item: any) {
    this.cartService.removeItem(item.id);
    this.loadCart();
  }

  updateTotal() {
    this.total = this.cartService.getTotalPrice();
  }
}
