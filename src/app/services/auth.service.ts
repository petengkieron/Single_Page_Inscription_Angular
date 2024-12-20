import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id?: number;
  username: string;
  password: string;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private users: User[] = [];

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
    
    // Charger les utilisateurs existants du localStorage
    const savedUsers = localStorage.getItem('users');
    this.users = savedUsers ? JSON.parse(savedUsers) : [
      { id: 1, username: 'admin', password: 'admin' } // Utilisateur par défaut
    ];
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(username: string, password: string): Observable<any> {
    return new Observable(observer => {
      // Vérifier si l'utilisateur existe déjà
      if (this.users.find(u => u.username === username)) {
        observer.error('Nom d\'utilisateur déjà pris');
        return;
      }

      // Créer un nouvel utilisateur
      const newUser: User = {
        id: this.users.length + 1,
        username,
        password
      };

      // Ajouter l'utilisateur à la liste
      this.users.push(newUser);
      
      // Sauvegarder dans localStorage
      localStorage.setItem('users', JSON.stringify(this.users));
      
      observer.next(newUser);
      observer.complete();
    });
  }

  login(username: string, password: string) {
    return new Observable(observer => {
      // Trouver l'utilisateur
      const user = this.users.find(u => u.username === username && u.password === password);

      if (user) {
        // Créer une copie de l'utilisateur avec un token
        const authenticatedUser = {
          ...user,
          token: 'jwt-token-' + Math.random()
        };
        
        // Sauvegarder l'utilisateur connecté
        localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
        this.currentUserSubject.next(authenticatedUser);
        
        observer.next(authenticatedUser);
      } else {
        observer.error('Nom d\'utilisateur ou mot de passe incorrect');
      }
      observer.complete();
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
} 