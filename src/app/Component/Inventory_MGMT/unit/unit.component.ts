import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryMgmtServiceService } from '../../../Services/inventory-mgmt-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.css'
})
export class UnitComponent {
  UnitForm!: FormGroup;
    Unit: any[] = [];
    filteredUsers: any[] = [];
    isEditMode = false;
    selectedUnitId: number | null = null;
  
    constructor(
      private UnitService: InventoryMgmtServiceService,
      private fb: FormBuilder
    ) {}
  
    ngOnInit(): void {
      this.initializeForm();
      this.getUnit();
    }
    
    initializeForm() {
      this.UnitForm = this.fb.group({
        UnitId: [''],
        UnitName: ['', Validators.required]
        });
    }
  
    getUnit() {
      debugger;
      this.UnitService.getAllUnits().subscribe(
        (data) => {
          debugger;
          console.log("API Response:", data);
          const arrayData = Array.isArray(data) ? data : [data];
          this.Unit = arrayData;
          this.filteredUsers = this.Unit;
          const maxId = Math.max(...this.Unit.map(cat => cat.UnitId || 0));
          this.UnitForm.patchValue({ UnitId: maxId + 1 });
        },
        (error) => {
          debugger;
          console.error("API Error:", error); 
        }
      );
    }
  
    onSubmit() {
      if (this.UnitForm.invalid) {
        return;
      }
  
      const formData = this.UnitForm.value;
  
      if (this.isEditMode && this.selectedUnitId != null) {
        this.updateUnit(this.selectedUnitId, formData);
      } else {
        this.createUnit(formData);
      }
    }
  
    createUnit(formData: any) {
      this.UnitService.createUnit(formData).subscribe({
        next: () => {
          this.UnitForm.reset();
          this.UnitService.getAllUnits();
          alert('Inserted records successfully..!');
        },
        error: (err) => {
          console.error('Error creating category:', err);
        }
      });
    }
  
    editUnit(unit: any) {
      this.isEditMode = true;
      this.selectedUnitId = unit.itemCategoryId;
      this.UnitForm.patchValue({
        UnitId: unit.unitId,
        UnitName: unit.UnitName
      });
    }
  
    updateUnit(id: number, formData: any) {
      this.UnitService.updateUnit(id, formData).subscribe({
        next: () => {
          this.isEditMode = false;
          this.selectedUnitId = null;
          this.UnitForm.reset();
          this.UnitService.getAllUnits();
          alert('Updated records successfully..!');
        },
        error: (err) => {
          console.error('Error updating category:', err);
        }
      });
    }
  
    deleterecord(id: number) {
      if (confirm('Are you sure you want to delete this category?')) {
        this.UnitService.deleteUnit(id).subscribe({
          next: () => {
            this.UnitService.getAllUnits();
          },
          error: (err) => {
            console.error('Error deleting category:', err);
          }
        });
      }
    }
  
    cancelEdit() {
      this.isEditMode = false;
      this.selectedUnitId = null;
      this.UnitForm.reset();
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
      this.filteredUsers = this.Unit.filter
      (user => 
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
