import { Deserializable } from './deserializable.model';

export class Destinatario implements Deserializable {
    public _id: string = "";
    public nombre: string = "";
    public rut: string = "";
    public correo: string = "";
    public telefono: string = "";
    public bank_id: string = "";
    public tipo_cuenta: string = "";
    public numero_cuenta: string = "";

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

}
