import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthData } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any; // NodeJS.Timer
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getToken(): string {
    return this.token;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  createUser(username: string, password: string): void {
    const authData: AuthData = {
      username: username,
      password: password
    };

    this.http.post<AuthData>('signup', authData)
      .subscribe(response => {
        console.log(response);
      })
  }

  login(username: string, password: string): void {
    const authData: AuthData = {
      username: username,
      password: password
    };

    this.http.post<{token: string, expiresIn: number}>('Login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;

        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate);
          this.router.navigate(['/admin']);
        }
      });
  }

  autoAuthUser(): void {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.router.navigate(['/admin']);
    }
  }

  logout(): void {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/auth']);
  }

  private setAuthTimer(duration: number): void {
    console.log("Setting Timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date): void {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData(): { token: string, expirationDate: Date} {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');

    if (!token || !expirationDate) {
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate),
    }
  }
}
