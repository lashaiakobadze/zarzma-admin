import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

import { AuthService } from '../../authentication/auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
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
