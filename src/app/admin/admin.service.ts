import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  isAdminMode = true;

  logOut() {
    const isAdminMode = JSON.stringify(localStorage.getItem('isAdminMode'));
    if (isAdminMode) {
      localStorage.removeItem('isAdminMode');
    }

    this.isAdminMode = false;
  }

}
