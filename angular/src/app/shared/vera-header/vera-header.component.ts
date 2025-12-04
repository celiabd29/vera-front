import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DarkModeService } from '../../services/darkmode.service';

@Component({
  selector: 'app-vera-header',
  standalone: true,
  templateUrl: './vera-header-chat.component.html',
  imports: [CommonModule, RouterModule],
})
export class VeraHeaderComponent implements OnInit {
  logoPath = 'assets/logo-vera-noir.png';
  isDarkMode = false;

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit() {
    this.darkModeService.initDarkMode();
    this.darkModeService.darkMode$.subscribe(enabled => {
      this.isDarkMode = enabled;
      this.logoPath = enabled ? 'assets/logo-vera-blanc.png' : 'assets/logo-vera-noir.png';
    });
  }

  toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    const enabled = body.classList.contains('dark-theme');
    this.darkModeService.setDarkMode(enabled);
    this.isDarkMode = enabled;
  }
}
