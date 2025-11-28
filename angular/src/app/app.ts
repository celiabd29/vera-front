import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,              
  imports: [RouterModule, FormsModule ],      
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}
