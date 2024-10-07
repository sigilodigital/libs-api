export class AuditoriaConsultarInputDto implements AuditoriaConsultarInputType {
    dtInicial: Date;
    dtFinal: Date;
    userId: string;
    operacaoTipo: string;
}

type AuditoriaConsultarInputType = IAuditoriaConsultarDto['input'];

export interface IAuditoriaConsultarDto {
    input: {
        dtInicial: Date;
        dtFinal: Date;
        userId: string;
        operacaoTipo: string;
    },
    output: {
        operacaoTipo: string;
        de: string;
        para: string;
    };
}
