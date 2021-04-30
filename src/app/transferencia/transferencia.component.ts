import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Destinatario } from '../models/destinatario.model';
import { BancoRipleyService } from '../services/banco-ripley.service';
import { BankListService } from '../services/bank-list.service';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {
  busqueda:string='';
  banks:Array<any>=[];
  destinatarios:Array<Destinatario>=[]
  destinatarioId:string="";
  datos:string=`
    <h3>Detalle del destinatario</h3>
  `;
  transferenciaForm = new FormGroup({
    monto: new FormControl(null,[
      Validators.required,
      Validators.min(1)
    ]),
  });
  constructor(public bankService: BankListService,public ripleyService: BancoRipleyService) { }
  
  ngOnInit(): void {
    this.getBanks();
  }
  buscarDestinatario(){
    if(this.busqueda.length<1){
      this.destinatarios=[]
      this.destinatarioId=""
      this.resetDetalle();
      return;
    }
    this.ripleyService.getDestinatarios(this.busqueda).subscribe((success:HttpResponse<any>)=>{
      console.log(success)
      this.destinatarios=success.body.destinatarios;
    },(error)=>{
      console.error(error)
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
  getBankName(id:string){
    return this.banks.filter(b=>b.id==id)[0].name;
  }
  transferir(){
    console.log(this.destinatarioId)
    let data = {
      destinatario:this.destinatarioId[0],
      monto:this.transferenciaForm.controls["monto"].value
    }
    this.ripleyService.postTransferencia(data).subscribe((success)=>{
      console.log(success)
    },(error)=>{
      console.error(error)
    })
  }
  getDestinatario(destinatarioId:string){
    this.resetDetalle();
    let dest= this.destinatarios.find(des=>des._id===destinatarioId);
    if(!dest) return;
    this.datos+=`■ Nombre: ${dest.nombre} <br> `
    this.datos+=`■ Correo: ${dest.correo} <br> `
    this.datos+=`■ Banco: ${this.getBankName(dest.bank_id)} <br> `
    this.datos+=`■ Tipo de cuenta: ${dest.tipo_cuenta} <br> `
  }
  resetDetalle():void{
    this.datos=`<h3>Detalle del destinatario</h3>`
  }
}
