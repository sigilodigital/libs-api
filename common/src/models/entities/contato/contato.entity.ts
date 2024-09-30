import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { Entity, OneToMany, OneToOne } from "typeorm";

// import { UsuarioEntity } from "@sd-root/src/features/usuario/models/entities/usuario.entity";
import { IdEntityAbstractClass } from "../../classes/entity-abstract.class";
import { EmailEntity } from "./email.entity";
import { EnderecoEntity } from "./endereco.entity";
import { TelefoneEntity } from "./telefone.entity";

@Entity({ name: 'TBL_CONTATO' })
export class ContatoEntity extends IdEntityAbstractClass  {

    @OneToMany(type => EmailEntity, e => e._contato, { eager: true, cascade: ['insert', 'update', 'remove'] })
    _emailList: EmailEntity[];

    @OneToMany(type => TelefoneEntity, e => e._contato, { eager: true, cascade: ['insert', 'update', 'remove'] })
    _telefoneList: TelefoneEntity[];

    @OneToMany(type => EnderecoEntity, e => e._contato, { eager: true, cascade: ['insert', 'update', 'remove'] })
    _enderecoList: EnderecoEntity[];

    // @OneToOne(type => UsuarioEntity, e => e._contato)
    // // @JoinColumn()
    // _usuario?: UsuarioEntity;

    public static getEntityList(): EntityClassOrSchema[] {
        return [ContatoEntity, EmailEntity, TelefoneEntity, EnderecoEntity];
    }
}
