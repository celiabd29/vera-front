import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VeraLandingHeaderComponent } from '../../shared/vera-landing-header/vera-landing-header.component';
import { VeraFooterComponent } from '../../shared/vera-footer/vera-footer.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [VeraLandingHeaderComponent, VeraFooterComponent, CommonModule, FormsModule],
  templateUrl: './accueil.html',
  styleUrls: ['./accueil.css'],
})
export class AccueilComponent {
  homeQuestion: string = '';

  constructor(private router: Router) {}

  sendToChat() {
    const question = this.homeQuestion.trim();
    if (!question) {
      this.router.navigate(['/chat']);
    } else {
      this.router.navigate(['/chat'], {
        queryParams: { q: question },
      });
    }
  }
}
