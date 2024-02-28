import { IUtilRepository, UtilRepository } from "@libs/common/repository/util.repository";
import { IAuditoriaIncluirDto } from "../models/dto/audit-incluir.dto";
import { AuditEntity } from "../models/entities/audit.entity";


export class AuditoriaIncluirUseCase {
    constructor(private utilRepository: IUtilRepository) {}

    public async handle(input: IAuditoriaIncluirDto['input']) {
        //TODO: remover "as *Entity" do objeto; verificar os campos obrigatórios da entidade
        const entity = new AuditEntity({...input} as AuditEntity);
        const auditoriaRepository = await this.utilRepository.init([AuditEntity]);
        return await auditoriaRepository.manager.insert(AuditEntity, entity);
    }

}