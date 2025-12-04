import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VeraFooterComponent } from '../../shared/vera-footer/vera-footer.component';
import { VeraHeaderComponent } from '../../shared/vera-header/vera-header.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [FormsModule, HttpClientModule, VeraHeaderComponent, VeraFooterComponent ],
  templateUrl: './form.html',
  styleUrls: ['./form.css']
})

export class IndexComponent {
  title = 'VERA';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    this.http.get<{ email: string }[]>('https://backendveraweb-production.up.railway.app/api/v1/auth/emails')
      .subscribe({
        next: (data) => {
          const emailExists = data.some(item => item.email === this.email);

          if (emailExists && this.password === '1234') {
            localStorage.setItem('token', 'ok');
            this.router.navigate(['/dashboard']);
          } else {
            alert('Identifiants incorrects');
          }
        },
        error: (err) => {
          console.error('Erreur API', err);
          alert('Impossible de vérifier les emails');
        }
      });
  }
}