import { Component, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VeraHeaderComponent } from '../../shared/vera-header/vera-header.component';
import { VeraFooterComponent } from '../../shared/vera-footer/vera-footer.component';
import { MicButtonComponent } from '../../shared/mic-button/mic-button';

type ChatRole = 'user' | 'assistant';
declare var webkitSpeechRecognition: any;

interface ChatMessage {
  id: number;
  role: ChatRole;
  content: string;
  createdAt: Date;
  liked?: boolean;
  disliked?: boolean;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.html',
  imports: [
    MicButtonComponent,
    CommonModule,
    FormsModule,
    VeraHeaderComponent,
    VeraFooterComponent,
  ],
})
export class ChatComponent implements AfterViewInit {
  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }

  copiedMessageId: number | null = null;
  shareOpenFor: number | null = null;

  @ViewChild('bottomAnchor') bottomAnchor!: ElementRef<HTMLDivElement>;

  messages: ChatMessage[] = [
    {
      id: 1,
      role: 'assistant',
      content: 'Bonjour ! Je suis Vera \nPosez-moi une question.',
      createdAt: new Date(),
      liked: false,
      disliked: false,
    },
  ];

  currentQuestion = '';
  private nextId = 3;

  async sendMessage() {
    const question = this.currentQuestion.trim();
    if (!question) return;

    const userMsg: ChatMessage = {
      id: this.nextId++,
      role: 'user',
      content: question,
      createdAt: new Date(),
      liked: false,
      disliked: false,
    };
    this.messages.push(userMsg);
    this.currentQuestion = '';

    // 🔽 scroll après ajout du message user
    setTimeout(() => this.scrollToBottom(), 0);

    try {
      const answerText = await this.callVeraApi(question);

      const veraMsg: ChatMessage = {
        id: this.nextId++,
        role: 'assistant',
        content: answerText,
        createdAt: new Date(),
        liked: false,
        disliked: false,
      };
      this.messages.push(veraMsg);

      // 🔽 scroll après réponse de Vera
      setTimeout(() => this.scrollToBottom(), 0);
    } catch (err) {
      console.error('Erreur API Vera', err);
      const errorMsg: ChatMessage = {
        id: this.nextId++,
        role: 'assistant',
        content: 'Oups… Je n’ai pas réussi à joindre Vera. Réessaie dans un instant.',
        createdAt: new Date(),
        liked: false,
        disliked: false,
      };
      this.messages.push(errorMsg);

      // 🔽 scroll aussi en cas d’erreur
      setTimeout(() => this.scrollToBottom(), 0);
    }
  }

  // 🔌 Appel à TON backend: POST http://localhost:8000/api/v1/messages/ask
  private async callVeraApi(question: string): Promise<string> {
    const response = await fetch('http://localhost:8000/api/v1/messages/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        message: question,
      }),
    });

    console.log('Status backend:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Réponse non OK du backend:', errorText);
      throw new Error('Erreur HTTP ' + response.status);
    }

    const data = await response.json();
    console.log('Réponse JSON backend:', data);

    if (typeof data === 'string') {
      try {
        const parsed = JSON.parse(data);
        return parsed.answer ?? parsed.response ?? parsed.output ?? JSON.stringify(parsed);
      } catch {
        return data;
      }
    }

    return (
      (data as any).answer ?? (data as any).response ?? (data as any).output ?? JSON.stringify(data)
    );
  }

  // 👍 Toggle Like
  toggleLike(msg: ChatMessage) {
    msg.liked = !msg.liked;
    if (msg.liked) msg.disliked = false;
  }

  // 👎 Toggle Dislike
  toggleDislike(msg: ChatMessage) {
    msg.disliked = !msg.disliked;
    if (msg.disliked) msg.liked = false;
  }

  // Copier
  copyToClipboard(text: string, msgId: number) {
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(text).then(() => {
      this.copiedMessageId = msgId;

      setTimeout(() => {
        this.copiedMessageId = null;
      }, 1500);
    });
  }

  toggleShareMenu(msgId: number) {
    this.shareOpenFor = this.shareOpenFor === msgId ? null : msgId;
  }

  async shareMessage(msg: ChatMessage) {
    if (navigator.share) {
      try {
        await navigator.share({
          text: msg.content,
        });
        this.shareOpenFor = null;
      } catch (e) {
        console.error('Partage annulé ou impossible', e);
      }
    } else {
      // Fallback : on copie le texte si le partage natif n’existe pas
      this.copyToClipboard(msg.content, msg.id);
      this.shareOpenFor = null;
    }
  }

  copyShareLink(msg: ChatMessage) {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch((err) => {
        console.error('Impossible de copier le lien', err);
      });
    }
    this.shareOpenFor = null;
  }

  newConversation() {
    this.messages = [];
    this.currentQuestion = '';
    this.nextId = 1;
  }

  // Commande vocale
  isRecording = false;
  private recognition: any = null;

  constructor(private route: ActivatedRoute, private ngZone: NgZone) {}

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
        console.log('onresult appelé', event);
        const transcript = event.results[0][0].transcript;
        console.log('Texte reconnu :', transcript);

        this.ngZone.run(() => {
          this.currentQuestion = transcript;
          // si tu veux envoi auto, décommente :
          this.sendMessage();
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

    if (this.isRecording) {
      console.log('Déjà en enregistrement, on ignore le clic');
      return;
    }

    // On démarre l’écoute
    this.isRecording = true;
    console.log('Démarrage reconnaissance vocale (start)');
    this.recognition.start();
  }
  ngAfterViewInit() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    try {
      if (this.bottomAnchor?.nativeElement) {
        this.bottomAnchor.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
    } catch (e) {
      console.error('Erreur scrollToBottom', e);
    }
  }

  ngOnInit() {
    const q = this.route.snapshot.queryParamMap.get('q');
    if (q) {
      this.currentQuestion = q;
      this.sendMessage();
    }
  }
}
