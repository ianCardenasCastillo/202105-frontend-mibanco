import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logged = new BehaviorSubject<boolean>(false);

  constructor(private crypt: CryptoService) { }
  public isAuthenticated(): boolean {
    const usuario = localStorage.getItem('usuario') || undefined;
    if(usuario){
      this.setLogged(true);
    }
    else{
      this.setLogged(false);
    }
    return usuario ? true : false;
  }
  public saveUser(data:any): void {
    const encryptData = this.crypt.encrypt(data)
    localStorage.setItem('usuario',encryptData);
  }
  public getUser(): any {
    const user = localStorage.getItem('usuario')
    if (user){
      return this.crypt.decrypt(user);
    }
    return null;
  }
  setLogged(value: boolean): void {
    this.logged.next(value)
  }
  getLogged(): Observable<boolean> {
    return this.logged.asObservable();
  }
  clearLogged(){
    localStorage.clear();
  }
}
