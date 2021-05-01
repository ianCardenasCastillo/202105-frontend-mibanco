import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(public ripleyService: BancoRipleyService) { }

  ngOnInit(): void {
  }
  login(){
    const login = {
      rut: this.singinForm.controls.rut.value,
      password: this.singinForm.controls.password.value
    }
    this.ripleyService.postLogin(login).subscribe((success:HttpResponse<any>)=>{
      console.log(success)
    },(err)=>{
      console.error(err)
    });
  }

}
