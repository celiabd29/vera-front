import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();

  setDarkMode(enabled: boolean) {
    this.darkModeSubject.next(enabled);
    localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
  }

  initDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    this.darkModeSubject.next(darkMode === 'enabled');
  }
}
