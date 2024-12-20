import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  utilisateur = {
    nom: '',
    prenom: '',
    email: '',
    telephone: ''
  };

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  onSubmit() {
    this.utilisateurService.ajouterUtilisateur(this.utilisateur);
    this.router.navigate(['/consultation']);
  }
} 