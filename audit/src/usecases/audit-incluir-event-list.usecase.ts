import { UtilRepository } from "@libs/common";
import { AuditEntity } from "../models/entities/audit.entity";
import { AuditoriaIncluirUseCase } from './audit-incluir.usecase';

export class AuditoriaIncluirEventListUseCase{
    async handler(input: AuditEntity[]) {
        const ucAuditoria = new AuditoriaIncluirUseCase(new UtilRepository());
        for (const evento of input) {
            if (evento != undefined)
                await ucAuditoria.handle(evento)
        }
    }
}