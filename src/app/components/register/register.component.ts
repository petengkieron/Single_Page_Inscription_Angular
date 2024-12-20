import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card mt-5">
            <div class="card-body">
              <h2 class="text-center mb-4">Créer un compte</h2>
              <form (ngSubmit)="onSubmit()">
                <div class="form-group">
                  <label for="username">Nom d'utilisateur</label>
                  <input type="text" class="form-control" id="username" 
                         [(ngModel)]="username" name="username" required>
                </div>
                <div class="form-group">
                  <label for="password">Mot de passe</label>
                  <input type="password" class="form-control" id="password" 
                         [(ngModel)]="password" name="password" required>
                </div>
                <div class="form-group">
                  <label for="confirmPassword">Confirmer le mot de passe</label>
                  <input type="password" class="form-control" id="confirmPassword" 
                         [(ngModel)]="confirmPassword" name="confirmPassword" required>
                </div>
                <div *ngIf="error" class="alert alert-danger mt-3">
                  {{error}}
                </div>
                <button type="submit" class="btn btn-primary w-100">S'inscrire</button>
                <div class="text-center mt-3">
                  <a routerLink="/login">Déjà inscrit ? Se connecter</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 1rem;
    }
  `]
})
export class RegisterComponent {
  username = '';
  password = '';
  confirmPassword = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    this.error = '';
    
    if (this.password !== this.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas';
      return;
    }

    this.authService.register(this.username, this.password)
      .subscribe({
        next: () => {
          // Connexion automatique après l'inscription
          this.authService.login(this.username, this.password)
            .subscribe({
              next: () => {
                this.router.navigate(['/inscription']);
              }
            });
        },
        error: error => {
          this.error = error;
        }
      });
  }
} 