import { Component, Host, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../Components/navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

goToTop(){
  scrollTo(0,0)
}

showBtn: boolean = false;

@HostListener('window:scroll')
scrollToTop(){

  let scrollTop = document.documentElement.scrollTop
  if (scrollTop>500) {
    this.showBtn = true  
  }else{
    this.showBtn = false
  }
  
}
}
