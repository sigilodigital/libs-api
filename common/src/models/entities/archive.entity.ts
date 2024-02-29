import { Column, Entity } from "typeorm";

@Entity({ name: 'TBL_ARCHIVE' })
export class ArchiveEntity {

    @Column('uuid', { generated: 'uuid', primary: true })
    id?: string;

    @Column("text", { name: "name", nullable: true })
    name: string | null;

    @Column("text", { name: "path", nullable: true })
    path: string | null;

    @Column("text", { name: "content", nullable: true })
    content: string | null;

    @Column("text", { name: "hashMD5", nullable: true })
    hashMD5: string | null;

    @Column("text", { name: "hashSHA256", nullable: true })
    hashSHA256: string | null;

    @Column("text", { name: "mimetype", nullable: true })
    mimetype: string | null;

    @Column("boolean", { name: "isActive", default: true })
    isActive: boolean;

}
