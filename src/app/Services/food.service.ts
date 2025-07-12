import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  cartItems: any[] = [];
  constructor() {
    const savedItems = localStorage.getItem('cartItems');
    if (savedItems) {
      this.cartItems = JSON.parse(savedItems);
    }
  }
  addToCart(product: any) {
    debugger;
    const existingItem = this.cartItems.find(item => Number(item.id) === Number(product.id));
    const newPrdtwithqnty = product.quantity;
    if (existingItem) {
      existingItem.quantity += product.quantity;
      if(existingItem.currentRating < 5){
        existingItem.currentRating = product.currentRating;
      }
    } else {
      this.cartItems.push({ ...product, newPrdtwithqnty });
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItems() {
    return this.cartItems;
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  updateQuantity(id: number, qty: number) {
    const item = this.cartItems.find(item => item.id === id);
    if (item && qty >= 1) item.quantity = qty;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
  }
}
