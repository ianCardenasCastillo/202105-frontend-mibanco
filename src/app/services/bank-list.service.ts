import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankListService {
  private baseLink = environment.API_URL_BANCOS;

  constructor(public http: HttpClient) { }

  getBanks(): Observable<any> {
    return this.http.get(this.baseLink + 'api/banks.php', { observe: 'response' });
  }

}
