import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { VeraHeaderComponent } from '../../shared/vera-header/vera-header.component';
import { VeraFooterComponent } from '../../shared/vera-footer/vera-footer.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [FormsModule, HttpClientModule, VeraHeaderComponent, VeraFooterComponent],
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
        this.auth.saveToken(res.access_token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Erreur login', err);

        if (err.status === 400) {
          alert('Email ou mot de passe incorrect');
        } else {
          alert('Impossible de se connecter au serveur');
        }
      },
    });
  }
}
