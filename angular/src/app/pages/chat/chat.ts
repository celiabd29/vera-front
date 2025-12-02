import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VeraHeaderComponent } from '../../shared/vera-header/vera-header.component';
import { VeraFooterComponent } from '../../shared/vera-footer/vera-footer.component';

type ChatRole = 'user' | 'assistant';

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
  imports: [CommonModule, FormsModule, VeraHeaderComponent, VeraFooterComponent],
})
export class ChatComponent {
  copiedMessageId: number | null = null;
  shareOpenFor: number | null = null;

  messages: ChatMessage[] = [
    {
      id: 1,
      role: 'user',
      content: 'Est-ce que les canards sont verts ?',
      createdAt: new Date(),
      liked: false,
      disliked: false,
    },
    {
      id: 2,
      role: 'assistant',
      content:
        'Les canards ne sont pas “verts” en général. Cependant, chez certaines espèces, les mâles présentent effectivement des plumes vertes.',
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
  startVoiceCommand() {
    console.log('TODO: commande vocale Vera');
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const q = this.route.snapshot.queryParamMap.get('q');
    if (q) {
      this.currentQuestion = q;

      // Option : envoyer automatiquement la question
      this.sendMessage();
    }
  }
}
