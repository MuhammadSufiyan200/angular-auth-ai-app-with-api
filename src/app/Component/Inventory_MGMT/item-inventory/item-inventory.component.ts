import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryMgmtServiceService } from '../../../Services/inventory-mgmt-service.service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-item-inventory',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule,NgSelectModule],
  templateUrl: './item-inventory.component.html',
  styleUrl: './item-inventory.component.css'
})
export class ItemInventoryComponent {
  inventoryForm!: FormGroup;
  itemInventory: any[] = [];
  itemCategories: any[] = [];
  units: any[] = [];
  filteredUsers: any[] = [];
  isEditMode = false;
  selectedCategoryId: number | null = null;
  selectedFile: File | null = null;
  constructor(
      private inventoryService: InventoryMgmtServiceService,
      private fb: FormBuilder
    ) {}


  initializeForm() {
    this.inventoryForm = this.fb.group({
      iteminventoryId: [''],
      itemName: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      stockQuantity: [null, [Validators.required, Validators.min(1)]],
      itemCategoryId: [null, Validators.required],
      unitId: [null, Validators.required],
      filepath: ['']
    });

  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

ngOnInit() {
  this.initializeForm();
  this.getAllItemInventory();
  this.getAllUits_ItemCategories();
}
getAllItemInventory() {
  debugger;
  this.inventoryService.getAllInventoryItem().subscribe(
    (data) => {
      debugger;
      console.log("API Response:", data);
      const arrayData = Array.isArray(data) ? data : [data];
      this.itemInventory = arrayData;
      this.filteredUsers = this.itemInventory;
      const maxId = Math.max(...this.itemInventory.map(cat => cat.itemCategoryId || 0));
      this.inventoryForm.patchValue({ iteminventoryId: maxId + 1 });
    },
    (error) => {
      debugger;
      console.error("API Error:", error); 
    }
  );
}
getAllUits_ItemCategories() {
  debugger;
  this.inventoryService.getAllUnits().subscribe(
    (data) => {
      debugger;
      console.log("API Response:", data);
      const arrayData = Array.isArray(data) ? data : [data];
      this.units = arrayData;
      this.filteredUsers = this.units;
    },
    (error) => {
      debugger;
      console.error("API Error:", error); 
    }
  );
  this.inventoryService.getAllItemCategories().subscribe(
    (data) => {
      const arrayData = Array.isArray(data) ? data : [data];
      this.itemCategories = arrayData;
      this.filteredUsers = this.itemCategories;
      
    },
    (error) => {
      debugger;
      console.error("API Error:", error); 
    }
  );
  
}
// onSubmit() {
//   if (this.inventoryForm.invalid) {
//     return;
//   }
//   const formData = this.inventoryForm.value;

//     if (this.isEditMode && this.selectedCategoryId != null) {
//       this.updateItemInven(this.selectedCategoryId, formData);
//     } else {
//       this.createCategory(formData);
//     }
//   }
onSubmit() {
  if (this.inventoryForm.invalid) return;

  const formData = new FormData();
  formData.append('ItemName', this.inventoryForm.value.itemName);
  formData.append('Price', this.inventoryForm.value.price);
  formData.append('StockQuantity', this.inventoryForm.value.stockQuantity);
  formData.append('ItemCategoryId', this.inventoryForm.value.itemCategoryId);
  formData.append('UnitId', this.inventoryForm.value.unitId);

  if (this.selectedFile) {
    formData.append('FilePath', this.selectedFile); // 👈 Important!
  }

  if (this.isEditMode && this.selectedCategoryId != null) {
          this.updateItemInven(this.selectedCategoryId, formData);
        } else {
          this.createCategory(formData);
        }
}

  createCategory(formData: any) {
    this.inventoryService.createInventoryItem(formData).subscribe({
      next: () => {
        this.inventoryForm.reset();
        this.getAllItemInventory();
        alert('Inserted records successfully..!');
      },
      error: (err) => {
        console.error('Error creating category:', err);
      }
    });
  }

  edititeminven(ItemInven: any) {
    this.isEditMode = true;
    this.selectedCategoryId = ItemInven.itemCategoryId;
    this.inventoryForm.patchValue({
      iteminventoryId: ItemInven.iteminventoryId,
      itemName: ItemInven.itemName,
      price: ItemInven.price,
      stockQuantity: ItemInven.stockQuantity,
      itemCategoryId: ItemInven.itemCategoryId,
      unitId: ItemInven.unitId
      
    });
  }
  updateItemInven(id: number, formData: any) {
    this.inventoryService.updateItemCategory(id, formData).subscribe({
      next: () => {
        this.isEditMode = false;
        this.selectedCategoryId = null;
        this.inventoryForm.reset();
        this.getAllItemInventory();
        alert('Updated records successfully..!');
      },
      error: (err) => {
        console.error('Error updating category:', err);
      }
    });
  }
  deleteItemInven(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.inventoryService.deleteInventoryItem(id).subscribe({
        next: () => {
          this.getAllItemInventory();
        },
        error: (err) => {
          console.error('Error deleting category:', err);
        }
      });
    }
  }

  cancelEdit() {
    this.isEditMode = false;
    this.selectedCategoryId = null;
    this.inventoryForm.reset();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredUsers = this.itemInventory.filter(user =>
      Object.values(user).some(v => {
        if (typeof v === 'string') {
          return v.toLowerCase().includes(filterValue);
        } else if (typeof v === 'number') {
          return v.toString().includes(filterValue);
        }
        return false;
      })
    );
  }
}
