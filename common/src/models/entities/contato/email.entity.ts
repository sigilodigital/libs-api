import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { IdEntityAbstractClass } from "../id-entity-class.entity";
import { ContatoEntity } from "./contato.entity";

@Entity({ name: 'TBL_CONTATO_EMAIL' })
export class EmailEntity extends IdEntityAbstractClass  {

    @Column({ name: "address", })
    address: string;

    @Column({ name: "description", nullable: true })
    description?: string;

    @ManyToOne(type => ContatoEntity, c => c._emailList)
    @JoinColumn()
    _contato?: ContatoEntity;

}
