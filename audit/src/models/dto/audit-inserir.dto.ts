export class AuditoriaInserirInputDto implements AuditoriaInserirInputType {
    codChave: number;
    codAcao: number;
    codInteressado: number;
    dtAcao: Date;
    usuarioId: string;
    txtSql: string;
    txtEnderecoIp: string;
    txtEnderecoNome: string;
    codOrigem: number;
    txtAlteracao: string;
}

export type AuditoriaInserirInputType = IAuditoriaInserirDto['input'];

export interface IAuditoriaInserirDto {
    input: {
        codChave: number;
        codAcao: number;
        dtAcao: Date;
        usuarioId: string;
        txtSql: string;
        txtEnderecoIp: string;
        txtEnderecoNome: string;
        codOrigem: number;
        txtAlteracao: string;
    },
    output: null;
}
