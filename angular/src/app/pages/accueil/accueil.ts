import { Component } from '@angular/core';
import { VeraLandingHeaderComponent } from '../../shared/vera-landing-header/vera-landing-header.component';
import { VeraFooterComponent } from '../../shared/vera-footer/vera-footer.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [VeraLandingHeaderComponent, VeraFooterComponent],
  templateUrl: './accueil.html',
  styleUrls: ['./accueil.css']
})
export class AccueilComponent {}
