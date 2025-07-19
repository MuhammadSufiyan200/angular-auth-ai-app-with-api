import { AfterViewInit, Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { InventoryMgmtServiceService } from '../../../Services/inventory-mgmt-service.service';
import Aos from 'aos';
import { HeroComponent } from '../hero/hero.component';
import Swiper from 'swiper';
import { FoodService } from '../../../Services/food.service';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule,RouterModule,HeroComponent,NavbarComponent,FooterComponent,FormsModule],
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'] 
})
export class UserHomeComponent implements OnInit {
  featuredProducts: any[] = [];
  stars = [1, 2, 3, 4, 5];
  currentRating = 0;
  hoverRating = 0; 
  categories: any[] = [];
  isLoading = true; 
  selectedCategoryId: number | null = null;
  allProducts: any[] = []; // Original product list
  filteredProducts: any[] = []; // Shown after filtering

  constructor(private inventoryService: InventoryMgmtServiceService, public cartService: FoodService, private toastr: ToastrService,private loader: NgxUiLoaderService) {}

  ngOnInit(): void {
    
      Aos.init({
        duration: 300, // ms mein animation duration
        easing: 'ease-in-out',
        once: true      // har element ek baar animate hoga
      });
    
    this.loadProducts();
    this.loadCategories();
  }
  baseImageUrl = `${environment.apiImg}`; 
  loadProducts(): void {
    this.isLoading = true;
    this.inventoryService.getAllInventoryItem().subscribe({
      next: (data) => {
        console.log('Loaded Products:', data); // Check if imageUrl is coming correctly
        this.featuredProducts = data.map((item: any) => {
          console.log(item.imageUrl); // See the exact image URL
          return {
            ...item,
            imageUrl: this.baseImageUrl + '/' + item.img,
             quantity: 1,
             currentRating: 0,
             hoverRating: 0,
             showClickEffect: false
          };
        });
        this.filterProducts();
        this.isLoading = false;
      },
      error: (err) => 
        {
          console.error('Product loading error:', err);
          this.isLoading = false;
        }
    });
  }
  onCategorySelected(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.filterProducts();
  }
  filterProducts(): void {
    if (this.selectedCategoryId) {
      this.filteredProducts = this.allProducts.filter(
        (product) => product.categoryId === this.selectedCategoryId
      );
    } else {
      this.filteredProducts = this.allProducts;
    }
  }


  increaseQuantity(product: any): void {
    product.quantity++;
  }

  decreaseQuantity(product: any): void {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }
  

  loadCategories(): void {
      
    this.inventoryService.getAllItemCategories().subscribe({
      next: (data) => {
        this.categories = data.map((cat: any) => ({
        ...cat,
        imageUrl: this.imageMap[cat.categoryName] || 'assets/Category-sorted-img-1.jpg',
       // icon: this.iconMap[cat.categoryName] || 'assets/burger.png'
        icon: 'assets/' + (this.iconMap[cat.categoryName] || 'burger.png')

      }));
      },
      error: (err) => console.error('Category loading error:', err)
    });
  }
  imageMap: { [key: string]: string } = {
  'Feature Dessert': 'assets/desert-category-sorted-3.jpg',
  'Hot Platter': 'assets/Food-category-sorted-2.jpg',
  'Asian Food': 'assets/img-category-sorted-4.jpg',
  'Fast Food': 'assets/Category-sorted-img-1.jpg',
  'Desi Food': 'assets/desi food-category-sorted.jpg',
  'Chinese Food': 'assets/Chanees-food-category-sorted.jpg'
};
iconMap: { [key: string]: string } = { 
  'Fast Food': 'burger.png',
  'Hot Platter': 'ramen.png',
  'Feature Dessert': 'gelato.png',
  'Asian Food': 'pizza.png',
  'Chinese Food': 'ramen 1.png',
  'Desi Food': 'feature2.png'
}


  addToCart(product: any): void {
    debugger;
    console.log('Product added to cart:', product);
    console.log('Product ID:', product.id, typeof product.id);
    const productToAdd = { ...product };
    productToAdd.totalPrice = productToAdd.price * productToAdd.quantity;
    productToAdd.currentRating = product.currentRating;
    this.cartService.addToCart(productToAdd);
    this.toastr.success(`${product.name} added to cart!`, 'Success');
    document.getElementById('nav-cart')?.scrollIntoView({ behavior: 'smooth' });
  }
  setRating(product: any, rating: number): void {
    if(product.currentRating === rating)
    {
      product.currentRating = 0;
    }
    else{
      product.currentRating = rating;
    }
  
  product.showClickEffect = true;
  setTimeout(() => {
    product.showClickEffect = false;
  }, 300);
}
  showClickEffect = false;
}
