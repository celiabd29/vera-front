import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VeraFooterComponent } from '../../shared/vera-footer/vera-footer.component';
import { VeraHeaderComponent } from '../../shared/vera-header/vera-header.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, HttpClientModule, VeraHeaderComponent, VeraFooterComponent],
  templateUrl: './create.html'
})
export class CreateComponent {

  email: string = '';
  full_name: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  create() {
    const newUser = {
    email: this.email,
    full_name: this.full_name,
    password: this.password
  };


  this.http.post('https://backendveraweb-production.up.railway.app/api/v1/auth/register', newUser)
    .subscribe({
      next: (response) => {
        alert('Compte créé avec succès !');
        this.router.navigate(['/form']);
      },
      error: (err) => {
        alert('Une erreur est survenue lors de la création du compte');
      }
    });
  }
}