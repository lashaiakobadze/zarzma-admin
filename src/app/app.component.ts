import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentication/auth.service';
import { ErrorService } from './shared/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'zarzma-admin';

  constructor(
    public authService: AuthService,
    public errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }
}
