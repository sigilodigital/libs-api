// import { UserEntity } from "src/features/user/models/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { IdEntityAbstractClass } from "../classes/entity-abstract.class";

@Entity({ name: 'TBL_METADATA' })
export class MetadataEntity extends IdEntityAbstractClass  {

    // @OneToOne(type => UserEntity)
    // @JoinColumn({name: '_owner'})
    // _owner: UserEntity;

    // @OneToOne(type => UserEntity)
    // @JoinColumn({name: '_createdBy'})
    // _createdBy: UserEntity;

    // @Column({name: 'createdAt'})
    // createdAt: String;

    // @OneToOne(type => UserEntity)
    // @JoinColumn({name: '_modifiedBy'})
    // _modifiedBy: UserEntity;

    // @Column({name: 'modifiedAt'})
    // modifiedAt: String;


}
