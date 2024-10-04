import { IUtilRepository, UtilRepository } from "@libs/common/repository/util.repository";
import { IAuditoriaInserirDto } from "../models/dto/audit-inserir.dto";
import { AuditEntity } from "../models/entities/audit.entity";


export class AuditoriaInserirUseCase {
    constructor(private utilRepository: IUtilRepository) {}

    public async handle(input: IAuditoriaInserirDto['input']) {
        //TODO: remover "as *Entity" do objeto; verificar os campos obrigatórios da entidade
        const entity = new AuditEntity({...input} as AuditEntity);
        const auditoriaRepository = await this.utilRepository.init([AuditEntity]);
        return await auditoriaRepository.manager.insert(AuditEntity, entity);
    }

}