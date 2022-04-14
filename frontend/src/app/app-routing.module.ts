import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './admin/add/add.component';
import { AdminScreenComponent } from './admin/admin-screen/admin-screen.component';
import { AllItemsComponent } from './admin/all-items/all-items.component';
import { BillDetailsComponent } from './admin/bill-details/bill-details.component';
import { BillsComponent } from './admin/bills/bills.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { AboutComponent } from './home/about/about.component';
import { HomeComponent } from './home/home/home.component';
import { WarningComponent } from './home/warning/warning.component';
import { MainScreenComponent } from './main/main-screen/main-screen.component';
import { TableComponent } from './main/table/table.component';
import { LoginComponent } from './register-login/login/login.component';
import { RegisterComponent } from './register-login/register/register.component';
import { AuthGuard } from './services/auth.guard';
import { RoleGuard } from './services/role.guard';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'about', component: AboutComponent},
  {path:'main', component: MainScreenComponent ,canActivate:[AuthGuard]},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard,RoleGuard]},
  {path:'table', component: TableComponent, canActivate:[AuthGuard]},
  {path:'admin', component: AdminScreenComponent, canActivate:[AuthGuard,RoleGuard]},
  {path:'add', component: AddComponent, canActivate:[AuthGuard,RoleGuard]},
  {path:'users', component: UsersComponent, canActivate:[AuthGuard,RoleGuard]},
  {path:'warning', component: WarningComponent},
  {path:'items', component: AllItemsComponent, canActivate:[AuthGuard,RoleGuard]},
  {path:'billdetails/:id', component: BillDetailsComponent, canActivate:[AuthGuard,RoleGuard]},
  {path:'bill', component: BillsComponent, canActivate:[AuthGuard,RoleGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
