import { Component } from '@angular/core';
import { VeraFooterComponent } from '../../shared/vera-footer/vera-footer.component';
import { VeraHeaderComponent } from '../../shared/vera-header/vera-header.component';

@Component({
  selector: 'app-politique-confidentialite',
  standalone: true,
  imports: [ VeraFooterComponent, VeraHeaderComponent] ,
  templateUrl: './politique-confidentialite.html'
})
export class PolitiqueConfidentialiteComponent {
  Nom: string = "VERA WEB";
  adresse1: string ="";
  tel1: string ="";
  representant: string ="Florian GAUTHIER";
}
