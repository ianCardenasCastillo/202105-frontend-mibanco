import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trans-ripley';
  @Input() usuario = false;
  constructor(public authService: AuthService, public route: Router) {
    this.authService.isAuthenticated();
    this.authService.getLogged().subscribe((result: boolean) => {
      this.usuario = result;
    });
  }
  cerrarSesion(): void {
    this.authService.clearLogged();
    this.authService.setLogged(false);
    this.route.navigate(['sign-in']);

  }
}
