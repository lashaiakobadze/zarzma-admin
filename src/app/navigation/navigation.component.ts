import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from '../authentication/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  isAuth: boolean;

  constructor(
    public authService: AuthService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuth();

    this.authService.getAuthStatusListener()
      .pipe(untilDestroyed(this))
      .subscribe((authStatus: boolean) => {
        this.isAuth = authStatus;

        this.ref.markForCheck();
      });
  }

  onLogout(): void {
    if(window.confirm('ნამდვილად გსურთ გასვალა?')){
      this.authService.logout();
    }
  }

}
