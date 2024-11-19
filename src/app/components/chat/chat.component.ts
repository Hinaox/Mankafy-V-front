import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  @Output() handleClose = new EventEmitter<void>();

  messages: { corps: string; sender: string }[] = [
    { corps: 'Salut, comment-allez vous ?', sender: 'user' },
    { corps: 'Ça va bien et vous ?', sender: 'bot' },
    { corps: "Qu'est ce que je peux faire pour vous ?", sender: 'bot' },
    {
      corps: "J'aimerai demander votre avis concernant mon budget de vacances",
      sender: 'user',
    },
    {
      corps: 'Je peux vous aider à adapter vos vacances selon votre budget',
      sender: 'bot',
    },
    { corps: "À combien s'élève votre budget ?", sender: 'bot' },
    { corps: "Mon budget est de 5 millions d'ariary", sender: 'user' },
    {
      corps: 'Combien de personne est compris dans ce budget ?',
      sender: 'bot',
    },
    { corps: 'Nous sommes un groupe de 4 personnes', sender: 'user' },
  ];

  onCloseChatBox() {
    this.handleClose.emit();
  }
}
