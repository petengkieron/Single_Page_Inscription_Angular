import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Utilisateur {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
}

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private utilisateurs: Utilisateur[] = [
    { nom: 'Dupont', prenom: 'Jean', email: 'jean@example.com', telephone: '0123456789' }
  ];

  private utilisateursSubject = new BehaviorSubject<Utilisateur[]>(this.utilisateurs);
  utilisateurs$ = this.utilisateursSubject.asObservable();

  ajouterUtilisateur(utilisateur: Utilisateur) {
    this.utilisateurs.push(utilisateur);
    this.utilisateursSubject.next(this.utilisateurs);
  }

  supprimerUtilisateur(index: number) {
    this.utilisateurs.splice(index, 1);
    this.utilisateursSubject.next(this.utilisateurs);
  }

  getUtilisateurs() {
    return this.utilisateurs;
  }
} 