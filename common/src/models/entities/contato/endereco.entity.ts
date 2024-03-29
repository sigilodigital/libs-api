import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { IdEntityAbstractClass } from "../../classes/entity-abstract.class";
import { ContatoEntity } from "./contato.entity";

@Entity({ name: 'TBL_CONTATO_ENDERECO' })
export class EnderecoEntity extends IdEntityAbstractClass  {

    @Column()
    place: string;

    @Column()
    number: string;

    @Column({ nullable: true })
    description: string | null;

    @ManyToOne(type => ContatoEntity, e => e._enderecoList)
    @JoinColumn()
    _contato?: ContatoEntity;

}
