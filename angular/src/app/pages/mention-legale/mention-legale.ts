import { Component } from '@angular/core';
import { VeraFooterComponent } from '../../shared/vera-footer/vera-footer.component';
import { VeraHeaderComponent } from '../../shared/vera-header/vera-header.component';


@Component({
  selector: 'app-mention-legale',
  standalone: true,
  imports: [ VeraFooterComponent, VeraHeaderComponent] ,
  templateUrl: './mention-legale.html',
  styleUrls: ['./mention-legale.css']
})
export class MentionLegaleComponent {
  editeur: string = "";
  statut : string = "";
  CS : string = "";
  adresse1 : string = "";
  tel1 : string = "";
  email : string = "";
  siret : string = "";
  rcsrm : string = "";
  tva : string = "";
  directeur : string = "";

  hebergeur : string = "Vercel";
  adresse2 : string = "";
  tel2 : string = "";
  site : string = "";

  demande : string = "";
  contact : string = "";
  adressePost : string = "";


}
