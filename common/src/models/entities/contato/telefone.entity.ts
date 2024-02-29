import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { ContatoEntity } from "./contato.entity";

@Entity({ name: 'TBL_CONTATO_TELEFONE' })
export class TelefoneEntity extends EntityClass  {

    @Column()
    number: string;

    @Column({ nullable: true })
    description?: string;

    @ManyToOne(type => ContatoEntity, e => e._telefoneList)
    @JoinColumn()
    _contato?: ContatoEntity;

}