import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-payement-form',
    templateUrl: './payement-form.component.html',
    styleUrl: './payement-form.component.scss',
    standalone: false
})
export class PayementFormComponent implements OnInit {
  payementForm!: FormGroup;

  constructor(
    private fb: FormBuilder,

  ) { }
  ngOnInit(): void {
    this.payementForm = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{6,27}$')]], // 6-27 caractères alphanumériques
      accountName: ['', [Validators.required, Validators.minLength(3)]], // Min 3 caractères
      facturationAdress: ['', [Validators.required, Validators.minLength(5)]], // Min 5 caractères
      transactionRef: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{6,34}$')]] // 6-34 alphanumériques
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
