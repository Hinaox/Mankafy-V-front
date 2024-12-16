import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-payement-form',
  templateUrl: './payement-form.component.html',
  styleUrl: './payement-form.component.scss'
})
export class PayementFormComponent implements OnInit {
  payementForm!: FormGroup;

  constructor(
    private fb: FormBuilder,

  ) { }
  ngOnInit(): void {
    this.payementForm = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.pattern('^[0-9]{8,27}$')]], // Numéro de compte : 8-16 chiffres
      accountName: ['', [Validators.required, Validators.minLength(3)]], // Nom sur le compte : au moins 3 caractères
      transactionRef: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{6,34}$')]] // Référence de transaction : 6-20 alphanumériques
    });
  }

  onSubmit(): void {
    if (this.payementForm.valid) {
      console.log('Payment data:', this.payementForm.value);
      // Ajoutez ici le traitement des données (exemple : envoi au backend)
    } else {
      console.log('Formulaire invalide');
    }
  }
}
