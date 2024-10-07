export class AuditoriaInserirInputDto implements AuditoriaInserirInputType {
    codChave: number;
    codAcao: number;
    codInteressado: number;
    dtAcao: Date;
    userId: string;
    txtSql: string;
    txtAddressIp: string;
    txtAddressNome: string;
    codOrigem: number;
    txtAlteracao: string;
}

export type AuditoriaInserirInputType = IAuditoriaInserirDto['input'];

export interface IAuditoriaInserirDto {
    input: {
        codChave: number;
        codAcao: number;
        dtAcao: Date;
        userId: string;
        txtSql: string;
        txtAddressIp: string;
        txtAddressNome: string;
        codOrigem: number;
        txtAlteracao: string;
    },
    output: null;
}
