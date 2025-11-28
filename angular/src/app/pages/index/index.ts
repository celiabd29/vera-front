import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})
export class IndexComponent {
  title = 'VERA';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.email === 'admin@a' && this.password === '1234') {
      localStorage.setItem('token', 'ok');
      this.router.navigate(['/home']);
    } else {
      alert("Identifiants incorrects");
    }
  }
}
