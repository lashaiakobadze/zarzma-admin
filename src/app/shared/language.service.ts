import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  docLang: string;

  constructor() {
    this.docLang = localStorage.getItem('docLang') || 'geo';
  }
}
