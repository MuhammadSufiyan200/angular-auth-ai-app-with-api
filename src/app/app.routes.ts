import { Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { SiginupComponent } from './Component/siginup/siginup.component';
import { authGuard } from './Guards/auth.guard';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { UserHomeComponent } from './Component/Website/user-home/user-home.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { UsersComponent } from './Component/users/users.component';
import { DashboardHomeComponentComponent } from './dashboard-home-component/dashboard-home-component.component';
import { ActiveSessionsComponent } from './Component/active-sessions/active-sessions.component';
import { SystemLogComponent } from './Component/system-log/system-log.component';
import { ItemCategoryComponent } from './Component/Inventory_MGMT/item-category/item-category.component';
import { ItemInventoryComponent } from './Component/Inventory_MGMT/item-inventory/item-inventory.component';
import { UnitComponent } from './Component/Inventory_MGMT/unit/unit.component';
import { CartComponentComponent } from './Component/Website/cart-component/cart-component.component';

export const routes: Routes = [
    
    { path: '', component: LoginComponent},
    { path: 'Login', component: LoginComponent},
    { path: 'Siginup', component: SiginupComponent},
    { path: 'admin', component: DashboardComponent, canActivate: [authGuard], data: { role: 'Admin' },children:[
        { path: '', component: DashboardHomeComponentComponent },    
        { path: 'users', component: UsersComponent },    
        { path: 'profile', component: ProfileComponent },
        { path: 'Active', component: ActiveSessionsComponent },
        { path: 'System', component: SystemLogComponent },
        { path: 'Item_Category', component: ItemCategoryComponent },
        { path: 'Item_Inventory', component: ItemInventoryComponent },
        { path: 'Unit', component: UnitComponent },
    ] },
    { path: 'user-home', component: UserHomeComponent, canActivate: [authGuard], data: { role: 'User' } },
    { path: 'cart', component: CartComponentComponent }
];
