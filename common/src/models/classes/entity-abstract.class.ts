import { Column } from "typeorm";

export abstract class IdEntityAbstractClass {

    @Column('uuid', { generated: 'uuid', primary: true })
    id?: string;

}

export abstract class IsActiveEntityAbstractClass {

    @Column("boolean", { name: "isActive", default: true })
    isActive: boolean;

}

export abstract class EntityAbstractClass extends IdEntityAbstractClass {

    @Column("boolean", { name: "isActive", default: true })
    isActive: boolean;

}
