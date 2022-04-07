import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './register-login/login/login.component';
import { RegisterComponent } from './register-login/register/register.component';
import { RegisterLoginComponent } from './register-login/register-login.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgToastModule } from 'ng-angular-popup';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home/home.component';
import { AboutComponent } from './home/about/about.component';
import { MainScreenComponent } from './main/main-screen/main-screen.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminScreenComponent } from './admin/admin-screen/admin-screen.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { TableComponent } from './main/table/table.component';
import {MatListModule} from '@angular/material/list';
import { NavComponent } from './main/nav/nav.component';
import { AddComponent } from './admin/add/add.component';
import { UsersComponent } from './admin/users/users.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { WarningComponent } from './home/warning/warning.component';
import { AllItemsComponent } from './admin/all-items/all-items.component';
import { UpdateItemComponent } from './admin/update-item/update-item.component';
import {MatDialogModule} from '@angular/material/dialog';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RegisterLoginComponent,
    HomeComponent,
    AboutComponent,
    MainScreenComponent,
    DashboardComponent,
    AdminScreenComponent,
    TableComponent,
    NavComponent,
    AddComponent,
    UsersComponent,
    WarningComponent,
    AllItemsComponent,
    UpdateItemComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    NgToastModule,
    MatPaginatorModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatSlideToggleModule,
    MatDialogModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
