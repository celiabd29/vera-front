import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VeraLandingHeaderComponent } from '../../shared/vera-landing-header/vera-landing-header.component';
import { VeraFooterComponent } from '../../shared/vera-footer/vera-footer.component';
import { MicButtonComponent } from '../../shared/mic-button/mic-button';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    MicButtonComponent,
    VeraLandingHeaderComponent,
    VeraFooterComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './accueil.html',
  styleUrls: ['./accueil.css'],
})
export class AccueilComponent {
  homeQuestion: string = '';

  constructor(private router: Router, private ngZone: NgZone) {}

  redirectToChat(text: string) {
    this.router.navigate(['/chat'], { queryParams: { q: text } });
  }

  sendToChat() {
    const question = this.homeQuestion.trim();
    if (!question) {
      this.router.navigate(['/chat']);
    } else {
      this.router.navigate(['/chat'], {
        queryParams: { q: question },
      });
    }
  }

  // --- Commande vocale ---
  isRecording = false;
  private recognition: any = null;
  currentQuestion = '';

  async startVoiceCommand() {
    console.log('startVoiceCommand() appelé');

    // Si la reco n’est pas encore initialisée
    if (!this.recognition) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        console.warn('❌ La reconnaissance vocale n’est pas supportée par ce navigateur.');
        return;
      }

      console.log('Initialisation de SpeechRecognition...');
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'fr-FR';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log('Texte reconnu :', transcript);

        this.ngZone.run(() => {
          this.homeQuestion = transcript;

          const text = transcript.trim();
          if (text) {
            // 👉 même comportement que si tu cliquais sur envoyer :
            // redirection vers /chat?q=... puis envoi auto géré par ChatComponent.ngOnInit()
            this.redirectToChat(text);
          }
        });
      };

      this.recognition.onerror = (event: any) => {
        console.error('Erreur reco vocale :', event.error);
        this.isRecording = false;
      };

      this.recognition.onend = () => {
        console.log('Reconnaissance vocale terminée (onend)');
        this.ngZone.run(() => {
          this.isRecording = false;
        });
      };
    }

    // Si c’est déjà en train d’enregistrer, on ne fait rien
    if (this.isRecording) {
      console.log('Déjà en enregistrement, on ignore le clic');
      return;
    }

    // On démarre l’écoute
    this.isRecording = true;
    console.log('Démarrage reconnaissance vocale (start)');
    this.recognition.start();
  }
}
