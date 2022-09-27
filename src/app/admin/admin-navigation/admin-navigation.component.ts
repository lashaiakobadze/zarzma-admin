import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.scss']
})
export class AdminNavigationComponent implements OnInit {
  validRegistration: boolean;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    if(window.confirm('ნამდვილად გსურთ გასვალა?')){
      this.authService.logout();
    }
  }

}
