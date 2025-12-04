import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';
import { VeraHeaderComponent } from '../../shared/vera-header/vera-header.component';
import { VeraFooterComponent } from '../../shared/vera-footer/vera-footer.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    VeraHeaderComponent,
    VeraFooterComponent,
    RouterLink, // pour les liens [routerLink] dans le template
  ],
  templateUrl: './form.html',
  styleUrls: ['./form.css'],
})
export class IndexComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Réponse login:', res);
        this.auth.saveToken(res.access_token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Erreur login', err);

        if (err.status === 401 || err.status === 400) {
          alert('Email ou mot de passe incorrect.');
        } else {
          alert('Impossible de se connecter au serveur. Réessaie plus tard.');
        }
      },
    });
  }
}
