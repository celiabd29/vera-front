import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vera-landing-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vera-landing-header.component.html',
  styleUrls: ['./vera-landing-header.component.css'],
})
export class VeraLandingHeaderComponent {}
