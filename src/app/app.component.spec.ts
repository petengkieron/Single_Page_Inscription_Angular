import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        AppComponent
      ],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the \'Single-Page\' title', () => {
    expect(component.title).toEqual('Single-Page');
  });

  // Ajoutez d'autres tests si nécessaire
  it('should show navigation when user is authenticated', () => {
    spyOn(authService, 'currentUserValue').and.returnValue({ 
      id: 1, 
      username: 'test', 
      token: 'test-token' 
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.navbar')).toBeTruthy();
  });

  it('should hide navigation when user is not authenticated', () => {
    spyOn(authService, 'currentUserValue').and.returnValue(null);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.navbar')).toBeFalsy();
  });
});
