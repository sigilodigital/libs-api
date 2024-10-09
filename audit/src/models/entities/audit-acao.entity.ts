import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany, } from "typeorm";
import { AuditEntity } from "./audit.entity";
import { AuditoriaObjetoEntity } from "./audit-objeto.entity";

@Index("PK_TBL_SISTEMA_HISTORICO_ACAO", ["codAcao"], { unique: true })
@Index("UC_TBL_SISTEMA_HISTORICO_ACAO", ["txtConstante"], { unique: true })
@Entity("TBL_SISTEMA_HISTORICO_ACAO")
export class AuditoriaAcaoEntity {
    @Column("varchar", { name: "TXT_CONSTANTE", unique: true, length: 50 })
    txtConstante: string;

    @Column("varchar", { name: "TXT_ACAO", length: 255 })
    txtAcao: string;

    @Column("integer", { name: "COD_EXIBE_COMBO" })
    codExibeCombo: number;

    @Column("integer", {
        name: "COD_ATIVO",
        default: () => "1",
    })
    codAtivo: number;

    @Column("integer", {
        primary: true,
        name: "COD_ACAO",
    })
    codAcao: number;

    @ManyToMany(
        () => AuditoriaObjetoEntity,
        (tblAuditoriaObjeto) =>
            tblAuditoriaObjeto.tblAuditoriaAcaos
    )
    @JoinTable({
        name: "TBL_SISTEMA_HIST_OBJETO_ACAO",
        joinColumns: [{ name: "COD_ACAO", referencedColumnName: "codAcao" }],
        inverseJoinColumns: [
            { name: "COD_OBJETO", referencedColumnName: "codObjeto" },
        ],
    })
    tblAuditoriaObjetos: AuditoriaObjetoEntity[];

}
