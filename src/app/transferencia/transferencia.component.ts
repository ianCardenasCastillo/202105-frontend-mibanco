import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Destinatario } from '../models/destinatario.model';
import { AuthService } from '../services/auth.service';
import { BancoRipleyService } from '../services/banco-ripley.service';
import { BankListService } from '../services/bank-list.service';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {
  busqueda = '';
  banks: Array<any> = [];
  destinatarios: Array<Destinatario> = [];
  destinatarioId = '';
  datos = `
    <h3>Detalle del destinatario</h3>
  `;
  transferenciaForm = new FormGroup({
    monto: new FormControl(null, [
      Validators.required,
      Validators.min(1)
    ]),
  });
  tipos: Array<any> = [];
  busquedaControl = new FormControl(null, []);
  error = false;
  errorMessage = '';
  constructor(
    public authService: AuthService,
    private snackBar: MatSnackBar,
    public bankService: BankListService,
    public ripleyService: BancoRipleyService) { }

  ngOnInit(): void {
    this.obtenerBancos();
    this.obtenerTipoCuentas();
  }
  setErrorMessage(message: string): void {
    this.errorMessage = message;
  }
  buscarDestinatario(): void {
    if (this.busqueda.length < 1) {
      this.destinatarios = [];
      this.destinatarioId = '';
      this.resetDetalle();
      return;
    }

    this.ripleyService.getDestinatarios(this.busqueda, this.authService.getUser()._id).subscribe((success: HttpResponse<any>) => {
      this.destinatarios = success.body.destinatarios;
    }, (error) => {
      console.error(error);
    });
  }
  obtenerBancos(): void {
    this.bankService.getBanks().subscribe((response: HttpResponse<any>) => {
      if (response.status === 200) {
        this.banks = response.body.banks;
        this.error = false;

      }
      if (response.status === 500) {
        console.error('No se pudo obtener la información de los bancos');
        this.setErrorMessage('Error interno del servicio bancos');
        this.error = true;
      }
    });
  }
  getBankName(id: string): string {
    return this.banks.filter(b => b.id === id)[0].name;
  }
  obtenerTipoCuentas(): void {
    this.ripleyService.getTipoCuenta().subscribe((response: HttpResponse<any>) => {
      if (response.status === 200) {
        console.log('Tipos de Cuenta: ' + response.statusText);
        this.tipos = response.body.tipos;
        this.error = false;
      }
      else {
        console.error('No se pudo obtener la información');
        this.setErrorMessage('No se pudo obtener la información de tipos de cuenta');
        this.error = true;
      }
    }, (errorResponse) => {
      if (errorResponse.status === 0) {
        console.error('Servicio no disponible. Error: ' + errorResponse.message);
        this.setErrorMessage('Los servicios no se encuentran disponibles.');
        this.error = true;
      }
    });
  }
  transferir(): void {
    const data = {
      destinatario: this.destinatarioId[0],
      monto: this.transferenciaForm.controls.monto.value
    };
    this.ripleyService.postTransferencia(data).subscribe((success) => {
      this.openSnackBar('Transferencia realizada correctamente', 'OK');
      this.limpiarTodo();
    }, (error) => {
      console.error(error);
    });
  }
  limpiarTodo(): void {
    this.destinatarioId = '';
    this.busqueda = '';
    this.transferenciaForm.reset();
    this.destinatarios = [];
    this.resetDetalle();
  }
  getDestinatario(destinatarioId: string): void {
    this.resetDetalle();
    const dest = this.destinatarios.find(des => des._id === destinatarioId);
    if (!dest) { return; }
    this.datos += `■ Nombre: ${dest.nombre} <br> `;
    this.datos += `■ Correo: ${dest.correo} <br> `;
    this.datos += `■ Banco: ${this.getBankName(dest.bankId)} <br> `;
    this.datos += `■ Tipo de cuenta: ${this.obtenerNombreTipoCuenta(dest.tipoCuenta)} <br> `;
  }
  resetDetalle(): void {
    this.datos = `<h3>Detalle del destinatario</h3>`;
  }
  obtenerNombreTipoCuenta(id: string): string {
    return this.tipos.filter(b => b._id === id)[0].nombre;
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      verticalPosition: 'top'
    });
  }
}
