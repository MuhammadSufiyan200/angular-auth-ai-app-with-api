import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryMgmtServiceService {
// inventory-mgmt.service.ts
  private baseUrl = 'http://192.168.0.117:5000/Server/api/Inventory_MGMT_/';

  constructor(private http: HttpClient) {}

  // ================= ITEM CATEGORY =================
  getAllItemCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}GetAllItemCategories`);
  }

  createItemCategory(data: any): Observable<any> {
    debugger;
    return this.http.post(`${this.baseUrl}CreateItemCategory`, data);
  }

  getItemCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}GetDatabyIDItemCategory/${id}`);
  }

  updateItemCategory(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}UpdateItemCategory/${id}`, data);
  }

  deleteItemCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}DeleteItemCategory/${id}`);
  }

  // ================= INVENTORY ITEM (Future) =================
  getAllInventoryItem(): Observable<any[]> {
    
    return this.http.get<any[]>(`${this.baseUrl}GetAllInventoryItem`);
  }
  createInventoryItem(data: any): Observable<any> {
    debugger;
    return this.http.post(`${this.baseUrl}CreateInventoryItem`, data);
  }
  updateInventoryItem(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}UpdateInventoryItem/${id}`, data);
  }
  deleteInventoryItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}DeleteInventoryItem/${id}`);
  }

  // ================= UNIT (Future) =================
  getAllUnits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}GetAllUnit`);
  }
  createUnit(data: any): Observable<any> {
    debugger;
    return this.http.post(`${this.baseUrl}CreateUnitDTO`, data);
  }
  updateUnit(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}UpdateUnit/${id}`, data);
  }
  deleteUnit(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}DeleteUnit/${id}`);
  }
  // ================= STOCK (Future) =================
}


