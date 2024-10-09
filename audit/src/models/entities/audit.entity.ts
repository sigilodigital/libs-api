import { Column, Entity } from "typeorm";
import { isDate } from "util/types";

import { formatDate } from "@libs/common/utils";

// TODO: Solicitar que acrescentem uma PK para esta entity no BD
@Entity("TBL_SISTEMA_HISTORICO")
export class AuditEntity {

    constructor(entrada?: AuditEntity) {
        if (entrada) {
            Object.keys(entrada).forEach((property) => {
                if (isDate(this[property])) {
                    this[property] = formatDate(this[property]);
                } else {
                    this[property] = entrada[property];
                }
            });
        }
    }

    @Column("clob", { name: "TXT_SQL", nullable: true })
    txtSql: string | null;

    @Column("varchar", { name: "TXT_ADDRESS_NOME", nullable: true, length: 255, })
    txtAddressNome: string | null;

    @Column("varchar", { name: "TXT_ADDRESS_IP", nullable: true, length: 28 })
    txtAddressIp: string | null;

    @Column("varchar", { name: "TXT_ALTERACAO", nullable: true, length: 4000 })
    txtAlteracao: string | null;

    @Column("timestamp", { name: "DT_ACAO", default: () => "sysdate" })
    dtAcao: Date;

    @Column("text", { name: "userId" })
    userId: string;

    @Column("integer", { name: "COD_ORIGEM", nullable: true })
    codOrigem: number | null;

    @Column("integer", { name: "COD_ORGAO", default: () => "0", })
    codOrgao: number;

    // TODO: remover config de PK desta propriedade
    @Column("integer", { primary: true, name: "COD_CHAVE" })
    codChave: number;

    @Column("integer", { name: "COD_ACAO" })
    codAcao: number;

}
