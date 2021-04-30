import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Destinatario } from '../models/destinatario.model';
import { BancoRipleyService } from '../services/banco-ripley.service';
import { BankListService } from '../services/bank-list.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'app-add-destinatario',
  templateUrl: './add-destinatario.component.html',
  styleUrls: ['./add-destinatario.component.css']
})
export class AddDestinatarioComponent implements OnInit {
  banks:any;
  tipos:any;
  destinatario= new Destinatario();
  regexRut = /\b(\d{1,3}(?:\d{1,3}){2}-[\dkK])\b/gm;
  regexTelefono = /\D*([+56]\d[2-9])(\d{9})\D*/g;
  destinatarioForm = new FormGroup({
    correo: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    rut: new FormControl('',[
      Validators.required,
      Validators.pattern(this.regexRut)
    ]),
    telefono: new FormControl('',[
      Validators.required,
      Validators.pattern(this.regexTelefono)
    ]),
    nombre: new FormControl('',[
      Validators.required,
      Validators.minLength(3)
    ]),
    cuenta:new FormControl('',[
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ]),
    tipo:new FormControl('',[
      Validators.required
    ]),
    banco:new FormControl('',[
      Validators.required
    ])
  });
  

  matcher = new MyErrorStateMatcher();

  constructor(private _snackBar: MatSnackBar,public bankService: BankListService, public ripleyService: BancoRipleyService) { }

  ngOnInit(): void {
    this.getBanks();
    this.getTipoCuentas();
  }
  getTipoCuentas() {
    this.ripleyService.getTipoCuenta().subscribe((response:HttpResponse<any>)=>{
      if(response.status===200){
        console.log('Tipos de Cuenta: '+response.statusText);
        this.tipos=response.body.tipos;
      }
      else{
        console.error('No se pudo obtener la información')
      }
    })
  }
  getBanks():void{
    this.bankService.getBanks().subscribe((response:HttpResponse<any>)=>{
      if(response.status===200){
        console.log('Bancos obtenidos: '+response.statusText);
        this.banks=response.body.banks;
      }
      if(response.status===500){
        console.error('No se pudo obtener la información')
      }
    })
  }
  guardarDestinatario():void{
    this.crearDestinatario();
    this.ripleyService.postDestinatario(this.destinatario).subscribe((response:HttpResponse<any>)=>{
      if(response.status===201){
        this.openSnackBar('Destinatario guardado correctamente','OK')
        this.destinatario= new Destinatario();
        this.resetFormGroup();
      }

    },(error)=>{
      if(error.status===404){
        this.openSnackBar('Servicio no disponible','OK')
        return;
      }
      if(error.status===500){
        this.openSnackBar(error.error,'OK')
        return;
      }
      this.openSnackBar('No se pudo conectar con el servicio','OK')
    })
  }
  resetFormGroup() {
    this.destinatarioForm.reset();
  }
  crearDestinatario() {
    this.destinatario.rut = this.destinatarioForm.controls['rut'].value;
    this.destinatario.nombre = this.destinatarioForm.controls['nombre'].value;
    this.destinatario.correo = this.destinatarioForm.controls['correo'].value;
    this.destinatario.telefono = this.destinatarioForm.controls['telefono'].value;
    this.destinatario.numero_cuenta = this.destinatarioForm.controls['cuenta'].value;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      verticalPosition:'top'
    });
  }
  onKeyPressCharcodes(event:any){
    return event.charCode >= 48 && event.charCode <= 57
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}