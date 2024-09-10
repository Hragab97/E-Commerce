import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthNavbarComponent } from '../../../Components/auth-navbar/auth-navbar.component';
import { FooterComponent } from '../../../Components/footer/footer.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet,AuthNavbarComponent, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
