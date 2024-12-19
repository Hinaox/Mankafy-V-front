import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  standalone: false,
})
export class ChatComponent implements OnInit {
  constructor(private authService: AuthService, private http: HttpClient) {}
  @Output() handleClose = new EventEmitter<void>();
  messages: { role: string; content: string }[] = []; // Contiendra l'historique des messages
  userInput: string = ''; // Message utilisateur en cours
  botTyping = false; // Indique si le bot est en train de répondre
  ngOnInit() {
    // Charger le contexte depuis localStorage
    const savedContext = localStorage.getItem('chatContext');
    if (savedContext) {
      this.messages = JSON.parse(savedContext);

      // Envoyer le contexte au backend
      this.http
        .post('/api/chatbot/load-context', { context: this.messages })
        .subscribe({
          next: () => console.log('Contexte chargé avec succès'),
          error: (err) =>
            console.error('Erreur lors du chargement du contexte', err),
        });
    }
  }
  async sendMessage() {
    // if (!this.userInput.trim()) return;

    const userMessage = { role: 'user', content: this.userInput };
    console.log('userMessage', userMessage);
    // Ajouter le message utilisateur à l'affichage local
    this.messages.push(userMessage);

    // Envoyer le message au backend
    this.http
      .post(this.authService.baseUrl('/chatbot'), {
        message: this.userInput,
        userId: '1',
      })
      .subscribe(
        (response: any) => {
          // Ajouter la réponse de l'assistant
          this.messages.push({ role: 'assistant', content: response.response });
          console.log('response', response);
          // Sauvegarder dans localStorage
          localStorage.setItem('chatContext', JSON.stringify(this.messages));
        },
        (err) => console.error("Erreur lors de l'envoi du message", err)
      );

    // Réinitialiser l'entrée utilisateur
    this.userInput = '';
  }
  onCloseChatBox() {
    this.handleClose.emit();
  }
}

// messages:any[] = [
//   { corps: 'Salut, comment-allez vous ?', sender: 'user' },
//   { corps: 'Ça va bien et vous ?', sender: 'bot' },
//   { corps: "Qu'est ce que je peux faire pour vous ?", sender: 'bot' },
//   {
//     corps: "J'aimerai demander votre avis concernant mon budget de vacances",
//     sender: 'user',
//   },
//   {
//     corps: 'Je peux vous aider à adapter vos vacances selon votre budget',
//     sender: 'bot',
//   },
//   { corps: "À combien s'élève votre budget ?", sender: 'bot' },
//   { corps: "Mon budget est de 5 millions d'ariary", sender: 'user' },
//   {
//     corps: 'Combien de personne est compris dans ce budget ?',
//     sender: 'bot',
//   },
//   { corps: 'Nous sommes un groupe de 4 personnes', sender: 'user' },
// ];
