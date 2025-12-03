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
  editeur: string = "LAREPONSE.TECH";
  statut : string = "Organisation Non Gouvernementale";
  CS : string = "";
  adresse1 : string = "52 rue du Faubourg Poissonnière, 75010 Paris";
  tel1 : string = "";
  email : string = "contact@lareponse.tech";
  siret : string = "";
  rcsrm : string = "";
  tva : string = "20%";
  directeur : string = "Florian GAUTHIER";

  hebergeur : string = "Vercel Inc.";
  adresse2 : string = "340 S Lemon Ave #4133, Walnut, CA 91789";
  tel2 : string = "";
  site : string = "https://vercel.com";

  demande : string = "https://www.cnil.fr";
  contact : string = "CNIL";
  adressePost : string = "3 Pl. de Fontenoy-Unesco, 75007 Paris";


}
