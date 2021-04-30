import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Destinatario } from '../models/destinatario.model';

@Injectable({
  providedIn: 'root'
})
export class BancoRipleyService {
  private baseLink= 'http://localhost:3000/'

  constructor(public http: HttpClient) { }

  getTipoCuenta(){
    return this.http.get(this.baseLink+'api/v1/tipo-cuenta',{observe:'response'});
  }
  postDestinatario(data:Destinatario){
    return this.http.post(this.baseLink+'api/v1/destinatario',data,{
      headers:{
        'content-type':'application/json'
      },
      observe:'response'
    });
  }
  getDestinatarios(busqueda:string){
    return this.http.get(this.baseLink+'api/v1/destinatario?nombre='+busqueda,{observe:'response'})
  }
  postTransferencia(data:any){
    return this.http.post(this.baseLink+'api/v1/transferencia',data,{
      headers:{
        'content-type':'application/json'
      },
      observe:'response'
    });
  }
}
