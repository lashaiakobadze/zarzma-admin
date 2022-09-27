import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from '../authentication/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isAuth: boolean;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuth();

    this.authService.getAuthStatusListener()
      .pipe(untilDestroyed(this))
      .subscribe((authStatus: boolean) => this.isAuth = authStatus);
  }

  onLogout(): void {
    if(window.confirm('ნამდვილად გსურთ გასვალა?')){
      this.authService.logout();
    }
  }

}
