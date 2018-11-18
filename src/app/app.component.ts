import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  componentTitle = "I am a component from app.component.ts";
  clickHandler(){
    alert("I am clicked!");
  }
}
