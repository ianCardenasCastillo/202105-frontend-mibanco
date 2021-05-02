import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BancoRipleyService } from '../services/banco-ripley.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  regexRut = /(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])/gm;
  singupForm = new FormGroup({ // FormGroup del formulario de ingreso de destinatario
    username: new FormControl('', [
      Validators.required,
    ]),
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
  login() {
    const registro = {
      rut: this.singupForm.controls.rut.value,
      username: this.singupForm.controls.username.value,
      password: this.singupForm.controls.password.value
    }
    this.ripleyService.postUsuario(registro).subscribe((success: HttpResponse<any>) => {
      if (success.status === 201) {
        this.openSnackBar('Registrado Correctamente', 'OK');
        this.authService.setLogged(true);
        this.authService.saveUser(success.body.usuario);
        this.router.navigate(['destinatarios']);

      }
      else {
        this.authService.setLogged(false);
        console.log('Registro Incorrecto');
        this.openSnackBar('No se pudo registrar', 'OK');
      }
    }, (err) => {
      console.error(err)
    });
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      verticalPosition: 'top'
    });
  }
}
