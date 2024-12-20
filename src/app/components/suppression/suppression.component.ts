import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-suppression',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suppression.component.html',
  styleUrls: ['./suppression.component.css']
})
export class SuppressionComponent implements OnInit {
  utilisateurs: any[] = [];

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit() {
    this.utilisateurService.utilisateurs$.subscribe(
      utilisateurs => this.utilisateurs = utilisateurs
    );
  }

  supprimerUtilisateur(index: number) {
    this.utilisateurService.supprimerUtilisateur(index);
  }
} 