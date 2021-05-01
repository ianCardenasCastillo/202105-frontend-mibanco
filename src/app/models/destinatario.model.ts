import { Deserializable } from './deserializable.model';

export class Destinatario implements Deserializable {
    /* tslint:disable: variable-name */
    public _id = '';
    /* tslint:enable */
    public nombre = '';
    public rut = '';
    public correo = '';
    public telefono = '';
    public bankId = '';
    public tipoCuenta = '';
    public numeroCuenta = '';

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

}
