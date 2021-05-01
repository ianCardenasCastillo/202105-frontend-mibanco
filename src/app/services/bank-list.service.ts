import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankListService {
  private baseLink = 'https://bast.dev/';

  constructor(public http: HttpClient) { }

  getBanks(): Observable<any> {
    return this.http.get(this.baseLink + 'api/banks.php', { observe: 'response' });
  }

}
