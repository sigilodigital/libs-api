import { Column, Entity } from "typeorm";

import { EntityAbstractClass } from "../classes/entity-abstract.class";

@Entity({ name: 'TBL_ARCHIVE' })
export class ArchiveEntity extends EntityAbstractClass  {

    @Column("text", { name: "name" })
    name: string | null;

    @Column("text", { name: "path" })
    path: string | null;

    @Column("text", { name: "mimetype" })
    mimetype: string | null;

    @Column("text", { name: "content", nullable: true })
    content: string | null;

    @Column("text", { name: "hashMD5", nullable: true })
    hashMD5: string | null;

    @Column("text", { name: "hashSHA256", nullable: true })
    hashSHA256: string | null;

}
