import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './admin/add/add.component';
import { AdminScreenComponent } from './admin/admin-screen/admin-screen.component';
import { AllItemsComponent } from './admin/all-items/all-items.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { AboutComponent } from './home/about/about.component';
import { HomeComponent } from './home/home/home.component';
import { WarningComponent } from './home/warning/warning.component';
import { MainScreenComponent } from './main/main-screen/main-screen.component';
import { TableComponent } from './main/table/table.component';
import { LoginComponent } from './register-login/login/login.component';
import { RegisterComponent } from './register-login/register/register.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component: LoginComponent },
  {path:'register', component: RegisterComponent},
  {path:'about', component: AboutComponent},
  {path:'main', component: MainScreenComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'table', component: TableComponent},
  {path:'admin', component: AdminScreenComponent},
  {path:'add', component: AddComponent},
  {path:'users', component: UsersComponent},
  {path:'warning', component: WarningComponent},
  {path:'items', component: AllItemsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
