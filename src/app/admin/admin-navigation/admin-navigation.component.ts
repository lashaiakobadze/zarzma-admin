import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.scss']
})
export class AdminNavigationComponent implements OnInit {
  isAdminMode: boolean;

  constructor(
    public adminService: AdminService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isAdminMode = this.authService.getIsAuth();

    this.isAdminMode = true;
  }

  onLogout(): void {
    this.authService.logout();
    this.isAdminMode = false;
  }

}
