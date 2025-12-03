import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mic-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      (click)="onClick()"
      class="group flex items-center justify-center h-10 w-10 rounded-full hover:bg-slate-200 transition cursor-pointer"
      aria-label="Commande vocale"
    >
      <svg
        viewBox="0 0 43 43"
        class="h-10 w-10 stroke-slate-400 group-hover:stroke-black transition"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.9561 27.331V29.8118"
          stroke-width="1.65385"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M27.7444 19.8887V21.5426C27.7444 23.0778 27.1345 24.5501 26.049 25.6356C24.9635 26.7212 23.4911 27.331 21.9559 27.331C20.4207 27.331 18.9484 26.7212 17.8629 25.6356C16.7773 24.5501 16.1675 23.0778 16.1675 21.5426V19.8887"
          stroke-width="1.65385"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M24.4369 15.7541C24.4369 14.384 23.3262 13.2733 21.9561 13.2733C20.586 13.2733 19.4753 14.384 19.4753 15.7541V21.5425C19.4753 22.9126 20.586 24.0233 21.9561 24.0233C23.3262 24.0233 24.4369 22.9126 24.4369 21.5425V15.7541Z"
          stroke-width="1.65385"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  `,
})
export class MicButtonComponent {
  @Output() micClick = new EventEmitter<void>();

  onClick() {
    this.micClick.emit();
  }
}
