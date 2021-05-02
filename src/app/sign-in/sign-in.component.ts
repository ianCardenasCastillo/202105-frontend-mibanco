import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BancoRipleyService } from '../services/banco-ripley.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  regexRut = /(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])/gm;
  singinForm = new FormGroup({ // FormGroup del formulario de ingreso de destinatario
    password: new FormControl('', [
      Validators.required,
    ]),
    rut: new FormControl('', [
      Validators.required,
      Validators.pattern(this.regexRut)
    ]),
  });
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    public ripleyService: BancoRipleyService,
    public authService: AuthService) { }

  ngOnInit(): void {
  }
  login(): void {
    const login = {
      rut: this.singinForm.controls.rut.value,
      password: this.singinForm.controls.password.value
    };
    this.ripleyService.postLogin(login).subscribe((success: HttpResponse<any>) => {
      if (success.status === 200) {
        this.openSnackBar('Login Correcto', 'OK');
        this.authService.saveUser(success.body.usuario);
        this.authService.setLogged(true);
        this.router.navigate(['destinatarios']);
      }
      else {
        this.authService.setLogged(false);
        this.openSnackBar('Login Incorrecto', 'OK');
        console.log('Login Incorrecto');
      }
    }, (err) => {
      console.error(err);
      if (err.status === 0) {
        this.openSnackBar('Servicio no disponible', 'OK');
      }
    });
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      verticalPosition: 'top'
    });
  }

}
