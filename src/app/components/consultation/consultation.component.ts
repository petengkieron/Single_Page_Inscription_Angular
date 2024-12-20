import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
  utilisateurs: any[] = [];

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit() {
    this.utilisateurService.utilisateurs$.subscribe(
      utilisateurs => this.utilisateurs = utilisateurs
    );
  }
} 