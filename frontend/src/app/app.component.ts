import { Component } from '@angular/core';
import { HomeComponent } from './home/home/home.component';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( public loaderService: LoaderService){

  }
  title = 'cafe';
  component = HomeComponent
}
