import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BancoRipleyService } from '../services/banco-ripley.service';
import { BankListService } from '../services/bank-list.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements AfterViewInit, OnInit {
  transferencias: Array<any> = [];
  columnas = ['nombre', 'rut', 'banco_id', 'tipo_cuenta', 'monto'];
  banks: Array<any> = [];
  constructor(public ripleyService: BancoRipleyService, public bankService: BankListService) {

  }
  ngOnInit(): void {
    this.obtenerBancos();
  }
  obtenerNombreBanco(id: string): string {
    try {
      return this.banks.filter(b => b.id === id)[0].name;
    } catch (error) {
      console.error('No se encontro el banco con el id: ' + id);
      return 'No se encontro el nombre';
    }

  }
  obtenerBancos(): void {
    this.bankService.getBanks().subscribe((response: HttpResponse<any>) => {
      if (response.status === 200) {
        console.log('Bancos obtenidos: ' + response.statusText);
        this.banks = response.body.banks;
      }
      if (response.status === 500) {
        console.error('No se pudo obtener la información');
      }
    });
  }
  ngAfterViewInit(): void {
    this.obtenerTransferencias();
  }
  obtenerTransferencias(): void {
    this.ripleyService.getTransferencias().subscribe((success: HttpResponse<any>) => {
      this.transferencias = success.body.transferencias;
    }, (error) => {
      console.error(error);
    });
  }
}
