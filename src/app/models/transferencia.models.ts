import { Deserializable } from './deserializable.model';

export class Transferencia implements Deserializable {
    /* tslint:disable: variable-name */
    public _id = '';
    /* tslint:enable */
    public destinatario = '';
    public monto = 0;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

}
