import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { AboutComponent } from './home/about/about.component';
import { HomeComponent } from './home/home/home.component';
import { MainScreenComponent } from './main/main-screen/main-screen.component';
import { TableComponent } from './main/table/table.component';
import { LoginComponent } from './register-login/login/login.component';
import { RegisterLoginComponent } from './register-login/register-login.component';
import { RegisterComponent } from './register-login/register/register.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component: LoginComponent },
  {path:'register', component: RegisterComponent},
  {path:'about', component: AboutComponent},
  {path:'main', component: MainScreenComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'table', component: TableComponent},

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
