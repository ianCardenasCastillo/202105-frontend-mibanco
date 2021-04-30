import { Deserializable } from './deserializable.model';

export class TipoCuenta implements Deserializable {
    public _id: string = "";
    public nombre: string = "";

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

}
