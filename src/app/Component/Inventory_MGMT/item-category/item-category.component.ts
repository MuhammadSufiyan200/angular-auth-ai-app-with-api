import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryMgmtServiceService } from '../../../Services/inventory-mgmt-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-category',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './item-category.component.html',
  styleUrl: './item-category.component.css'
})
export class ItemCategoryComponent {
  itemCategoryForm!: FormGroup;
  itemCategories: any[] = [];
  filteredUsers: any[] = [];
  isEditMode = false;
  selectedCategoryId: number | null = null;

  constructor(
    private inventoryService: InventoryMgmtServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getAllItemCategories();
  }
  
  initializeForm() {
    this.itemCategoryForm = this.fb.group({
      itemCategoryId: [''],
      categoryName: ['', Validators.required]
      });
  }

  getAllItemCategories() {
    debugger;
    this.inventoryService.getAllItemCategories().subscribe(
      (data) => {
        debugger;
        console.log("API Response:", data);
        const arrayData = Array.isArray(data) ? data : [data];
        this.itemCategories = arrayData;
        this.filteredUsers = this.itemCategories;
        const maxId = Math.max(...this.itemCategories.map(cat => cat.itemCategoryId || 0));
        this.itemCategoryForm.patchValue({ itemCategoryId: maxId + 1 });
      },
      (error) => {
        debugger;
        console.error("API Error:", error); 
      }
    );
  }

  onSubmit() {
    if (this.itemCategoryForm.invalid) {
      return;
    }

    const formData = this.itemCategoryForm.value;

    if (this.isEditMode && this.selectedCategoryId != null) {
      this.updateCategory(this.selectedCategoryId, formData);
    } else {
      this.createCategory(formData);
    }
  }

  createCategory(formData: any) {
    this.inventoryService.createItemCategory(formData).subscribe({
      next: () => {
        this.itemCategoryForm.reset();
        this.getAllItemCategories();
        alert('Inserted records successfully..!');
      },
      error: (err) => {
        console.error('Error creating category:', err);
      }
    });
  }

  editCategory(category: any) {
    this.isEditMode = true;
    this.selectedCategoryId = category.itemCategoryId;
    this.itemCategoryForm.patchValue({
      itemCategoryId: category.itemCategories,
      categoryName: category.categoryName
    });
  }

  updateCategory(id: number, formData: any) {
    this.inventoryService.updateItemCategory(id, formData).subscribe({
      next: () => {
        this.isEditMode = false;
        this.selectedCategoryId = null;
        this.itemCategoryForm.reset();
        this.getAllItemCategories();
        alert('Updated records successfully..!');
      },
      error: (err) => {
        console.error('Error updating category:', err);
      }
    });
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.inventoryService.deleteItemCategory(id).subscribe({
        next: () => {
          this.getAllItemCategories();
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
    this.itemCategoryForm.reset();
  }
  applyFilter(event: Event) {
    debugger;
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredUsers = this.itemCategories.filter(user => Object.values(user).some(v => {
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
