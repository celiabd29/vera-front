import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../../services/darkmode.service';

@Component({
  selector: 'app-vera-header',
  standalone: true,
  templateUrl: './vera-header-chat.component.html',
})
export class VeraHeaderComponent implements OnInit {
  logoPath = 'assets/logo-vera-noir.png';

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit() {
    this.darkModeService.darkMode$.subscribe(enabled => {
      this.logoPath = enabled ? 'assets/logo-vera-blanc.png' : 'assets/logo-vera-noir.png';
    });
  }

  toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    const enabled = body.classList.contains('dark-theme');
    this.darkModeService.setDarkMode(enabled);
  }
}
