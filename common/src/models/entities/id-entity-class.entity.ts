import { Column } from "typeorm";

export abstract class IdEntityAbstractClass {

    @Column('uuid', { generated: 'uuid', primary: true })
    id?: string;

}
