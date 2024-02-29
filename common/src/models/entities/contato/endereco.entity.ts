import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { ContatoEntity } from "./contato.entity";

@Entity({ name: 'TBL_CONTATO_ENDERECO' })
export class EnderecoEntity extends EntityClass  {

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
