import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Destinatario } from '../models/destinatario.model';

@Injectable({
  providedIn: 'root'
})
export class BancoRipleyService {
  private baseLink = environment.API_URL_MI_BANCO;

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
  getDestinatarios(busqueda: string, usuario: string): Observable<any> {
    return this.http.get(this.baseLink + 'api/v1/destinatario?nombre=' + busqueda + '&usuario=' + usuario, { observe: 'response' });
  }
  postTransferencia(data: any): Observable<any> {
    return this.http.post(this.baseLink + 'api/v1/transferencia', data, {
      headers: {
        'content-type': 'application/json'
      },
      observe: 'response'
    });
  }
  getTransferencias(usuario: string): Observable<any> {
    return this.http.get(this.baseLink + 'api/v1/transferencia?usuario=' + usuario, { observe: 'response' });
  }
  postLogin(data: any): Observable<any> {
    return this.http.post(this.baseLink + 'api/v1/login', data, { observe: 'response' });
  }
  postUsuario(data: any): Observable<any> {
    return this.http.post(this.baseLink + 'api/v1/usuario', data, { observe: 'response' });
  }
}
