import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";
import { DarkModeService } from '../../services/darkmode.service';

@Component({
  selector: 'app-vera-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './vera-footer.component.html',
})
export class VeraFooterComponent {
   logoPath = 'assets/logo-vera-noir.png';

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit() {
    this.darkModeService.darkMode$.subscribe(enabled => {
      this.logoPath = enabled ? 'assets/logo-vera-blanc.png' : 'assets/logo-vera-noir.png';
    });
  }

}
