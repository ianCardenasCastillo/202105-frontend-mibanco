import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Destinatario } from '../models/destinatario.model';

@Injectable({
  providedIn: 'root'
})
export class BancoRipleyService {
  private baseLink = 'http://localhost:3000/';

  constructor(public http: HttpClient) { }

  getTipoCuenta(): Observable<any> {
    return this.http.get(this.baseLink + 'api/v1/tipo-cuenta', { observe: 'response' });
  }
  postDestinatario(data: Destinatario): Observable<any> {
    return this.http.post(this.baseLink + 'api/v1/destinatario', data, {
      headers: {
        'content-type': 'application/json'
      },
      observe: 'response'
    });
  }
  getDestinatarios(busqueda: string): Observable<any> {
    return this.http.get(this.baseLink + 'api/v1/destinatario?nombre=' + busqueda, { observe: 'response' });
  }
  postTransferencia(data: any): Observable<any> {
    return this.http.post(this.baseLink + 'api/v1/transferencia', data, {
      headers: {
        'content-type': 'application/json'
      },
      observe: 'response'
    });
  }
  getTransferencias(): Observable<any> {
    return this.http.get(this.baseLink + 'api/v1/transferencia', { observe: 'response' });
  }
  postLogin(data:any): Observable<any>{
    return this.http.post(this.baseLink + 'api/v1/login', data, { observe: 'response' })
  }
}
