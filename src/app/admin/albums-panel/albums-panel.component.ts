import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-albums-panel',
  imports: [RouterModule, SharedModule],
  templateUrl: './albums-panel.component.html',
  styleUrls: ['./albums-panel.component.scss']
})
export class AlbumsPanelComponent implements OnInit {

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
