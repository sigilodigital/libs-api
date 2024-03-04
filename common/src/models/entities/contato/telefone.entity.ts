import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { IdEntityAbstractClass } from "../../classes/entity-abstract.class";
import { ContatoEntity } from "./contato.entity";

@Entity({ name: 'TBL_CONTATO_TELEFONE' })
export class TelefoneEntity extends IdEntityAbstractClass  {

    @Column()
    number: string;

    @Column({ nullable: true })
    description?: string;

    @ManyToOne(type => ContatoEntity, e => e._telefoneList)
    @JoinColumn()
    _contato?: ContatoEntity;

}
