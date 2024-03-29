import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/authentication/auth.service';
import { ErrorMessages } from 'src/app/shared/models/Errors.enume';
import { AppValidators } from 'src/app/shared/validators/app-validators';
import { AuthForm } from '../auth-form.interface';
import { AuthData } from '../auth.model';

@UntilDestroy()
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  adminForm: FormGroup<AuthForm>;
  isLoading: boolean;
  loginErrorMessage: ErrorMessages = null;

  constructor(
    public authService: AuthService,
    public route: Router,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  onLogin(): void {
    const auth = new AuthData(this.adminForm.value.username, this.adminForm.value.password);

    if (!auth || !this.adminForm.valid) {
      this.loginErrorMessage = ErrorMessages.authError;
      return;
    }

    this.authService.login(auth.username, auth.password)
      .pipe(untilDestroyed(this))
      .subscribe({
        error: (err) => {
          console.log(err);

          this.ref.markForCheck();
        },
        complete: () =>  {
          this.loginErrorMessage = null;

          this.ref.markForCheck();
        }
      });
  }

  errors(controlName: string | (string | number)[]): any {
    return Object.values(this.get(controlName).errors);
  }

  get(controlName: string | (string | number)[]): AbstractControl {
    return this.adminForm.get(controlName);
  }

  initForm(): void {
    this.adminForm = new FormGroup<AuthForm>({
      username: new FormControl(null, [AppValidators.required, AppValidators.minLength(5)]),
      password: new FormControl(null, [AppValidators.required, AppValidators.minLength(5)])
    });
  }

}
