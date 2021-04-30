import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BankListService {
  private baseLink= 'https://bast.dev/'

  constructor(public http: HttpClient) { }

  getBanks(){
    return this.http.get(this.baseLink+'api/banks.php',{observe:'response'});
  }

}
