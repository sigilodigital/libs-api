import { EntitySchema } from "typeorm"

export const AuditoriaSchema = new EntitySchema({
    name: "AuditoriaEntity",
    schema: "PUBLIC",
    columns: {
        codChave: {
            name: "COD_CHAVE", 
            type: Number,
            nullable: false
        },
        codAcao: {
            name: "COD_ACAO",
            type: Number,
            nullable: false
        },
        dtAcao: {
            name: "DT_ACAO",
            type: "timestamp",
            nullable: false
        },
        codUser: {
            name: "COD_USER",
            type: Number,
            nullable: true
        },
        txtSql: {
            name: "TXT_SQL",
            type: "clob",
            nullable: false,
        },
        txtAddressIp: {
            name: "TXT_ADDRESS_IP",
            type: String,
            nullable: false,
            length: 28
        },
        txtAddressNome: {
            name: "TXT_ADDRESS_NOME",
            type: String,
            nullable: true,
            length: 255
        },
        codOrgao: {
            name: "COD_ORGAO",
            type: Number,
            nullable: true
        },
        txtAlteracao: {
            name: "TXT_ALTERACAO",
            type: String,
            nullable: false,
            length: 4000
        },
        codOrigem: {
            name: "COD_ORIGEM",
            type: Number,
            nullable: false
        },
        codInteressado: {
            name: "COD_INTERESSADO",
            type: Number,
            nullable: false
        }

    }
})