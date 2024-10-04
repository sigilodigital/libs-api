// import { UtilRepository } from "@libs/common";
import { UtilRepository } from "@sd-root/libs/common/src/repository/util.repository";
import { AuditEntity } from "../models/entities/audit.entity";
import { AuditoriaInserirUseCase } from './audit-inserir.usecase';

export class AuditoriaInserirEventListUseCase{
    async handler(input: AuditEntity[]) {
        const ucAuditoria = new AuditoriaInserirUseCase(new UtilRepository());
        for (const evento of input) {
            if (evento != undefined)
                await ucAuditoria.handle(evento)
        }
    }
}