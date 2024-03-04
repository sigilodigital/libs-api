import { Column } from "typeorm";

export abstract class ActiveEntityAbstractClass {

    @Column('uuid', { generated: 'uuid', primary: true })
    id?: string;

}
