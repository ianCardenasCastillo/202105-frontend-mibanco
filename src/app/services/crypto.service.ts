import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  key='LNRuDxC4r6H1Jt8NAsERiZFtY1IktsaP'
  constructor() { }

  encrypt(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.key).toString();
  }

  decrypt(data: any): string {
    let bytes = CryptoJS.AES.decrypt(data, this.key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}
